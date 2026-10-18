import type { LucideIcon } from 'lucide-react';
import { ArrowRight, CalendarDays, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import GrowthGuideFinder from '@/components/GrowthGuideFinder';

export interface LegalSection {
  icon: LucideIcon;
  title: string;
  content?: string;
  items?: string[];
  note?: string;
}

interface LegalPageProps {
  title: string;
  accent?: string;
  intro: string;
  sections: LegalSection[];
  updated?: boolean;
}

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/affiliate-disclosure', label: 'Affiliate disclosure' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export default function LegalPage({ title, accent, intro, sections, updated = true }: LegalPageProps) {
  return (
    <>
      <main>
        <section className="legal-hero">
          <div className="container-custom relative z-10 py-14 sm:py-20 lg:py-24">
            <div className="max-w-4xl">
              <span className="eyebrow"><ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> HASIF · Legal</span>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-gray-950 dark:text-white sm:text-5xl lg:text-6xl">
                {title}{accent && <> <span className="gradient-text">{accent}</span></>}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">{intro}</p>
              {updated && <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400"><CalendarDays className="h-4 w-4 text-[#7955e8]" /> Last updated October 15, 2026</p>}
            </div>
            <nav aria-label="Legal pages" className="mt-9 flex flex-wrap gap-2">
              {legalLinks.map((link) => <Link key={link.href} href={link.href} className="rounded-full border border-gray-200 bg-white/75 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#7955e8]/40 hover:text-[#5b35b8] dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:text-white">{link.label}</Link>)}
            </nav>
          </div>
        </section>

        <section className="container-custom py-10 sm:py-14">
          <div className="mx-auto grid max-w-5xl gap-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-2xl border border-[#e8e2d8] bg-white/75 p-5 dark:border-white/10 dark:bg-white/[0.035]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">On this page</p>
                <nav className="mt-4 space-y-2.5">
                  {sections.map((section, index) => <a key={section.title} href={`#legal-section-${index + 1}`} className="block text-sm leading-5 text-gray-600 transition hover:text-[#5b35b8] dark:text-gray-400 dark:hover:text-[#e3d9ff]">{section.title}</a>)}
                </nav>
              </div>
            </aside>

            <div className="min-w-0 space-y-4">
              {sections.map(({ icon: Icon, title: sectionTitle, content, items, note }, index) => (
                <article id={`legal-section-${index + 1}`} key={sectionTitle} className="legal-card scroll-mt-28 p-5 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7955e8]/[0.09] text-[#5b35b8] dark:bg-[#7955e8]/15 dark:text-[#e3d9ff]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0 flex-1 pt-1">
                      <h2 className="text-lg font-semibold tracking-tight text-gray-950 dark:text-white">{sectionTitle}</h2>
                      {content && <p className="mt-2.5 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-[15px]">{content}</p>}
                      {items && <ul className="mt-3 space-y-2.5">{items.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-gray-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7955e8]" />{item}</li>)}</ul>}
                      {note && <p className="mt-3 text-sm font-semibold text-[#5b35b8] dark:text-[#e3d9ff]">{note}</p>}
                    </div>
                  </div>
                </article>
              ))}

              <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#7955e8]/15 bg-[#7955e8]/[0.045] p-5 sm:flex-row sm:items-center sm:p-6 dark:border-[#c8b7ff]/15 dark:bg-[#7955e8]/[0.08]">
                <div><p className="font-semibold text-gray-900 dark:text-white">Need more information?</p><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Contact us about this policy at <a href="mailto:info@hasif.online" className="font-semibold text-[#5b35b8] underline underline-offset-4 dark:text-[#e3d9ff]">info@hasif.online</a>.</p></div>
                <a href="mailto:info@hasif.online" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#5b35b8] dark:text-[#e3d9ff]">Email HASIF <ArrowRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <GrowthGuideFinder />
    </>
  );
}
