import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/api-auth'
import { secureApi } from '@/lib/security'

const bucket = 'cms-media'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = secureApi(request, { key: 'media-write', limit: 20 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response
    const { id } = await params
    const body = await request.json()
    const { data, error } = await supabase
      .from('media')
      .update({ alt_text: body.alt_text || null })
      .eq('id', id)
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to update media' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const blocked = secureApi(request, { key: 'media-write', limit: 20 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response
    const { id } = await params
    const { data: media } = await supabase.from('media').select('*').eq('id', id).maybeSingle()
    if (!media) return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    await supabase.storage.from(bucket).remove([media.file_path])
    const { error } = await supabase.from('media').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 })
  }
}
