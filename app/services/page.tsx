import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Check, Compass, FileSearch, Layers3, PenTool } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Services',
    description: 'Content, SEO, and growth services from Hasif.',
    alternates: { canonical: '/services' },
  }
}

export default async function ServicesPage() {
  return (
    <main className="page-surface pb-20">
      <section className="relative isolate overflow-hidden bg-[#111019] pb-24 pt-28 text-white sm:pt-36 sm:pb-28">
        <div className="pointer-events-none absolute -right-40 -top-44 -z-10 h-[36rem] w-[36rem] rounded-full bg-violet-700/25 blur-3xl" />
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <span className="eyebrow">Services · Built for momentum</span>
            <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">Make your next stage of growth <span className="text-violet-300">easier to reach.</span></h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">Practical strategy and hands-on support for teams ready to turn useful ideas into a stronger online presence.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="button-premium gap-2 rounded-xl bg-[#7955e8] px-6 py-4 text-sm text-white shadow-lg shadow-violet-950/30 transition hover:bg-[#6844d0]">Talk through your goals <ArrowUpRight className="h-4 w-4" /></Link>
              <a href="#offerings" className="text-sm font-semibold text-white/70 underline decoration-white/25 underline-offset-4 transition hover:text-white">Explore services</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-3 rounded-[2rem] border border-violet-300/20" />
            <div className="relative aspect-[1.18/1] overflow-hidden rounded-[1.5rem] bg-[#211a35] shadow-2xl shadow-black/30">
              <Image src="/images/articles/analytics.jpg" alt="A team reviewing performance data on a laptop" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111019]/90 via-[#111019]/5 to-[#111019]/10" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">Strategy · Content · Search</p>
                <p className="mt-2 max-w-sm font-serif text-2xl leading-tight text-white sm:text-3xl">A clearer plan for the work that matters.</p>
              </div>
            </div>
            <div className="absolute -bottom-5 right-5 rounded-2xl border border-white/10 bg-[#211a35]/95 px-5 py-3 shadow-xl backdrop-blur"><span className="text-xs font-medium text-white/70">Start with one focused conversation</span></div>
          </div>
        </div>
      </section>
      <section id="offerings" className="container-custom relative z-10 -mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4" aria-label="Services">
        {[
          { icon: Compass, title: 'Growth strategy', copy: 'Clarify your audience, priorities, and the next steps that will make the biggest difference.' },
          { icon: PenTool, title: 'Content systems', copy: 'Build a repeatable approach to planning and publishing useful, consistent content.' },
          { icon: FileSearch, title: 'Technical SEO', copy: 'Find and fix the site quality issues that make it harder for people and search engines to find you.' },
          { icon: Layers3, title: 'Content reviews', copy: 'Improve existing pages with clearer structure, stronger internal links, and focused search intent.' },
        ].map(({ icon: Icon, title, copy }) => <article key={title} className="premium-card p-6 sm:p-7"><span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5b35b8]/[0.08] text-[#5b35b8] dark:text-[#e3d9ff]"><Icon className="h-5 w-5" /></span><h2 className="text-lg font-semibold tracking-tight">{title}</h2><p className="section-copy mt-3 text-sm">{copy}</p></article>)}
      </section>
      <section className="container-custom mt-16">
        <div className="mx-auto grid max-w-5xl gap-8 rounded-3xl border border-gray-200/80 bg-gray-50 p-7 dark:border-white/10 dark:bg-white/[0.03] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><span className="eyebrow">A clear starting point</span><h2 className="mt-4 text-2xl font-semibold tracking-tight">Tell us where you want to go.</h2><p className="section-copy mt-3 max-w-2xl">Share a little about your project. We’ll respond with a practical next step and whether we’re the right fit.</p><ul className="mt-5 grid gap-2 text-sm text-gray-600 dark:text-gray-300 sm:grid-cols-2"><li className="flex gap-2"><Check className="h-4 w-4 text-[#5b35b8]" /> No-pressure first conversation</li><li className="flex gap-2"><Check className="h-4 w-4 text-[#5b35b8]" /> Tailored to your goals</li></ul></div>
          <Link href="/contact" className="button-premium gap-2 self-center rounded-full border border-gray-300 px-6 py-3 text-sm dark:border-white/20">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  )
}
