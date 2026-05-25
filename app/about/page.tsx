import Link from 'next/link';
import { ArrowRight, BadgeCheck, Bot, ChartSpline, Mail, Search, ShieldCheck } from 'lucide-react';
import Newsletter from '@/components/Newsletter';
import ScrollReveal from '@/components/ScrollReveal';

const features = [
  {
    icon: Search,
    title: 'Hands-on Reviews',
    desc: 'Clear pros, cons, use cases, pricing context, and practical recommendations for creators and founders.',
  },
  {
    icon: Bot,
    title: 'AI Workflows',
    desc: 'Useful automation guides that help you create content, research faster, and build repeatable systems.',
  },
  {
    icon: ChartSpline,
    title: 'Growth Playbooks',
    desc: 'SEO, affiliate marketing, email, SaaS, and blogging strategies designed for measurable momentum.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Picks',
    desc: 'Affiliate links are disclosed clearly, and recommendations are written around reader fit first.',
  },
];

const topics = ['AI Tools', 'SEO', 'SaaS Reviews', 'Affiliate Marketing', 'Email Automation', 'Blogging'];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pt-32 dark:bg-gray-950 sm:pt-36">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(124,58,237,0.11),transparent_34%),linear-gradient(240deg,rgba(8,145,178,0.10),transparent_38%)]" />
        <div className="liquid-aurora -z-10" aria-hidden="true" />

        <div className="container-custom pb-16 sm:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal direction="up" duration={0.35}>
              <div>
                <span className="eyebrow">About Hasif</span>
                <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl">
                  Built for creators who want <span className="gradient-text">real answers</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
                  Hasif is a modern digital publication for entrepreneurs, freelancers, and online builders who need better tools, sharper SEO, and cleaner marketing systems.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/blog"
                    className="button-premium group min-h-[52px] bg-gray-950 px-7 py-4 text-white hover:bg-[#6d28d9] dark:bg-white dark:text-gray-950 dark:hover:bg-[#c4b5fd]"
                    prefetch
                  >
                    Read reviews
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/contact"
                    className="button-premium min-h-[52px] border border-gray-200 bg-white/80 px-7 py-4 text-gray-800 shadow-sm backdrop-blur hover:border-[#7c3aed]/30 hover:text-[#6d28d9] dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-100"
                    prefetch
                  >
                    Work with Hasif
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="defer-section relative overflow-hidden bg-gray-50 py-16 dark:bg-gray-900/35 sm:py-20">
        <div className="container-custom">
          <ScrollReveal direction="up" duration={0.35}>
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="eyebrow">What We Offer</span>
              <h2 className="section-title mt-4">
                Research that feels <span className="gradient-text">useful fast</span>
              </h2>
              <p className="section-copy mt-4">
                Every section is built to help readers compare, decide, and act without digging through noise.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc }, index) => (
              <ScrollReveal key={title} direction="up" delay={index * 0.05} duration={0.35}>
                <article className="premium-card h-full p-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6d28d9] to-[#0891b2] text-white shadow-lg shadow-[#7c3aed]/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-gray-950 dark:text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="defer-section bg-white py-16 dark:bg-gray-950 sm:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <ScrollReveal direction="up" duration={0.35}>
              <div>
                <span className="eyebrow">Our Content</span>
                <h2 className="section-title mt-4">
                  Topics that help you <span className="gradient-text">grow online</span>
                </h2>
                <p className="section-copy mt-4">
                  We organize content around high-intent decisions: which tools to use, what to improve first, and how to build a practical growth system.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {topics.map((topic, index) => (
                <ScrollReveal key={topic} direction="up" delay={index * 0.04} duration={0.35}>
                  <Link
                    href="/blog"
                    className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 font-bold text-gray-950 shadow-sm transition hover:-translate-y-1 hover:border-[#7c3aed]/30 hover:shadow-xl hover:shadow-[#7c3aed]/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                    prefetch
                  >
                    {topic}
                    <ArrowRight className="h-4 w-4 text-[#6d28d9] transition-transform group-hover:translate-x-1 dark:text-[#c4b5fd]" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="defer-section relative overflow-hidden bg-gray-950 py-16 text-white sm:py-20">
        <div className="footer-liquid" aria-hidden="true" />
        <div className="container-custom relative">
          <ScrollReveal direction="up" duration={0.35}>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#c4b5fd]">
                <BadgeCheck className="h-4 w-4" />
                Transparent Mission
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Helpful content, honest recommendations.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-300">
                Some links may be affiliate links. We may earn a commission at no extra cost to you, but we only recommend products we believe can provide real value.
              </p>
              <a
                href="mailto:info@hasif.online"
                className="button-premium mt-8 gap-2 bg-white px-7 py-4 text-gray-950 hover:bg-[#c4b5fd]"
              >
                <Mail className="h-5 w-5" />
                info@hasif.online
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
