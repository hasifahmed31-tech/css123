import { NextResponse } from 'next/server'
import { siteOrigin } from '@/lib/site'

const buckets = new Map<string, { count: number; resetAt: number }>()
const unsafeMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])
const MAX_RATE_LIMIT_BUCKETS = 10_000

export function rateLimit(request: Request, options: { key?: string; limit?: number; windowMs?: number } = {}) {
  const limit = options.limit ?? 60
  const windowMs = options.windowMs ?? 60_000
  // Prefer the proxy-supplied single address. The first X-Forwarded-For value
  // can be chosen by a caller when a proxy appends to a supplied chain.
  const forwarded = request.headers.get('x-forwarded-for')?.split(',').map((value) => value.trim()).filter(Boolean)
  const ip = request.headers.get('x-real-ip')?.trim() || forwarded?.at(-1) || 'local'
  const key = `${options.key || 'api'}:${ip}`
  const now = Date.now()
  const bucket = buckets.get(key)

  if (buckets.size >= MAX_RATE_LIMIT_BUCKETS && !bucket) {
    for (const [bucketKey, value] of buckets) {
      if (value.resetAt <= now) buckets.delete(bucketKey)
      if (buckets.size < MAX_RATE_LIMIT_BUCKETS) break
    }
    if (buckets.size >= MAX_RATE_LIMIT_BUCKETS) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': '60' } })
    }
  }

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
  if (!origin) return NextResponse.json({ error: 'Request origin is required' }, { status: 403 })

  const target = new URL(request.url)
  const configuredOrigins = [process.env.NEXT_PUBLIC_SITE_URL, process.env.SITE_URL, siteOrigin, 'https://hasif.online', 'https://www.hasif.online']
  const allowed = new Set(configuredOrigins.flatMap((value) => {
    if (!value) return []
    try { return [new URL(value).origin] } catch { return [] }
  }))

  if (process.env.NODE_ENV !== 'production' && ['localhost', '127.0.0.1', '[::1]'].includes(target.hostname)) {
    allowed.add(target.origin)
  }

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
