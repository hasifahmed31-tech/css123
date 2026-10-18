import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import { rateLimit } from '@/lib/security'

export async function POST(request: Request) {
  const limited = rateLimit(request, { key: 'revalidate', limit: 20, windowMs: 60_000 })
  if (limited) return limited
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 4_096) {
    return NextResponse.json({ revalidated: false, message: 'Request too large' }, { status: 413 })
  }

  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ revalidated: false, message: 'Revalidation is not configured' }, { status: 503 })
  }

  // Keep query support for existing Sanity webhook configurations; the header
  // is preferred because URLs can be retained in access logs.
  const token = request.headers.get('x-sanity-secret') || new URL(request.url).searchParams.get('secret') || ''
  const supplied = Buffer.from(token)
  const expected = Buffer.from(secret)
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 })
  }

  let body: { _type?: string; slug?: { current?: string } | string } = {}
  try {
    const parsed: unknown = await request.json()
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      body = parsed as { _type?: string; slug?: { current?: string } | string }
    }
  } catch {
    body = {}
  }

  const candidate = typeof body.slug === 'string' ? body.slug : body.slug?.current
  const slug = typeof candidate === 'string' && /^[a-z0-9][a-z0-9-]{0,119}$/.test(candidate) ? candidate : null

  revalidateTag('sanity-posts')
  revalidateTag('sanity-pages')
  revalidateTag('sanity-settings')
  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath('/rss.xml')
  revalidatePath('/sitemap.xml')

  if (slug) {
    if (body._type === 'page') revalidatePath(slug === 'home' ? '/' : `/${slug}`)
    if (body._type === 'post') {
      revalidateTag(`sanity-post-${slug}`)
      revalidatePath(`/blog/${slug}`)
    }
  }

  return NextResponse.json({ revalidated: true, now: new Date().toISOString() })
}
