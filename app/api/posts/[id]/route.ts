import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/api-auth'
import { createServerSupabase } from '@/lib/supabase-server'
import { excerptFromContent, sanitizeHtml } from '@/lib/content'
import { slugify } from '@/lib/slug'
import { safeExternalUrl, secureApi } from '@/lib/security'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = secureApi(request, { key: 'posts-read', limit: 120 })
  if (blocked) return blocked

  try {
    const { response } = await requireUser()
    if (response) return response

    const { id } = await params
    const supabase = await createServerSupabase()
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).maybeSingle()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    if (!data) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = secureApi(request, { key: 'posts-write', limit: 30 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response

    const { id } = await params
    const body = await request.json()
    const content = sanitizeHtml(String(body.content || ''))

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('posts')
      .update({
        title: String(body.title).trim(),
        slug: slugify(body.slug || body.title),
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
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = secureApi(request, { key: 'posts-write', limit: 30 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response

    const { id } = await params

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
