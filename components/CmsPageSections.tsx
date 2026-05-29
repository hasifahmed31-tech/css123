import Link from 'next/link'
import type { CmsPage, PageContent } from '@/lib/cms-types'

export default function CmsPageSections({ page }: { page: CmsPage | null }) {
  if (!page) return null
  const content = page.content as PageContent
  const hero = content.hero
  const sections = content.sections ?? []
  const cta = content.cta

  return (
    <div className="bg-white dark:bg-gray-950">
      {hero && (hero.heading || hero.body) && (
        <section className="relative overflow-hidden border-b border-gray-200 bg-gray-50 pt-28 dark:border-white/10 dark:bg-white/[0.03] sm:pt-32">
          <div className="container-custom grid gap-8 py-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              {hero.eyebrow && <span className="eyebrow">{hero.eyebrow}</span>}
              {hero.heading && <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">{hero.heading}</h1>}
              {hero.body && <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">{hero.body}</p>}
              <div className="mt-7 flex flex-wrap gap-3">
                {hero.primaryLabel && hero.primaryHref && <Link href={hero.primaryHref} className="button-premium bg-gray-950 px-6 py-3 text-white dark:bg-white dark:text-gray-950">{hero.primaryLabel}</Link>}
                {hero.secondaryLabel && hero.secondaryHref && <Link href={hero.secondaryHref} className="button-premium border border-gray-200 px-6 py-3 text-gray-800 dark:border-white/10 dark:text-gray-100">{hero.secondaryLabel}</Link>}
              </div>
            </div>
            {hero.image && <img src={hero.image} alt="" className="aspect-video w-full rounded-2xl object-cover shadow-xl" />}
          </div>
        </section>
      )}
      {sections.length > 0 && (
        <section className="py-14 sm:py-20">
          <div className="container-custom grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <article key={section.id} className="premium-card p-6">
                {section.image && <img src={section.image} alt="" className="mb-5 aspect-video w-full rounded-xl object-cover" />}
                {section.label && <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#6d28d9] dark:text-[#c4b5fd]">{section.label}</span>}
                <h2 className="mt-3 text-xl font-extrabold text-gray-950 dark:text-white">{section.heading}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{section.body}</p>
                {section.buttonLabel && section.buttonHref && <Link href={section.buttonHref} className="mt-5 inline-flex text-sm font-bold text-[#6d28d9] dark:text-[#c4b5fd]">{section.buttonLabel}</Link>}
              </article>
            ))}
          </div>
        </section>
      )}
      {cta && (cta.heading || cta.body) && (
        <section className="bg-gray-950 py-14 text-white">
          <div className="container-custom text-center">
            {cta.heading && <h2 className="text-3xl font-black">{cta.heading}</h2>}
            {cta.body && <p className="mx-auto mt-3 max-w-2xl text-gray-300">{cta.body}</p>}
            {cta.buttonLabel && cta.buttonHref && <Link href={cta.buttonHref} className="button-premium mt-6 bg-white px-6 py-3 text-gray-950">{cta.buttonLabel}</Link>}
          </div>
        </section>
      )}
    </div>
  )
}

