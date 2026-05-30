import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Services',
    description: 'Content, SEO, and growth services from Hasif.',
    alternates: { canonical: '/services' },
  }
}

export default async function ServicesPage() {
  return (
    <section className="bg-white pt-32 dark:bg-gray-950 sm:pt-36">
      <div className="container-custom py-16 text-center">
        <span className="eyebrow">Services</span>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">
          Practical content, SEO, and growth support
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          Strategy, content systems, and technical SEO support for creators and lean teams building online growth engines.
        </p>
        <Link href="/contact" className="button-premium mt-8 bg-gray-950 px-7 py-4 text-white dark:bg-white dark:text-gray-950">
          Start a conversation
        </Link>
      </div>
    </section>
  )
}
