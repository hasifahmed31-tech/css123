'use client'

import { useReportWebVitals } from 'next/web-vitals'

export default function PerformanceMonitor() {
  useReportWebVitals((metric) => {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/vitals', JSON.stringify(metric))
    }
  })

  return null
}
