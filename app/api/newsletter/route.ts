import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'
import { cleanText, secureApi } from '@/lib/security'

export async function POST(request: Request) {
  const blocked = secureApi(request, { key: 'newsletter', limit: 8, windowMs: 60_000 })
  if (blocked) return blocked

  try {
    const body = await request.json()
    const email = cleanText(body.email, 180).toLowerCase()
    const source = cleanText(body.source, 40) || 'inline'

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const supabase = await createServerSupabase()
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, source }, { onConflict: 'email' })

    if (error) return NextResponse.json({ ok: true })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Could not subscribe' }, { status: 500 })
  }
}
