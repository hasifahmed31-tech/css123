'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Eye, Image as ImageIcon, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import slugify from 'slugify';
import MediaPicker from '@/components/admin/MediaPicker';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [mediaPicker, setMediaPicker] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  const handleSave = async (publish: boolean) => {
    if (!title.trim()) { toast.error('Title is required'); return; }
    if (!slug.trim()) { toast.error('Slug is required'); return; }
    setSaving(true);

    const { error } = await supabase.from('posts').insert({
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content,
      featured_image: featuredImage,
      seo_title: seoTitle || title,
      seo_description: seoDescription || excerpt,
      published: publish,
    });

    if (error) {
      toast.error(error.message);
      setSaving(false);
      return;
    }

    toast.success(publish ? 'Post published!' : 'Draft saved!');
    router.push('/admin/posts');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts" className="rounded-lg p-2 text-[--cms-muted] hover:bg-[--cms-hover]">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-[--cms-text]">New Post</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-2 rounded-lg border border-[--cms-border] px-4 py-2 text-sm font-medium text-[--cms-text] hover:bg-[--cms-hover] disabled:opacity-50">
            <Save className="h-4 w-4" /> Save Draft
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-2 rounded-lg bg-[--cms-accent] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />} Publish
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[--cms-text]">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title..."
              className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-4 py-3 text-lg font-semibold text-[--cms-text] placeholder:text-[--cms-muted] focus:border-[--cms-accent] focus:outline-none focus:ring-1 focus:ring-[--cms-accent]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[--cms-text]">Slug</label>
            <div className="flex items-center rounded-lg border border-[--cms-border] bg-[--cms-input-bg]">
              <span className="px-3 text-sm text-[--cms-muted]">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 bg-transparent py-2 pr-4 text-sm text-[--cms-text] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[--cms-text]">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="Brief description of the post..."
              className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-4 py-2.5 text-sm text-[--cms-text] placeholder:text-[--cms-muted] focus:border-[--cms-accent] focus:outline-none focus:ring-1 focus:ring-[--cms-accent] resize-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[--cms-text]">Content</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Featured Image */}
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

          {/* SEO */}
          <div className="rounded-xl border border-[--cms-border] bg-[--cms-card] p-4">
            <h3 className="text-sm font-semibold text-[--cms-text] mb-3">SEO Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-[--cms-muted]">SEO Title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={title || 'SEO title...'}
                  className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-3 py-2 text-sm text-[--cms-text] placeholder:text-[--cms-muted] focus:border-[--cms-accent] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[--cms-muted]">{(seoTitle || title).length}/60</p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[--cms-muted]">Meta Description</label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  rows={3}
                  placeholder={excerpt || 'Meta description...'}
                  className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-3 py-2 text-sm text-[--cms-text] placeholder:text-[--cms-muted] focus:border-[--cms-accent] focus:outline-none resize-none"
                />
                <p className="mt-1 text-xs text-[--cms-muted]">{(seoDescription || excerpt).length}/160</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MediaPicker open={mediaPicker} onSelect={(url) => setFeaturedImage(url)} onClose={() => setMediaPicker(false)} />
    </div>
  );
}
