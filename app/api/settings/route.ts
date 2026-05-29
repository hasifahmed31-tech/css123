import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'
import { requireUser } from '@/lib/api-auth'
import { cleanText, safeExternalUrl, secureApi } from '@/lib/security'

export async function GET(request: Request) {
  const blocked = secureApi(request, { key: 'settings', limit: 120 })
  if (blocked) return blocked

  try {
    const supabase = await createServerSupabase()
    const { data, error } = await supabase.from('settings').select('*').eq('id', 'site').maybeSingle()
    if (error) return NextResponse.json(null)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(null)
  }
}

export async function PUT(request: Request) {
  const blocked = secureApi(request, { key: 'settings-write', limit: 20 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response
    const body = await request.json()
    const { data, error } = await supabase
      .from('settings')
      .upsert({
        id: 'site',
        site_title: cleanText(body.site_title || 'Hasif', 120),
        site_description: cleanText(body.site_description, 260),
        logo: safeExternalUrl(body.logo),
        favicon: safeExternalUrl(body.favicon),
        footer_text: body.footer_text ? cleanText(body.footer_text, 240) : null,
        contact_email: body.contact_email ? cleanText(body.contact_email, 180) : null,
        phone_number: body.phone_number ? cleanText(body.phone_number, 40) : null,
        social_links: safeLinkMap(body.social_links),
        navbar_links: safeNavLinks(body.navbar_links),
      })
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

function safeNavLinks(value: unknown) {
  if (!Array.isArray(value)) return []
  return value
    .map((link) => ({
      label: String(link?.label || '').trim().slice(0, 40),
      href: safeExternalUrl(link?.href),
    }))
    .filter((link): link is { label: string; href: string } => Boolean(link.label && link.href))
    .slice(0, 8)
}

function safeLinkMap(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .map(([key, url]) => [key.slice(0, 40), safeExternalUrl(url)])
      .filter((entry): entry is [string, string] => Boolean(entry[0] && entry[1]))
      .slice(0, 12)
  )
}
