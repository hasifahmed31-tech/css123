import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, Lightbulb, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: BadgeCheck,
    number: '01',
    title: 'Honest reviews',
    desc: 'Hands-on tool reviews with clear pros, cons, and real use cases.',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Actionable guides',
    desc: 'Step-by-step playbooks that turn research into faster execution.',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: 'Verified Picks',
    desc: 'Recommendations built around usefulness, transparency, and fit.',
  },
];

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-hasif-heading" className="why-section defer-section relative isolate overflow-hidden py-10 text-white sm:py-28 lg:py-24">
      <div className="why-glow pointer-events-none absolute -right-40 -top-48 -z-10 h-[38rem] w-[38rem] rounded-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:72px_72px]" aria-hidden="true" />
      <div className="container-custom grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <ScrollReveal direction="left" duration={0.5}>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/20 bg-violet-300/[0.08] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-violet-200 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(200,183,255,.8)]" /> Why choose Hasif
            </span>
            <h2 id="why-hasif-heading" className="mt-5 max-w-[13ch] font-serif text-4xl font-medium leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.7rem]">
              Build and scale with <span className="text-violet-300">better decisions.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Clean research, practical frameworks, and tool recommendations for founders and creators who value momentum.
            </p>
            <div className="mt-7 inline-flex items-center gap-3 text-xs font-semibold text-white/55 sm:text-sm">
              <span className="h-px w-8 bg-violet-300/60" /> Research <span aria-hidden="true">·</span> Clarity <span aria-hidden="true">·</span> Momentum
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {features.map(({ icon: Icon, number, title, desc }, index) => (
            <ScrollReveal key={title} direction="up" delay={index * 0.09} duration={0.5}>
              <Link href="/about" className={`why-card ${index === 1 ? 'why-card-featured' : ''} group flex h-full min-h-[250px] flex-col rounded-2xl p-5 sm:min-h-[300px] sm:p-6`} prefetch>
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-violet-200/15 bg-violet-300/[0.09] text-violet-200 transition duration-300 group-hover:-translate-y-1 group-hover:bg-violet-300/[0.16] group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="font-mono text-xs tracking-[0.14em] text-white/35">{number} / 03</span>
                </div>
                <h3 className="mt-8 font-serif text-xl font-medium tracking-tight text-white sm:text-2xl">{title}</h3>
                <p className="mt-3 text-xs leading-6 text-white/60 sm:text-sm">{desc}</p>
                <span className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-bold uppercase tracking-[0.13em] text-violet-200/80 transition-colors group-hover:text-white sm:text-[11px]">
                  Explore our approach <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
