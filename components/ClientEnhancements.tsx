'use client'

import dynamic from 'next/dynamic'

const NewsletterPopup = dynamic(() => import('@/components/NewsletterPopup'), { ssr: false })
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), { ssr: false })

export default function ClientEnhancements() {
  return (
    <>
      <NewsletterPopup />
      <PerformanceMonitor />
    </>
  )
}
