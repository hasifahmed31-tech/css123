import { NextResponse, type NextRequest } from 'next/server'

const sanityOrigins = 'https://*.sanity.io https://*.sanity.dev https://api.sanity.io https://www.sanity.io https://*.apicdn.sanity.io https://core.sanity-cdn.com'
const googleOrigins = 'https://accounts.google.com https://accounts.youtube.com'

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV === 'development'
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://tagmanager.google.com https://plausible.io ${sanityOrigins} ${googleOrigins}${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https:",
    `connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://plausible.io https://*.algolia.net https://*.algolianet.com ${sanityOrigins} ${googleOrigins}`,
    `frame-src 'self' https://*.sanity.io https://*.sanity.dev ${googleOrigins}`,
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    `form-action 'self' https://*.sanity.io https://*.sanity.dev ${googleOrigins}`,
    "frame-ancestors 'self'",
    "require-trusted-types-for 'script'",
    "trusted-types nextjs nextjs#bundler dompurify hasif-content",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', csp)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)
  return response
}

export const config = {
  matcher: [
    {
      source: '/((?!api|studio|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
