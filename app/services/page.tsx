import type { Metadata } from 'next'
import Link from 'next/link'
import CmsPageSections from '@/components/CmsPageSections'
import { getPageBySlug, metadataFromCms } from '@/lib/cms'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('services')
  if (!page) return { title: 'Services', description: 'Content, SEO, and growth services from Hasif.' }
  return metadataFromCms({
    title: page.seo_title || page.title,
    description: page.seo_description,
    image: page.og_image || page.featured_image,
    canonical: page.canonical_url || '/services',
    keywords: page.meta_keywords,
  })
}

export default async function ServicesPage() {
  const page = await getPageBySlug('services')

  return (
    <>
      <CmsPageSections page={page} />
      {!page && (
        <section className="bg-white pt-32 dark:bg-gray-950 sm:pt-36">
          <div className="container-custom py-16 text-center">
            <span className="eyebrow">Services</span>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">
              Practical content, SEO, and growth support
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              Create a CMS page with the slug services to fully control this page from the admin dashboard.
            </p>
            <Link href="/contact" className="button-premium mt-8 bg-gray-950 px-7 py-4 text-white dark:bg-white dark:text-gray-950">
              Start a conversation
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

