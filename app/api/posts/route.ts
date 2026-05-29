import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'
import { requireUser } from '@/lib/api-auth'
import { excerptFromContent, sanitizeHtml } from '@/lib/content'
import { slugify } from '@/lib/slug'
import { safeExternalUrl, secureApi } from '@/lib/security'

export async function GET(request: Request) {
  const blocked = secureApi(request, { key: 'posts', limit: 120 })
  if (blocked) return blocked

  try {
    const supabase = await createServerSupabase()
    const { searchParams } = new URL(request.url)
    const includeDrafts = searchParams.get('drafts') === '1'
    const page = Number(searchParams.get('page') || '1')
    const limit = Math.min(Number(searchParams.get('limit') || '24'), 100)

    if (includeDrafts) {
      const { response } = await requireUser()
      if (response) return response
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)
    if (!includeDrafts) query = query.eq('published', true)

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json([])
    }

    return NextResponse.json(data, { headers: { 'x-total-count': String(count ?? 0) } })
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  const blocked = secureApi(request, { key: 'posts-write', limit: 30 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response

    const body = await request.json()

    if (!body.title) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }
    const slug = slugify(body.slug || body.title)
    const content = sanitizeHtml(String(body.content || ''))

    const { data, error } = await supabase
      .from('posts')
      .insert([{
        title: String(body.title).trim(),
        slug,
        excerpt: body.excerpt || excerptFromContent(content),
        content,
        featured_image: safeExternalUrl(body.featured_image),
        seo_title: body.seo_title || null,
        seo_description: body.seo_description || null,
        og_image: safeExternalUrl(body.og_image),
        canonical_url: safeExternalUrl(body.canonical_url),
        meta_keywords: Array.isArray(body.meta_keywords) ? body.meta_keywords : [],
        category: String(body.category || 'CMS Article').trim().slice(0, 80),
        tags: Array.isArray(body.tags) ? body.tags.map((tag: unknown) => String(tag).trim()).filter(Boolean).slice(0, 16) : [],
        author_name: String(body.author_name || 'Hasif').trim().slice(0, 80),
        author_role: body.author_role ? String(body.author_role).trim().slice(0, 120) : null,
        author_bio: body.author_bio ? String(body.author_bio).trim().slice(0, 400) : null,
        author_image: safeExternalUrl(body.author_image),
        scheduled_at: body.scheduled_at ? new Date(body.scheduled_at).toISOString() : null,
        published: Boolean(body.published),
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
