import { cache, Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import { getSiteSettings, type SiteSettings } from '@/lib/sanity'

const fallbackSettings: SiteSettings = {
  title: 'Hasif',
  description: 'Clear SaaS, AI, SEO, and marketing guides for creators who want faster decisions and cleaner growth systems.',
  email: 'info@hasif.online',
  linkedin: 'https://www.linkedin.com/in/hasifonline',
  navLinks: [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  footerLinks: [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/affiliate-disclosure', label: 'Affiliate disclosure' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ],
  footerNote: 'Independent guides for smarter tools, stronger SEO, and sustainable online growth.',
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Header navLinks={fallbackSettings.navLinks} />}>
        <EditableHeader />
      </Suspense>
      <PageTransition><main className="flex-1">{children}</main></PageTransition>
      <Suspense fallback={<Footer settings={fallbackSettings} />}>
        <EditableFooter />
      </Suspense>
    </>
  )
}

const getCachedSiteSettings = cache(() => getSiteSettings())

async function EditableHeader() {
  const settings = await getCachedSiteSettings()
  return <Header navLinks={settings.navLinks} />
}

async function EditableFooter() {
  const settings = await getCachedSiteSettings()
  return <Footer settings={settings} />
}
