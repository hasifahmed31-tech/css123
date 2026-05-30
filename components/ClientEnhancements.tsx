'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const NewsletterPopup = dynamic(() => import('@/components/NewsletterPopup'), { ssr: false })
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), { ssr: false })

export default function ClientEnhancements() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const start = () => setReady(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 3500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = globalThis.setTimeout(start, 2500)
    return () => globalThis.clearTimeout(id)
  }, [])

  if (!ready) return null

  return (
    <>
      <NewsletterPopup />
      <PerformanceMonitor />
    </>
  )
}
