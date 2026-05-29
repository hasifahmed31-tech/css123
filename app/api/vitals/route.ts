import { NextResponse } from 'next/server'
import { secureApi } from '@/lib/security'

export async function POST(request: Request) {
  const blocked = secureApi(request, { key: 'vitals', limit: 120 })
  if (blocked) return blocked

  try {
    const metric = await request.json()
    if (process.env.NODE_ENV !== 'production') {
      console.info('web-vital', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        route: metric.navigationType,
      })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}
