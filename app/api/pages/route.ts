import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/api-auth'
import { slugify } from '@/lib/slug'
import { safeExternalUrl, secureApi } from '@/lib/security'

export async function GET(request: Request) {
  const blocked = secureApi(request, { key: 'pages', limit: 90 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response
    const { data, error } = await supabase.from('pages').select('*').order('updated_at', { ascending: false })
    if (error) return NextResponse.json([])
    return NextResponse.json(data)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  const blocked = secureApi(request, { key: 'pages-write', limit: 30 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response
    const body = await request.json()
    if (!body.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    const { data, error } = await supabase
      .from('pages')
      .insert([{
        title: String(body.title).trim(),
        slug: slugify(body.slug || body.title),
        content: body.content || {},
        seo_title: body.seo_title || null,
        seo_description: body.seo_description || null,
        featured_image: safeExternalUrl(body.featured_image),
        og_image: safeExternalUrl(body.og_image),
        canonical_url: safeExternalUrl(body.canonical_url),
        meta_keywords: Array.isArray(body.meta_keywords) ? body.meta_keywords : [],
      }])
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}
