import Link from 'next/link';
import { BadgeCheck, Lightbulb, ShieldCheck, Users, Zap, Target } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: BadgeCheck,
    title: 'Honest Reviews',
    desc: 'Hands-on tool reviews with clear pros, cons, and real use cases — no paid rankings.',
    color: 'from-[#7c3aed] to-[#6366f1]',
  },
  {
    icon: Lightbulb,
    title: 'Actionable Guides',
    desc: 'Step-by-step playbooks that turn research into faster execution and results.',
    color: 'from-[#8b5cf6] to-[#2563eb]',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Picks',
    desc: 'Recommendations built around usefulness, transparency, and proven performance.',
    color: 'from-[#6366f1] to-[#0891b2]',
  },
  {
    icon: Users,
    title: 'Community Trusted',
    desc: 'Relied on by thousands of creators and founders for decision-making.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Zap,
    title: 'Always Updated',
    desc: 'Fresh content published regularly with the latest tools and strategies.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Target,
    title: 'Results Focused',
    desc: 'Every piece of content is designed to deliver measurable outcomes.',
    color: 'from-rose-500 to-pink-600',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#09090b] py-20 sm:py-24">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.06),transparent_50%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />

      <div className="container-custom relative">
        <ScrollReveal direction="up" duration={0.35}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="eyebrow">Why Trust Us</span>
            <h2 className="section-title mt-4">
              Why Trust <span className="gradient-text">Hasif Online</span>
            </h2>
            <p className="section-copy mt-4">
              Clean research, practical frameworks, and tool recommendations for founders and creators who value momentum.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <ScrollReveal key={feature.title} direction="up" delay={index * 0.05} duration={0.35}>
                <Link href="/about" className="group block h-full" prefetch>
                  <article className="premium-card relative h-full p-7">
                    <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg shadow-[#7c3aed]/15 transition duration-300 group-hover:-translate-y-0.5`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-bold text-white transition group-hover:text-[#c4b5fd]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">{feature.desc}</p>
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r ${feature.color} transition-transform duration-300 group-hover:scale-x-100`} />
                  </article>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
