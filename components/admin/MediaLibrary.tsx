'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CmsMedia } from '@/lib/cms-types'
import { Card } from '@/components/admin/AdminPrimitives'
import DeleteButton from '@/components/admin/DeleteButton'
import { useToast } from '@/components/admin/ToastProvider'
import { UploadCloud } from 'lucide-react'

export default function MediaLibrary() {
  const [items, setItems] = useState<CmsMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { notify } = useToast()

  const load = useCallback(() => {
    setLoading(true)
    fetch('/api/media')
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => notify('Could not load media', 'error'))
      .finally(() => setLoading(false))
  }, [notify])

  useEffect(() => load(), [load])

  async function upload(files: FileList | File[]) {
    const file = Array.from(files)[0]
    if (!file) return
    setUploading(true)
    const body = new FormData()
    body.append('file', file)
    const res = await fetch('/api/media', { method: 'POST', body })
    setUploading(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      notify(data.error || 'Upload failed', 'error')
      return
    }
    notify('Image uploaded')
    load()
  }

  return (
    <div className="space-y-5">
      <Card
        className="border-dashed p-6"
      >
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            upload(event.dataTransfer.files)
          }}
          className="flex min-h-44 flex-col items-center justify-center rounded-2xl bg-gray-50 p-6 text-center dark:bg-white/[0.03]"
        >
          <UploadCloud className="h-10 w-10 text-gray-400" />
          <h2 className="mt-3 text-lg font-extrabold">Drag and drop images</h2>
          <p className="mt-1 text-sm text-gray-500">Images are stored in Supabase Storage and served from public URLs.</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-4 rounded-xl bg-gray-950 px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-gray-950"
          >
            {uploading ? 'Uploading...' : 'Choose image'}
          </button>
          <input ref={inputRef} hidden type="file" accept="image/*" onChange={(event) => event.target.files && upload(event.target.files)} />
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <img src={item.public_url} alt={item.alt_text || item.file_name} className="aspect-video w-full object-cover" />
            <div className="p-3">
              <p className="truncate text-sm font-bold">{item.file_name}</p>
              <p className="mt-1 truncate text-xs text-gray-500">{item.public_url}</p>
              <div className="mt-3 flex items-center justify-between">
                <a href={item.public_url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-gray-600 underline dark:text-gray-300">
                  Open URL
                </a>
                <DeleteButton endpoint={`/api/media/${item.id}`} label={item.file_name} />
              </div>
            </div>
          </Card>
        ))}
        {!loading && items.length === 0 && <p className="col-span-full rounded-2xl border border-gray-200 p-10 text-center text-gray-500 dark:border-white/10">No media yet.</p>}
        {loading && Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-56 animate-pulse rounded-2xl bg-gray-100 dark:bg-white/10" />)}
      </div>
    </div>
  )
}

