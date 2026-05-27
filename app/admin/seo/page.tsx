'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { Loader2, Save, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import type { CmsPost, CmsPage } from '@/lib/types';

function PageSeoRow({ page }: { page: CmsPage }) {
  const [localTitle, setLocalTitle] = useState(page.seo_title || '');
  const [localDesc, setLocalDesc] = useState(page.seo_description || '');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from('pages').update({ seo_title: localTitle, seo_description: localDesc }).eq('id', page.id);
    if (error) toast.error(error.message);
    else toast.success('SEO updated!');
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-[--cms-text]">{page.title}</h3>
        <span className="text-xs text-[--cms-muted]">/{page.slug}</span>
      </div>
      {editing ? (
        <div className="space-y-2 mt-2">
          <input type="text" value={localTitle} onChange={(e) => setLocalTitle(e.target.value)} placeholder="SEO Title"
            className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-3 py-2 text-sm text-[--cms-text] focus:border-[--cms-accent] focus:outline-none" />
          <textarea value={localDesc} onChange={(e) => setLocalDesc(e.target.value)} placeholder="Meta Description" rows={2}
            className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-3 py-2 text-sm text-[--cms-text] focus:border-[--cms-accent] focus:outline-none resize-none" />
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="flex items-center gap-1.5 rounded-lg bg-[--cms-accent] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50">
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Save
            </button>
            <button onClick={() => setEditing(false)} className="rounded-lg px-3 py-1.5 text-xs text-[--cms-muted] hover:bg-[--cms-hover]">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="mt-1">
          <p className="text-sm text-[--cms-accent]">{page.seo_title || page.title}</p>
          <p className="text-xs text-[--cms-muted] mt-0.5">{page.seo_description || 'No meta description set'}</p>
          <button onClick={() => setEditing(true)} className="mt-2 text-xs text-[--cms-accent] hover:underline">Edit SEO</button>
        </div>
      )}
    </div>
  );
}

export default function SeoPage() {
  const [posts, setPosts] = useState<CmsPost[]>([]);
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<{ id: string; seo_title: string; seo_description: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const [postsRes, pagesRes] = await Promise.all([
        supabase.from('posts').select('id, title, slug, seo_title, seo_description, published').order('created_at', { ascending: false }),
        supabase.from('pages').select('id, title, slug, seo_title, seo_description'),
      ]);
      if (postsRes.data) setPosts(postsRes.data as CmsPost[]);
      if (pagesRes.data) setPages(pagesRes.data as CmsPage[]);
      setLoading(false);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const savePostSeo = async (id: string, seoTitle: string, seoDesc: string) => {
    setSaving(id);
    const { error } = await supabase.from('posts').update({ seo_title: seoTitle, seo_description: seoDesc }).eq('id', id);
    if (error) toast.error(error.message);
    else toast.success('SEO updated!');
    setSaving(null);
    setEditingPost(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[--cms-muted]" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[--cms-text]">SEO Management</h1>
        <p className="text-sm text-[--cms-muted] mt-1">Manage SEO titles and meta descriptions for all your content.</p>
      </div>

      {/* Posts SEO */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[--cms-text] mb-4">Posts</h2>
        <div className="rounded-xl border border-[--cms-border] bg-[--cms-card] overflow-hidden">
          {posts.length === 0 ? (
            <p className="p-5 text-sm text-[--cms-muted]">No posts yet.</p>
          ) : (
            <div className="divide-y divide-[--cms-border]">
              {posts.map((post) => (
                <div key={post.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-[--cms-text]">{post.title}</h3>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <Link href={`/admin/posts/${post.id}/edit`} className="text-xs text-[--cms-accent] hover:underline flex items-center gap-1">
                      Edit Post <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                  {editingPost?.id === post.id ? (
                    <div className="space-y-2 mt-3">
                      <input type="text" value={editingPost.seo_title} onChange={(e) => setEditingPost({ ...editingPost, seo_title: e.target.value })} placeholder="SEO Title"
                        className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-3 py-2 text-sm text-[--cms-text] focus:border-[--cms-accent] focus:outline-none" />
                      <textarea value={editingPost.seo_description} onChange={(e) => setEditingPost({ ...editingPost, seo_description: e.target.value })} placeholder="Meta Description" rows={2}
                        className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] px-3 py-2 text-sm text-[--cms-text] focus:border-[--cms-accent] focus:outline-none resize-none" />
                      <div className="flex gap-2">
                        <button onClick={() => savePostSeo(post.id, editingPost.seo_title, editingPost.seo_description)} disabled={saving === post.id}
                          className="flex items-center gap-1.5 rounded-lg bg-[--cms-accent] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50">
                          {saving === post.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Save
                        </button>
                        <button onClick={() => setEditingPost(null)} className="rounded-lg px-3 py-1.5 text-xs text-[--cms-muted] hover:bg-[--cms-hover]">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <p className="text-sm text-[--cms-accent]">{post.seo_title || post.title}</p>
                      <p className="text-xs text-[--cms-muted] mt-0.5">{post.seo_description || 'No meta description set'}</p>
                      <button onClick={() => setEditingPost({ id: post.id, seo_title: post.seo_title || '', seo_description: post.seo_description || '' })} className="mt-2 text-xs text-[--cms-accent] hover:underline">
                        Edit SEO
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pages SEO */}
      <div>
        <h2 className="text-lg font-semibold text-[--cms-text] mb-4">Pages</h2>
        <div className="rounded-xl border border-[--cms-border] bg-[--cms-card] overflow-hidden">
          {pages.length === 0 ? (
            <p className="p-5 text-sm text-[--cms-muted]">No pages configured.</p>
          ) : (
            <div className="divide-y divide-[--cms-border]">
              {pages.map((page) => (
                <PageSeoRow key={page.id} page={page} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
