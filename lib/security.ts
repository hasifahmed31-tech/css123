import { NextResponse } from 'next/server'

const buckets = new Map<string, { count: number; resetAt: number }>()
const unsafeMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export function rateLimit(request: Request, options: { key?: string; limit?: number; windowMs?: number } = {}) {
  const limit = options.limit ?? 60
  const windowMs = options.windowMs ?? 60_000
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'local'
  const key = `${options.key || 'api'}:${ip}`
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return null
  }

  bucket.count += 1
  if (bucket.count > limit) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((bucket.resetAt - now) / 1000)),
        },
      }
    )
  }

  return null
}

export function requireSameOrigin(request: Request) {
  if (!unsafeMethods.has(request.method.toUpperCase())) return null

  const origin = request.headers.get('origin')
  if (!origin) return null

  const target = new URL(request.url)
  const allowed = new Set([
    target.origin,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    'https://hasif.online',
  ].filter(Boolean))

  if (!allowed.has(origin)) {
    return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 })
  }

  return null
}

export function secureApi(request: Request, options: { key?: string; limit?: number; windowMs?: number } = {}) {
  return rateLimit(request, options) || requireSameOrigin(request)
}

export function safeExternalUrl(value: unknown, allowRelative = true) {
  if (!value) return null
  const url = String(value).trim()
  if (allowRelative && url.startsWith('/')) return url.startsWith('//') ? null : url
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' ? parsed.toString() : null
  } catch {
    return null
  }
}

export function cleanText(value: unknown, maxLength: number) {
  return String(value || '').trim().slice(0, maxLength)
}
