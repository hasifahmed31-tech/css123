import Link from 'next/link';
import { BadgeCheck, Lightbulb, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: BadgeCheck,
    title: 'Honest Reviews',
    desc: 'Hands-on tool reviews with clear pros, cons, and real use cases.',
    color: 'from-[#6d28d9] to-[#4f46e5]',
  },
  {
    icon: Lightbulb,
    title: 'Actionable Guides',
    desc: 'Step-by-step playbooks that turn research into faster execution.',
    color: 'from-[#7c3aed] to-[#2563eb]',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Picks',
    desc: 'Recommendations built around usefulness, transparency, and fit.',
    color: 'from-[#4f46e5] to-[#0891b2]',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-white py-[72px] dark:bg-gray-950 sm:py-[88px]">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent,rgba(124,58,237,0.04),transparent)]" />

      <div className="container-custom relative">
        <ScrollReveal direction="up" duration={0.35}>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="section-title mt-4">
              Build and scale with <span className="gradient-text">better decisions</span>
            </h2>
            <p className="section-copy mt-4">
              Clean research, practical frameworks, and tool recommendations for founders and creators who value momentum.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <ScrollReveal key={feature.title} direction="up" delay={index * 0.06} duration={0.35}>
                <Link href="/about" className="group block h-full" prefetch>
                  <article className="premium-card relative h-full p-7">
                    <span className={`inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg shadow-[#7c3aed]/20 transition duration-300 group-hover:-translate-y-1`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 text-lg font-bold text-gray-950 transition group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{feature.desc}</p>
                    <span className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${feature.color} transition-transform duration-300 group-hover:scale-x-100`} />
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
