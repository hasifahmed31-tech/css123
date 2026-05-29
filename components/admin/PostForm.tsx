'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CmsPost } from '@/lib/cms-types'
import { slugify } from '@/lib/slug'
import RichTextEditor from '@/components/admin/RichTextEditor'
import MediaPicker from '@/components/admin/MediaPicker'
import { useToast } from '@/components/admin/ToastProvider'
import { Card } from '@/components/admin/AdminPrimitives'
import { Save } from 'lucide-react'

export default function PostForm({ post }: { post?: CmsPost | null }) {
  const router = useRouter()
  const { notify } = useToast()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    excerpt: post?.excerpt ?? '',
    content: post?.content ?? '',
    featured_image: post?.featured_image ?? '',
    seo_title: post?.seo_title ?? '',
    seo_description: post?.seo_description ?? '',
    og_image: post?.og_image ?? '',
    canonical_url: post?.canonical_url ?? '',
    meta_keywords: post?.meta_keywords?.join(', ') ?? '',
    category: post?.category ?? 'CMS Article',
    tags: post?.tags?.join(', ') ?? '',
    author_name: post?.author_name ?? 'Hasif',
    author_role: post?.author_role ?? '',
    author_bio: post?.author_bio ?? '',
    author_image: post?.author_image ?? '',
    scheduled_at: post?.scheduled_at ? post.scheduled_at.slice(0, 16) : '',
    published: post?.published ?? false,
  })

  function setField(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function save(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      meta_keywords: form.meta_keywords.split(',').map((item) => item.trim()).filter(Boolean),
      tags: form.tags.split(',').map((item) => item.trim()).filter(Boolean),
    }
    const res = await fetch(post ? `/api/posts/${post.id}` : '/api/posts', {
      method: post ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      notify(data.error || 'Could not save post', 'error')
      return
    }
    notify(post ? 'Post updated' : 'Post created')
    router.push('/admin/posts')
    router.refresh()
  }

  return (
    <form onSubmit={save} className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <Card className="p-5">
          <label className="mb-1.5 block text-sm font-bold">Title</label>
          <input
            value={form.title}
            onChange={(event) => {
              setField('title', event.target.value)
              if (!post) setField('slug', slugify(event.target.value))
            }}
            required
            className="h-12 w-full rounded-xl border border-gray-200 bg-white px-3 text-lg font-bold outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/[0.04]"
          />
          <label className="mb-1.5 mt-4 block text-sm font-bold">Slug</label>
          <input
            value={form.slug}
            onChange={(event) => setField('slug', slugify(event.target.value))}
            required
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/[0.04]"
          />
        </Card>
        <RichTextEditor value={form.content} onChange={(value) => setField('content', value)} />
      </div>
      <div className="space-y-5">
        <Card className="p-5">
          <button
            disabled={saving}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 text-sm font-bold text-white hover:bg-gray-800 disabled:opacity-60 dark:bg-white dark:text-gray-950"
          >
            {saving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white dark:border-gray-950/30 dark:border-t-gray-950" /> : <Save className="h-4 w-4" />}
            Save post
          </button>
          <label className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 p-3 text-sm font-bold dark:border-white/10">
            Published
            <input type="checkbox" checked={form.published} onChange={(event) => setField('published', event.target.checked)} className="h-5 w-5" />
          </label>
          {post?.preview_token && (
            <a href={`/blog/${post.slug}/preview?token=${post.preview_token}`} target="_blank" rel="noopener noreferrer" className="mt-3 block rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-bold dark:border-white/10">
              Preview draft
            </a>
          )}
        </Card>
        <Card className="space-y-4 p-5">
          <MediaPicker label="Featured image" value={form.featured_image} onChange={(value) => setField('featured_image', value)} />
          <MediaPicker label="Open Graph image" value={form.og_image} onChange={(value) => setField('og_image', value)} />
          <MediaPicker label="Author image" value={form.author_image} onChange={(value) => setField('author_image', value)} />
        </Card>
        <Card className="space-y-4 p-5">
          <Field label="Category" value={form.category} onChange={(value) => setField('category', value)} />
          <Field label="Tags" value={form.tags} onChange={(value) => setField('tags', value)} />
          <Field label="Author name" value={form.author_name} onChange={(value) => setField('author_name', value)} />
          <Field label="Author role" value={form.author_role} onChange={(value) => setField('author_role', value)} />
          <Field label="Author bio" value={form.author_bio} onChange={(value) => setField('author_bio', value)} textarea />
          <Field label="Schedule publish time" value={form.scheduled_at} onChange={(value) => setField('scheduled_at', value)} type="datetime-local" />
          <Field label="Excerpt" value={form.excerpt} onChange={(value) => setField('excerpt', value)} textarea />
          <Field label="SEO title" value={form.seo_title} onChange={(value) => setField('seo_title', value)} />
          <Field label="SEO description" value={form.seo_description} onChange={(value) => setField('seo_description', value)} textarea />
          <Field label="Canonical URL" value={form.canonical_url} onChange={(value) => setField('canonical_url', value)} />
          <Field label="Meta keywords" value={form.meta_keywords} onChange={(value) => setField('meta_keywords', value)} />
        </Card>
      </div>
    </form>
  )
}

function Field({ label, value, onChange, textarea, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/[0.04]" />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/[0.04]" />
      )}
    </label>
  )
}
