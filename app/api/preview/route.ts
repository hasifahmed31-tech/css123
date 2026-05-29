import { NextResponse } from 'next/server'
import { secureApi } from '@/lib/security'

export async function GET(request: Request) {
  const blocked = secureApi(request, { key: 'preview', limit: 30 })
  if (blocked) return blocked

  const url = new URL(request.url)
  const slug = url.searchParams.get('slug') || ''
  const token = url.searchParams.get('token') || ''

  if (!slug || !token) {
    return NextResponse.json({ error: 'Missing preview slug or token' }, { status: 400 })
  }

  return NextResponse.redirect(new URL(`/blog/${encodeURIComponent(slug)}/preview?token=${encodeURIComponent(token)}`, url.origin))
}
