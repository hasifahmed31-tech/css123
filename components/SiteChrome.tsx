'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Using an array makes it easier to maintain and add more restricted routes in the future
  const routesWithoutChrome = ['/admin', '/login']
  const isCmsRoute = !!pathname && routesWithoutChrome.some((path) => pathname.startsWith(path))

  if (isCmsRoute) return <>{children}</>

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
