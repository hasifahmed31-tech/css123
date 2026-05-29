'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import { useToast } from '@/components/admin/ToastProvider'

export default function DeleteButton({ endpoint, label }: { endpoint: string; label: string }) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const router = useRouter()
  const { notify } = useToast()

  async function remove() {
    setBusy(true)
    const res = await fetch(endpoint, { method: 'DELETE' })
    setBusy(false)
    if (!res.ok) {
      notify('Could not delete item', 'error')
      return
    }
    notify('Item deleted')
    setOpen(false)
    router.refresh()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-300"
        aria-label={`Delete ${label}`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <ConfirmDialog
        open={open}
        title="Delete item?"
        body={`This will permanently delete "${label}".`}
        busy={busy}
        onCancel={() => setOpen(false)}
        onConfirm={remove}
      />
    </>
  )
}

