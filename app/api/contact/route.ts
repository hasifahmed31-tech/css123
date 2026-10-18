import { NextResponse } from 'next/server'
import { cleanText, secureApi } from '@/lib/security'

const inbox = 'info@hasif.online'

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character] || character)
}

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

    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.CONTACT_FROM_EMAIL
    if (!apiKey || !from) {
      return NextResponse.json({ error: 'Email delivery is not configured yet. Please email info@hasif.online directly.' }, { status: 503 })
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [inbox],
        reply_to: email,
        subject: `[Hasif website] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        html: `<h2>New website message</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><hr /><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
      }),
      signal: AbortSignal.timeout(12_000),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'We could not send your message right now. Please email info@hasif.online directly.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'We could not send your message right now. Please email info@hasif.online directly.' }, { status: 502 })
  }
}
