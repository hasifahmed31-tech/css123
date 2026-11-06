import { NextResponse } from 'next/server'
import { cleanText, secureApi } from '@/lib/security'

// Web3Forms access keys are intended to be public in website contact forms.
const web3FormsAccessKey = '688a3eea-8603-44bd-b69d-5862813b059e'

export async function POST(request: Request) {
  const blocked = secureApi(request, { key: 'contact', limit: 5, windowMs: 60_000 })
  if (blocked) return blocked

  try {
    const body = await request.json()
    if (typeof body.website === 'string' && body.website.trim()) return NextResponse.json({ ok: true })

    const name = cleanText(body.name, 100)
    const email = cleanText(body.email, 180).toLowerCase()
    const subject = cleanText(body.subject, 160).replace(/[\r\n]+/g, ' ') || 'Website enquiry'
    const message = cleanText(body.message, 4000)

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      return NextResponse.json({ error: 'Please check your name, email, and message.' }, { status: 400 })
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: web3FormsAccessKey,
        from_name: 'Hasif Website',
        name,
        email,
        subject: `[Hasif website] ${subject}`,
        message,
      }),
      signal: AbortSignal.timeout(12_000),
    })

    const result = await response.json().catch(() => null)
    if (!response.ok || result?.success !== true) {
      return NextResponse.json({ error: 'We could not send your message right now. Please use the email link to contact us.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'We could not send your message right now. Please use the email link to contact us.' }, { status: 502 })
  }
}
