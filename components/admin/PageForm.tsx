'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CmsPage, PageContent } from '@/lib/cms-types'
import { slugify } from '@/lib/slug'
import { Card } from '@/components/admin/AdminPrimitives'
import MediaPicker from '@/components/admin/MediaPicker'
import { useToast } from '@/components/admin/ToastProvider'
import { Save } from 'lucide-react'

const defaultContent: PageContent = {
  hero: { eyebrow: '', heading: '', body: '', primaryLabel: '', primaryHref: '', secondaryLabel: '', secondaryHref: '', image: '' },
  sections: [
    { id: 'section-1', label: 'Section', heading: '', body: '', image: '', buttonLabel: '', buttonHref: '' },
  ],
  cta: { heading: '', body: '', buttonLabel: '', buttonHref: '' },
}

export default function PageForm({ page }: { page?: CmsPage | null }) {
  const router = useRouter()
  const { notify } = useToast()
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState(page?.title ?? '')
  const [slug, setSlug] = useState(page?.slug ?? '')
  const [content, setContent] = useState<PageContent>({ ...defaultContent, ...(page?.content as PageContent | undefined) })
  const [seo, setSeo] = useState({
    seo_title: page?.seo_title ?? '',
    seo_description: page?.seo_description ?? '',
    featured_image: page?.featured_image ?? '',
    og_image: page?.og_image ?? '',
    canonical_url: page?.canonical_url ?? '',
    meta_keywords: page?.meta_keywords?.join(', ') ?? '',
  })

  function updateHero(field: keyof NonNullable<PageContent['hero']>, value: string) {
    setContent((current) => ({ ...current, hero: { ...current.hero, [field]: value } }))
  }

  function updateCta(field: keyof NonNullable<PageContent['cta']>, value: string) {
    setContent((current) => ({ ...current, cta: { ...current.cta, [field]: value } }))
  }

  function updateSection(index: number, field: string, value: string) {
    setContent((current) => ({
      ...current,
      sections: (current.sections ?? []).map((section, i) => (i === index ? { ...section, [field]: value } : section)),
    }))
  }

  async function save(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)
    const payload = {
      title,
      slug: slug || slugify(title),
      content,
      ...seo,
      meta_keywords: seo.meta_keywords.split(',').map((item) => item.trim()).filter(Boolean),
    }
    const res = await fetch(page ? `/api/pages/${page.id}` : '/api/pages', {
      method: page ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    if (!res.ok) {
      notify('Could not save page', 'error')
      return
    }
    notify(page ? 'Page updated' : 'Page created')
    router.push('/admin/pages')
    router.refresh()
  }

  return (
    <form onSubmit={save} className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <Card className="space-y-4 p-5">
          <Field label="Page title" value={title} onChange={(value) => { setTitle(value); if (!page) setSlug(slugify(value)) }} />
          <Field label="Slug" value={slug} onChange={(value) => setSlug(slugify(value))} />
        </Card>
        <Card className="space-y-4 p-5">
          <h2 className="text-lg font-extrabold">Hero section</h2>
          <Field label="Eyebrow" value={content.hero?.eyebrow ?? ''} onChange={(value) => updateHero('eyebrow', value)} />
          <Field label="Heading" value={content.hero?.heading ?? ''} onChange={(value) => updateHero('heading', value)} />
          <Field label="Body" value={content.hero?.body ?? ''} onChange={(value) => updateHero('body', value)} textarea />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Primary button" value={content.hero?.primaryLabel ?? ''} onChange={(value) => updateHero('primaryLabel', value)} />
            <Field label="Primary href" value={content.hero?.primaryHref ?? ''} onChange={(value) => updateHero('primaryHref', value)} />
          </div>
          <MediaPicker label="Hero image" value={content.hero?.image ?? ''} onChange={(value) => updateHero('image', value)} />
        </Card>
        <Card className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold">Content sections</h2>
            <button
              type="button"
              onClick={() => setContent((current) => ({ ...current, sections: [...(current.sections ?? []), { id: `section-${Date.now()}`, label: 'Section', heading: '', body: '' }] }))}
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-bold dark:border-white/10"
            >
              Add section
            </button>
          </div>
          {(content.sections ?? []).map((section, index) => (
            <div key={section.id} className="space-y-3 rounded-xl border border-gray-200 p-4 dark:border-white/10">
              <Field label="Label" value={section.label} onChange={(value) => updateSection(index, 'label', value)} />
              <Field label="Heading" value={section.heading} onChange={(value) => updateSection(index, 'heading', value)} />
              <Field label="Body" value={section.body} onChange={(value) => updateSection(index, 'body', value)} textarea />
              <MediaPicker label="Section image" value={section.image ?? ''} onChange={(value) => updateSection(index, 'image', value)} />
            </div>
          ))}
        </Card>
        <Card className="space-y-4 p-5">
          <h2 className="text-lg font-extrabold">CTA section</h2>
          <Field label="Heading" value={content.cta?.heading ?? ''} onChange={(value) => updateCta('heading', value)} />
          <Field label="Body" value={content.cta?.body ?? ''} onChange={(value) => updateCta('body', value)} textarea />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Button label" value={content.cta?.buttonLabel ?? ''} onChange={(value) => updateCta('buttonLabel', value)} />
            <Field label="Button href" value={content.cta?.buttonHref ?? ''} onChange={(value) => updateCta('buttonHref', value)} />
          </div>
        </Card>
      </div>
      <div className="space-y-5">
        <Card className="p-5">
          <button disabled={saving} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 text-sm font-bold text-white disabled:opacity-60 dark:bg-white dark:text-gray-950">
            {saving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white dark:border-gray-950/30 dark:border-t-gray-950" /> : <Save className="h-4 w-4" />}
            Save page
          </button>
        </Card>
        <Card className="space-y-4 p-5">
          <MediaPicker label="Featured image" value={seo.featured_image} onChange={(value) => setSeo((current) => ({ ...current, featured_image: value }))} />
          <MediaPicker label="Open Graph image" value={seo.og_image} onChange={(value) => setSeo((current) => ({ ...current, og_image: value }))} />
          <Field label="SEO title" value={seo.seo_title} onChange={(value) => setSeo((current) => ({ ...current, seo_title: value }))} />
          <Field label="SEO description" value={seo.seo_description} onChange={(value) => setSeo((current) => ({ ...current, seo_description: value }))} textarea />
          <Field label="Canonical URL" value={seo.canonical_url} onChange={(value) => setSeo((current) => ({ ...current, canonical_url: value }))} />
          <Field label="Meta keywords" value={seo.meta_keywords} onChange={(value) => setSeo((current) => ({ ...current, meta_keywords: value }))} />
        </Card>
      </div>
    </form>
  )
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/[0.04]" />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/[0.04]" />
      )}
    </label>
  )
}

