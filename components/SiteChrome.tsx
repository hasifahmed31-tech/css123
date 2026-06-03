import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSiteSettings } from '@/lib/sanity'

export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <>
      <Header navLinks={settings.navLinks} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  )
}
