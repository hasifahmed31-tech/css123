'use client';

import Link from 'next/link';
import { Bot, Globe, Code, Megaphone, Layers, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const categories = [
  { name: 'AI Tools', icon: Bot, href: '/blog', gradient: 'from-[#7c3aed] to-[#6366f1]', desc: 'Discover cutting-edge AI tools' },
  { name: 'Hosting', icon: Globe, href: '/blog', gradient: 'from-emerald-500 to-teal-600', desc: 'Best hosting for every need' },
  { name: 'Web Development', icon: Code, href: '/blog', gradient: 'from-cyan-500 to-blue-600', desc: 'Modern dev frameworks & tips' },
  { name: 'Affiliate Marketing', icon: Megaphone, href: '/blog', gradient: 'from-rose-500 to-pink-600', desc: 'Grow your affiliate income' },
  { name: 'SaaS', icon: Layers, href: '/blog', gradient: 'from-amber-500 to-orange-600', desc: 'Top SaaS platforms reviewed' },
  { name: 'Productivity', icon: Zap, href: '/blog', gradient: 'from-[#8b5cf6] to-fuchsia-600', desc: 'Work smarter, not harder' },
];

export default function CategoriesGrid() {
  return (
    <section className="relative overflow-hidden bg-[#09090b] py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.06),transparent_50%)]" />

      <div className="container-custom relative">
        <ScrollReveal direction="up" duration={0.35}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="eyebrow">Explore Topics</span>
            <h2 className="section-title mt-4">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <p className="section-copy mt-4">
              Deep-dive into topics that matter most to your growth.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <ScrollReveal key={cat.name} direction="up" delay={index * 0.05} duration={0.35}>
                <Link href={cat.href} className="group block h-full" prefetch>
                  <article className="premium-card relative h-full p-6">
                    <div className="flex items-start gap-4">
                      <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg transition duration-300 group-hover:-translate-y-0.5`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-white transition group-hover:text-[#c4b5fd]">
                          {cat.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{cat.desc}</p>
                      </div>
                    </div>
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r ${cat.gradient} transition-transform duration-300 group-hover:scale-x-100`} />
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
