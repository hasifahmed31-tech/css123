import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/api-auth'
import { slugify } from '@/lib/slug'
import { safeExternalUrl, secureApi } from '@/lib/security'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = secureApi(request, { key: 'pages-read', limit: 90 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response

    const { id } = await params
    const { data, error } = await supabase.from('pages').select('*').eq('id', id).maybeSingle()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    if (!data) return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = secureApi(request, { key: 'pages-write', limit: 30 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response
    const { id } = await params
    const body = await request.json()
    if (!body.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    const { data, error } = await supabase
      .from('pages')
      .update({
        title: String(body.title).trim(),
        slug: slugify(body.slug || body.title),
        content: body.content || {},
        seo_title: body.seo_title || null,
        seo_description: body.seo_description || null,
        featured_image: safeExternalUrl(body.featured_image),
        og_image: safeExternalUrl(body.og_image),
        canonical_url: safeExternalUrl(body.canonical_url),
        meta_keywords: Array.isArray(body.meta_keywords) ? body.meta_keywords : [],
      })
      .eq('id', id)
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = secureApi(request, { key: 'pages-write', limit: 30 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response
    const { id } = await params
    const { error } = await supabase.from('pages').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}
