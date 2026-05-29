'use client'

import { useState } from 'react'
import type { SiteSettings } from '@/lib/cms-types'
import { Card } from '@/components/admin/AdminPrimitives'
import MediaPicker from '@/components/admin/MediaPicker'
import { useToast } from '@/components/admin/ToastProvider'
import { Save } from 'lucide-react'

export default function SettingsForm({ settings }: { settings: SiteSettings | null }) {
  const { notify } = useToast()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    site_title: settings?.site_title ?? 'Hasif',
    site_description: settings?.site_description ?? '',
    logo: settings?.logo ?? '',
    favicon: settings?.favicon ?? '',
    footer_text: settings?.footer_text ?? '',
    contact_email: settings?.contact_email ?? '',
    phone_number: settings?.phone_number ?? '',
    linkedin: settings?.social_links?.linkedin ?? '',
    x: settings?.social_links?.x ?? '',
    youtube: settings?.social_links?.youtube ?? '',
    navbar_links: JSON.stringify(settings?.navbar_links ?? [{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }], null, 2),
  })

  function setField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function save(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)
    let navbar_links: Array<{ label: string; href: string }>
    try {
      navbar_links = JSON.parse(form.navbar_links)
    } catch {
      setSaving(false)
      notify('Navbar links must be valid JSON', 'error')
      return
    }
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        social_links: { linkedin: form.linkedin, x: form.x, youtube: form.youtube },
        navbar_links,
      }),
    })
    setSaving(false)
    if (!res.ok) {
      notify('Could not save settings', 'error')
      return
    }
    notify('Settings updated')
  }

  return (
    <form onSubmit={save} className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <Card className="space-y-4 p-5">
        <Field label="Site title" value={form.site_title} onChange={(value) => setField('site_title', value)} />
        <Field label="Site description" value={form.site_description} onChange={(value) => setField('site_description', value)} textarea />
        <Field label="Footer text" value={form.footer_text} onChange={(value) => setField('footer_text', value)} textarea />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Contact email" value={form.contact_email} onChange={(value) => setField('contact_email', value)} />
          <Field label="Phone number" value={form.phone_number} onChange={(value) => setField('phone_number', value)} />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="LinkedIn" value={form.linkedin} onChange={(value) => setField('linkedin', value)} />
          <Field label="X/Twitter" value={form.x} onChange={(value) => setField('x', value)} />
          <Field label="YouTube" value={form.youtube} onChange={(value) => setField('youtube', value)} />
        </div>
        <Field label="Navbar links JSON" value={form.navbar_links} onChange={(value) => setField('navbar_links', value)} textarea rows={8} />
      </Card>
      <div className="space-y-5">
        <Card className="p-5">
          <button disabled={saving} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 text-sm font-bold text-white disabled:opacity-60 dark:bg-white dark:text-gray-950">
            {saving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white dark:border-gray-950/30 dark:border-t-gray-950" /> : <Save className="h-4 w-4" />}
            Save settings
          </button>
        </Card>
        <Card className="space-y-4 p-5">
          <MediaPicker label="Logo" value={form.logo} onChange={(value) => setField('logo', value)} />
          <MediaPicker label="Favicon" value={form.favicon} onChange={(value) => setField('favicon', value)} />
        </Card>
      </div>
    </form>
  )
}

function Field({ label, value, onChange, textarea, rows = 3 }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean; rows?: number }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/[0.04]" />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/[0.04]" />
      )}
    </label>
  )
}

