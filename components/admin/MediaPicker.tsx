'use client'

import { useEffect, useState } from 'react'
import type { CmsMedia } from '@/lib/cms-types'
import { ImageIcon, X } from 'lucide-react'

export default function MediaPicker({
  value,
  onChange,
  label = 'Image URL',
}: {
  value: string
  onChange: (value: string) => void
  label?: string
}) {
  const [open, setOpen] = useState(false)
  const [media, setMedia] = useState<CmsMedia[]>([])

  useEffect(() => {
    if (!open) return
    fetch('/api/media')
      .then((res) => res.json())
      .then((data) => setMedia(Array.isArray(data) ? data : []))
      .catch(() => setMedia([]))
  }, [open])

  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-gray-800 dark:text-gray-200">{label}</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/[0.04]"
          placeholder="https://..."
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 px-3 text-sm font-bold hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/10"
        >
          <ImageIcon className="h-4 w-4" />
          Library
        </button>
      </div>
      {value && (
        <div className="mt-3 h-28 w-44 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-white/5">
          <img src={value} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-white/10">
              <h2 className="font-extrabold">Choose media</h2>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid max-h-[70vh] gap-3 overflow-auto p-4 sm:grid-cols-3 lg:grid-cols-4">
              {media.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onChange(item.public_url)
                    setOpen(false)
                  }}
                  className="overflow-hidden rounded-xl border border-gray-200 text-left hover:border-gray-400 dark:border-white/10"
                >
                  <img src={item.public_url} alt={item.alt_text || item.file_name} className="aspect-video w-full object-cover" />
                  <span className="block truncate p-2 text-xs font-semibold">{item.file_name}</span>
                </button>
              ))}
              {media.length === 0 && <p className="col-span-full p-8 text-center text-sm text-gray-500">No media yet.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

