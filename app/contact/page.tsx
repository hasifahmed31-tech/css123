import type { Metadata } from 'next'
import ContactClient from './ContactClient'
import { getEditablePage } from '@/lib/sanity'

export const revalidate = 1800

export async function generateMetadata(): Promise<Metadata> {
  const page = await getEditablePage('contact')
  return {
    title: page?.metaTitle || page?.title || 'Contact Hasif',
    description: page?.metaDescription || page?.description || 'Contact Hasif for collaborations, advertising, guest posts, and support.',
    keywords: page?.keywords || undefined,
    alternates: { canonical: '/contact' },
    openGraph: page?.ogImage ? { images: [{ url: page.ogImage, width: 1200, height: 675, alt: page.title || 'Contact Hasif' }] } : undefined,
  }
}

export default async function ContactPage() {
  const page = await getEditablePage('contact')
  return (
    <ContactClient
      eyebrow={page?.eyebrow}
      title={page?.title}
      description={page?.description}
      bodyHtml={page?.bodyHtml}
    />
  )
}
