import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/api-auth'
import { slugify } from '@/lib/slug'
import { secureApi } from '@/lib/security'

const bucket = 'cms-media'

export async function GET(request: Request) {
  const blocked = secureApi(request, { key: 'media', limit: 90 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response
    const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false })
    if (error) return NextResponse.json([])
    return NextResponse.json(data)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  const blocked = secureApi(request, { key: 'media-write', limit: 20 })
  if (blocked) return blocked

  try {
    const { supabase, response } = await requireUser()
    if (response) return response
    const formData = await request.formData()
    const file = formData.get('file')
    const alt = String(formData.get('alt_text') || '')
    if (!(file instanceof File)) return NextResponse.json({ error: 'File is required' }, { status: 400 })
    if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'Only images are supported' }, { status: 400 })
    if (file.type === 'image/svg+xml') return NextResponse.json({ error: 'SVG uploads are not supported' }, { status: 400 })
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'Image must be 5MB or smaller' }, { status: 400 })

    const fileName = uniqueImageName(file.name, file.type)
    const path = `uploads/${new Date().getFullYear()}/${fileName}`
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '31536000',
      upsert: false,
      contentType: file.type,
    })
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path)
    const { data, error } = await supabase
      .from('media')
      .insert([{ file_name: file.name, file_path: path, public_url: urlData.publicUrl, mime_type: file.type, size: file.size, alt_text: alt.slice(0, 180) || null }])
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 })
  }
}

function uniqueImageName(name: string, mimeType: string) {
  const extensions: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/avif': '.avif',
  }
  const extension = extensions[mimeType] || '.img'
  return `${slugify(name.replace(/\.[^/.]+$/, '')) || 'upload'}-${Date.now()}${extension}`
}
