'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const GrowthGuideFinder = dynamic(() => import('./GrowthGuideFinder'), { ssr: false })

export default function DeferredGrowthGuideFinder() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element || !('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setShouldLoad(true)
        observer.disconnect()
      }
    }, { rootMargin: '900px 0px' })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={sectionRef}>{shouldLoad ? <GrowthGuideFinder /> : null}</div>
}
