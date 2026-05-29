'use client'

import { useEffect, useState } from 'react'
import { Mail, X } from 'lucide-react'
import NewsletterForm from '@/components/NewsletterForm'

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('hasif:newsletter-dismissed') === '1') return
    const timer = window.setTimeout(() => setOpen(true), 12_000)
    return () => window.clearTimeout(timer)
  }, [])

  function close() {
    localStorage.setItem('hasif:newsletter-dismissed', '1')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl shadow-gray-950/15 dark:border-white/10 dark:bg-gray-950">
      <button type="button" onClick={close} className="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Close newsletter popup">
        <X className="h-4 w-4" />
      </button>
      <div className="flex gap-3 pr-8">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
          <Mail className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-sm font-extrabold text-gray-950 dark:text-white">Get smarter tool picks weekly</h2>
          <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">A concise digest of SaaS, SEO, and growth ideas.</p>
        </div>
      </div>
      <div className="mt-4">
        <NewsletterForm compact onSuccess={close} />
      </div>
    </div>
  )
}
