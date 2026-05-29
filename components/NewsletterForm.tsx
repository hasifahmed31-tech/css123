'use client'

import { useCallback, useState } from 'react'
import { Check, Send } from 'lucide-react'

export default function NewsletterForm({ compact = false, onSuccess }: { compact?: boolean; onSuccess?: () => void }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault()
    const trimmed = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return
    setStatus('loading')
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmed, source: compact ? 'popup' : 'inline' }),
    })
    if (!res.ok) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
    window.setTimeout(() => {
      setStatus('idle')
      onSuccess?.()
    }, compact ? 900 : 5000)
  }, [compact, email, onSuccess])

  return (
    <form onSubmit={handleSubmit} className={`flex gap-3 ${compact ? 'flex-col sm:flex-row' : 'mx-auto max-w-md flex-col sm:flex-row'}`}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        required
        autoComplete="email"
        className={`${compact ? 'py-3' : 'py-3.5'} flex-1 rounded-xl border border-transparent bg-white/95 px-4 text-sm text-gray-900 outline-none transition-colors duration-150 placeholder:text-gray-500 focus:border-white/30 focus:ring-2 focus:ring-white/50 dark:bg-gray-800/95 dark:text-white`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`${compact ? 'px-4 py-3' : 'px-8 py-3.5'} inline-flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 ${
          status === 'success'
            ? 'bg-emerald-500 text-white'
            : compact
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'bg-white text-indigo-700 hover:bg-indigo-50 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-500'
        }`}
      >
        {status === 'success' ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        {status === 'success' ? 'Subscribed' : status === 'loading' ? 'Saving' : 'Subscribe'}
      </button>
      {status === 'error' && <p className="text-xs font-semibold text-rose-200">Could not subscribe. Try again.</p>}
    </form>
  )
}
