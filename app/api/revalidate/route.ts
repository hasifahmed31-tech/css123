import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (secret) {
    const token = request.headers.get('x-sanity-secret') || new URL(request.url).searchParams.get('secret')
    if (token !== secret) {
      return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 })
    }
  }

  let body: { _type?: string; slug?: { current?: string } | string } = {}
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const slug = typeof body.slug === 'string' ? body.slug : body.slug?.current

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
