import Link from 'next/link';
import { ArrowRight, Bot, BookOpen, ChartSpline, Search, Sparkles } from 'lucide-react';

const words = ['Best Tools', 'Right Strategy', 'Perfect Stack', 'Winning Edge'];

const trustItems = [
  { icon: Search, label: 'Honest Reviews' },
  { icon: BookOpen, label: 'Free Guides' },
  { icon: Bot, label: 'AI Tutorials' },
  { icon: ChartSpline, label: 'Growth Tips' },
];

export default function Hero() {
  return (
    <section className="relative isolate flex items-center overflow-hidden bg-white pt-16 dark:bg-gray-950 sm:min-h-[82vh] sm:pt-[80px]">
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(124,58,237,0.14),transparent_34%),linear-gradient(235deg,rgba(8,145,178,0.12),transparent_40%),linear-gradient(to_bottom,transparent,rgba(124,58,237,0.06))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.34] dark:opacity-[0.18] bg-[linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:42px_42px]"
        aria-hidden="true"
      />
      <div className="liquid-aurora -z-10" aria-hidden="true" />
      <div className="liquid-wave -z-10" aria-hidden="true" />

      <div className="container-custom relative w-full py-8 sm:py-14 lg:py-[72px]">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-[#7c3aed]/20 bg-white/86 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#6d28d9] shadow-sm backdrop-blur dark:bg-white/[0.06] dark:text-[#c4b5fd] sm:px-4 sm:text-xs">
            <Sparkles className="h-4 w-4" />
            <span>Trusted by creators worldwide</span>
          </div>

          <h1 className="mt-5 text-balance text-[2.28rem] font-black leading-[1.04] tracking-tight text-gray-950 dark:text-white min-[390px]:text-[2.5rem] sm:mt-7 sm:text-5xl md:text-6xl lg:text-7xl">
            Find the{' '}
            <span className="word-rotator">
              {words.map((word, index) => (
                <span key={word} className="gradient-text" style={{ animationDelay: `${index * 2.4}s` }}>
                  {word}
                </span>
              ))}
            </span>
            <br className="hidden sm:block" /> to build and scale online
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400 min-[390px]:text-base min-[390px]:leading-7 sm:mt-6 sm:text-lg sm:leading-8">
            Premium insights on SaaS, AI tools, SEO, and marketing systems for founders and creators who want cleaner decisions and faster execution.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row">
            <Link
              href="/blog"
              prefetch
              className="button-premium motion-sheen group min-h-[50px] w-full bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#4f46e5] px-7 py-3.5 text-white shadow-xl shadow-[#7c3aed]/25 hover:shadow-2xl hover:shadow-[#7c3aed]/35 sm:min-h-[52px] sm:w-auto sm:py-4"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Reading
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              prefetch
              className="button-premium min-h-[50px] w-full border border-gray-200 bg-white/92 px-7 py-3.5 text-gray-800 shadow-sm backdrop-blur hover:border-[#7c3aed]/30 hover:text-[#6d28d9] hover:shadow-lg dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-100 dark:hover:text-[#c4b5fd] sm:min-h-[52px] sm:w-auto sm:py-4"
            >
              Learn More
            </Link>
          </div>

          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-2.5 sm:mt-10 sm:grid-cols-4 sm:gap-3">
            {trustItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="float-card flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-gray-200/80 bg-white/82 px-3 py-2.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#7c3aed]/30 hover:text-[#6d28d9] dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-300 dark:hover:text-[#c4b5fd] sm:min-h-[56px] sm:text-sm"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
