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
  const settings = getSiteSettingsQuickly()
  return (
    <>
      <Header navLinks={settings.navLinks} />
      <PageTransition><main className="flex-1">{children}</main></PageTransition>
      <Footer settings={settings} />
    </>
  )
}

let cachedSettings = fallbackSettings
let settingsRefresh: Promise<void> | null = null
let lastSettingsRefresh = 0

function getSiteSettingsQuickly(): SiteSettings {
  // Never hold navigation open for a CMS round trip. Refresh settings in the
  // background and use the last known values (or local defaults) immediately.
  if (!settingsRefresh && Date.now() - lastSettingsRefresh > 30_000) {
    lastSettingsRefresh = Date.now()
    settingsRefresh = getSiteSettings()
      .then((settings) => { cachedSettings = settings })
      .catch(() => {})
      .finally(() => { settingsRefresh = null })
  }
  return cachedSettings
}
