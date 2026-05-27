'use client';

import { useState, useEffect, use } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, X } from 'lucide-react';
import Link from 'next/link';
import MediaPicker from '@/components/admin/MediaPicker';
import type { CmsPage } from '@/lib/types';

export default function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [page, setPage] = useState<CmsPage | null>(null);
  const [content, setContent] = useState<Record<string, string>>({});
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mediaPicker, setMediaPicker] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('pages').select('*').eq('id', id).single();
      if (error || !data) {
        toast.error('Page not found');
        router.push('/admin/pages');
        return;
      }
      const p = data as CmsPage;
      setPage(p);
      setContent(typeof p.content === 'object' && p.content ? p.content : {});
      setSeoTitle(p.seo_title || '');
      setSeoDescription(p.seo_description || '');
      setFeaturedImage(p.featured_image || '');
      setLoading(false);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateField = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const addField = () => {
    const key = window.prompt('Field name (e.g., hero_title, cta_text):');
    if (key && !content[key]) {
      setContent((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const removeField = (key: string) => {
    setContent((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('pages')
      .update({
        content,
        seo_title: seoTitle,
        seo_description: seoDescription,
        featured_image: featuredImage,
      })
      .eq('id', id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Page updated!');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[--cms-muted]" />
      </div>
    );
  }

  if (!page) return null;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/pages" className="rounded-lg p-2 text-[--cms-muted] hover:bg-[--cms-hover]">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[--cms-text]">Edit: {page.title}</h1>
            <p className="text-xs text-[--cms-muted]">/{page.slug}</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-lg bg-[--cms-accent] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-[--cms-border] bg-[--cms-card] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[--cms-text]">Page Content Fields</h2>
              <button onClick={addField} className="text-xs text-[--cms-accent] hover:underline">+ Add Field</button>
            </div>
            <div className="space-y-4">
              {Object.entries(content).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-[--cms-text]">{key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</label>
                    <button onClick={() => removeField(key)} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                  {value.length > 100 || key.includes('body') || key.includes('content') ? (
                    <textarea
                      value={value}
                      onChange={(e) => updateField(key, e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-4 py-2.5 text-sm text-[--cms-text] focus:border-[--cms-accent] focus:outline-none resize-y"
                    />
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateField(key, e.target.value)}
                      className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-4 py-2.5 text-sm text-[--cms-text] focus:border-[--cms-accent] focus:outline-none"
                    />
                  )}
                </div>
              ))}
              {Object.keys(content).length === 0 && (
                <p className="text-sm text-[--cms-muted] py-4 text-center">No content fields. Click &quot;+ Add Field&quot; to start.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-[--cms-border] bg-[--cms-card] p-4">
            <h3 className="text-sm font-semibold text-[--cms-text] mb-3">Featured Image</h3>
            {featuredImage ? (
              <div className="relative mb-3">
                <img src={featuredImage} alt="Featured" className="w-full rounded-lg object-cover aspect-video" />
                <button onClick={() => setFeaturedImage('')} className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mb-3 flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-[--cms-border] text-[--cms-muted]">
                <ImageIcon className="h-8 w-8" />
              </div>
            )}
            <button onClick={() => setMediaPicker(true)} className="w-full rounded-lg border border-[--cms-border] py-2 text-sm font-medium text-[--cms-text] hover:bg-[--cms-hover]">
              {featuredImage ? 'Change Image' : 'Select Image'}
            </button>
          </div>

          <div className="rounded-xl border border-[--cms-border] bg-[--cms-card] p-4">
            <h3 className="text-sm font-semibold text-[--cms-text] mb-3">SEO Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-[--cms-muted]">SEO Title</label>
                <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-3 py-2 text-sm text-[--cms-text] focus:border-[--cms-accent] focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[--cms-muted]">Meta Description</label>
                <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={3} className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-3 py-2 text-sm text-[--cms-text] focus:border-[--cms-accent] focus:outline-none resize-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <MediaPicker open={mediaPicker} onSelect={(url) => setFeaturedImage(url)} onClose={() => setMediaPicker(false)} />
    </div>
  );
}
