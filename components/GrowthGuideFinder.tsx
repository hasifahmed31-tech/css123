'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Bot, Compass, Search, Sparkles, Store, Wrench } from 'lucide-react';
import { useState } from 'react';

const paths = [
  {
    id: 'traffic',
    label: 'Grow traffic',
    icon: Search,
    detail: 'SEO systems that bring the right people to your site.',
    picks: [
      { title: 'Top SEO Tools to Rank Higher', href: '/blog/top-seo-tools-rank-higher', note: 'Tool guide' },
      { title: 'On-Page SEO Techniques for 2026', href: '/blog/on-page-seo-techniques-2026', note: 'Practical playbook' },
    ],
  },
  {
    id: 'ai',
    label: 'Work smarter with AI',
    icon: Bot,
    detail: 'Find useful AI tools and build a workflow around them.',
    picks: [
      { title: 'AI Marketing Tools & Strategy', href: '/blog/ai-marketing-tools-strategy', note: 'Tool guide' },
      { title: 'Content Strategy: Plan, Create & Promote', href: '/blog/content-strategy-plan-create-promote', note: 'Practical playbook' },
    ],
  },
  {
    id: 'business',
    label: 'Build a business',
    icon: Store,
    detail: 'Choose a model, validate your idea, and make your next move.',
    picks: [
      { title: 'Start a Profitable Blog in 2026', href: '/blog/start-profitable-blog-2026', note: 'Getting started' },
      { title: 'The Ultimate Affiliate Marketing Guide', href: '/blog/ultimate-guide-affiliate-marketing-2026', note: 'Growth strategy' },
    ],
  },
  {
    id: 'tools',
    label: 'Choose better tools',
    icon: Wrench,
    detail: 'Compare software that helps a lean team do more.',
    picks: [
      { title: 'Top SaaS Tools for an Online Business', href: '/blog/top-saas-tools-online-business', note: 'Tool guide' },
      { title: 'Productivity Tools for Remote Teams', href: '/blog/productivity-tools-remote-teams', note: 'Team workflow' },
    ],
  },
];

export default function GrowthGuideFinder() {
  const [selected, setSelected] = useState(paths[0]);

  return (
    <section className="py-12 sm:py-16" aria-labelledby="next-move-heading">
      <div className="container-custom">
        <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-violet-200/80 bg-[#fbfaff] shadow-[0_28px_90px_-48px_rgba(91,33,182,0.45)] dark:border-white/10 dark:bg-[#15121e] sm:rounded-[2rem]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/20" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-[22%] -z-10 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-700/10" />
          <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 lg:p-12">
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-800 dark:border-violet-300/20 dark:bg-white/[0.04] dark:text-violet-200">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> The HASIF field guide
              </span>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">A sharper next step starts here</p>
                <h2 id="next-move-heading" className="mt-3 max-w-lg text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-gray-950 dark:text-white sm:text-5xl">
                  Make your next move <span className="text-violet-700 dark:text-violet-300">count.</span>
              </h2>
                <p className="mt-5 max-w-md text-[15px] leading-7 text-gray-600 dark:text-gray-300">
                  A little clarity goes a long way. Choose what you’re building and we’ll point you to a useful place to begin.
                </p>
              </div>
              <div className="mt-7 hidden items-center gap-3 border-t border-violet-200/70 pt-5 text-xs font-medium text-gray-500 dark:border-white/10 dark:text-gray-400 sm:flex">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-700 text-white shadow-lg shadow-violet-950/20 dark:bg-violet-500"><Compass className="h-4 w-4" aria-hidden="true" /></span>
                Independent insight. Practical action.
              </div>
            </div>

            <div className="rounded-2xl border border-violet-200/70 bg-white/75 p-4 shadow-[0_18px_55px_-38px_rgba(30,20,50,0.45)] backdrop-blur sm:p-6 dark:border-white/10 dark:bg-black/20">
              <div className="flex items-center justify-between gap-3 px-1">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-violet-700 dark:text-violet-300">Choose a direction</p>
                  <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">What are you focused on right now?</p>
                </div>
                <span className="hidden rounded-full border border-gray-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:border-white/10 dark:text-gray-400 sm:inline-flex">01 / 02</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {paths.map((path) => (
                  <button
                    key={path.id}
                    type="button"
                    onClick={() => setSelected(path)}
                    aria-pressed={selected.id === path.id}
                    className={`group flex min-h-[4.25rem] items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-xs font-semibold leading-5 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 sm:gap-3 sm:px-4 sm:text-sm ${selected.id === path.id ? 'border-violet-500/60 bg-violet-700 text-white shadow-lg shadow-violet-900/20 dark:border-violet-300/30 dark:bg-violet-500/15 dark:text-violet-100' : 'border-gray-200/90 bg-white/75 text-gray-700 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 dark:border-white/[0.08] dark:bg-white/[0.025] dark:text-gray-200 dark:hover:border-violet-300/30 dark:hover:bg-white/[0.06]'}`}
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${selected.id === path.id ? 'bg-white/15 text-white dark:bg-violet-300/15 dark:text-violet-200' : 'bg-violet-100 text-violet-800 dark:bg-violet-300/[0.08] dark:text-violet-200'}`}><path.icon className="h-4 w-4" aria-hidden="true" /></span>
                    <span>{path.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-violet-200/60 bg-gradient-to-br from-violet-50/80 to-white/70 p-4 dark:border-white/[0.07] dark:from-white/[0.045] dark:to-white/[0.015] sm:p-5">
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{selected.detail}</p>
                <div className="mt-3 divide-y divide-violet-200/60 dark:divide-white/[0.08]">
                  {selected.picks.map((pick, index) => (
                    <Link key={pick.href} href={pick.href} className="group flex items-center justify-between gap-4 py-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
                    <span className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-violet-300/60 text-[10px] font-bold text-violet-800 dark:border-violet-200/20 dark:text-violet-200">0{index + 1}</span>
                      <span>
                        <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">{pick.note}</span>
                        <span className="mt-1 block text-sm font-semibold text-gray-900 transition-colors group-hover:text-violet-800 dark:text-gray-100 dark:group-hover:text-violet-200">{pick.title}</span>
                      </span>
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-all group-hover:bg-violet-700 group-hover:text-white dark:group-hover:bg-violet-400 dark:group-hover:text-[#171326]"><ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/blog" className="group mt-4 inline-flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-[0.13em] text-violet-800 hover:text-violet-950 dark:text-violet-200 dark:hover:text-white">
                Explore the journal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
