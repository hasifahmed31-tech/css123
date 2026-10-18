import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Bot, BookOpen, ChartSpline, Search, Sparkles } from 'lucide-react';

const words = ['better tools.', 'smarter systems.', 'lasting growth.'];

const trustItems = [
  { icon: Search, label: 'Independent reviews' },
  { icon: BookOpen, label: 'Practical guides' },
  { icon: Bot, label: 'AI, made useful' },
];

interface HeroProps {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
}

export default function Hero({ eyebrow, title, description }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#111019] pt-14 text-white dark:bg-[#111019] sm:pt-[76px]">
      <div className="hero-orb pointer-events-none absolute -right-40 top-12 -z-10 h-[40rem] w-[40rem] rounded-full bg-violet-700/25 blur-3xl" />
      <div className="hero-orb hero-orb-delay pointer-events-none absolute -bottom-64 left-[12%] -z-10 h-[30rem] w-[30rem] rounded-full bg-indigo-900/20 blur-3xl" />
      <div className="container-custom relative z-10 grid items-center gap-x-7 gap-y-0 py-4 sm:py-12 lg:min-h-[700px] lg:grid-cols-[0.92fr_1.08fr] lg:gap-x-16 lg:py-20">
        <div className="contents lg:block">
          <div className="hero-reveal inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-200">
            <span className="h-px w-8 bg-violet-400" />
            {eyebrow || 'The smarter way to grow online'}
          </div>

          {title ? (
          <h1 className="hero-reveal hero-reveal-1 mt-4 max-w-[13ch] text-balance font-serif text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-white sm:mt-6 sm:text-5xl lg:text-[4.3rem]">
              {title}
            </h1>
          ) : (
            <h1 className="hero-reveal hero-reveal-1 mt-4 max-w-[13ch] text-balance font-serif text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-white sm:mt-6 sm:text-5xl lg:text-[4.3rem]">
              Make room for{' '}
              <span className="word-rotator relative inline-grid text-violet-300" aria-hidden="true">
                {words.map((word, index) => (
                  <span key={word} style={{ animationDelay: `${index * 3.2}s` }}>{word}</span>
                ))}
              </span>
              <span className="sr-only">better tools, smarter systems, lasting growth</span>
            </h1>
          )}

          <p className="hero-reveal hero-reveal-2 order-2 mt-4 max-w-xl text-[15px] leading-7 text-white/70 sm:mt-6 sm:text-lg sm:leading-8 lg:order-none">
            {description || 'Thoughtful reviews, clear advice, and proven strategies to help you choose the right tools and build a business that lasts.'}
          </p>

          <div className="hero-reveal hero-reveal-3 order-3 mt-4 flex flex-row flex-wrap items-center gap-x-3 gap-y-1 sm:mt-8 sm:gap-3 lg:order-none">
            <Link href="/blog" prefetch className="button-premium motion-sheen group min-h-11 gap-3 rounded-xl bg-[#7955e8] px-5 text-sm text-white shadow-lg shadow-violet-950/30 hover:bg-[#6844d0] sm:min-h-14 sm:px-6">
              Explore the journal
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/about" prefetch className="button-premium min-h-10 justify-start gap-2 rounded-xl px-2 text-sm text-white/80 hover:text-white sm:min-h-14 sm:px-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20"><ArrowDown className="h-4 w-4" /></span>
              Get to know Hasif
            </Link>
          </div>

          <div className="hero-reveal hero-reveal-4 order-5 mt-3 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-3 sm:mt-8 sm:pt-5 lg:order-none">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="inline-flex items-center gap-2 text-xs font-medium text-white/65 sm:text-sm">
                <Icon className="h-4 w-4 text-violet-300" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative order-4 mx-auto mt-4 w-full max-w-[720px] lg:order-none lg:ml-auto lg:mt-0">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] border border-violet-300/20" />
          <div className="hero-photo relative overflow-hidden rounded-[1.4rem] bg-[#101a38] shadow-[0_24px_70px_rgba(27,27,55,0.18)] sm:rounded-[1.8rem]">
            <Image
              src="/images/articles/growth.jpg"
              alt="A team discussing ideas around a laptop"
              width={1200}
              height={800}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[16/10] w-full object-cover lg:aspect-[1.12/1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10152c]/75 via-transparent to-[#10152c]/10" />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md sm:left-7 sm:top-7 sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 text-violet-200" /> Curated for curious minds
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-200">Research · Tools · Growth</p>
                  <p className="mt-2 max-w-sm text-xl font-medium leading-snug tracking-tight sm:text-2xl">Good decisions start with a clearer view.</p>
                </div>
                <ChartSpline className="mb-1 hidden h-8 w-8 shrink-0 text-white/80 sm:block" strokeWidth={1.4} />
              </div>
            </div>
          </div>
          <div className="float-card absolute -bottom-5 right-4 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-xl shadow-slate-950/10 backdrop-blur dark:border-white/10 dark:bg-gray-900/95 sm:right-8 sm:px-5 sm:py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-gray-400">Built for action</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">Less noise. Better momentum.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
