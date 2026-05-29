'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { CheckCircle2, X, AlertCircle } from 'lucide-react'

type ToastKind = 'success' | 'error'
type Toast = { id: number; message: string; kind: ToastKind }

const ToastContext = createContext<{ notify: (message: string, kind?: ToastKind) => void } | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const notify = useCallback((message: string, kind: ToastKind = 'success') => {
    const id = Date.now()
    setToasts((items) => [...items, { id, message, kind }])
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 3200)
  }, [])

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[90] grid w-[calc(100%-2rem)] max-w-sm gap-2">
        {toasts.map((toast) => {
          const Icon = toast.kind === 'success' ? CheckCircle2 : AlertCircle
          return (
            <div
              key={toast.id}
              className="animate-drop-in flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-xl shadow-gray-950/10 dark:border-white/10 dark:bg-gray-900"
            >
              <Icon className={`mt-0.5 h-5 w-5 ${toast.kind === 'success' ? 'text-emerald-500' : 'text-red-500'}`} />
              <p className="flex-1 text-sm font-semibold text-gray-800 dark:text-gray-100">{toast.message}</p>
              <button
                type="button"
                onClick={() => setToasts((items) => items.filter((item) => item.id !== toast.id))}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-gray-100"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}

