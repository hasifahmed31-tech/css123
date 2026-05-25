import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-data';
import ScrollReveal from './ScrollReveal';

interface Props {
  posts: BlogPost[];
}

export default function FeaturedInsights({ posts }: Props) {
  const [lead, ...rest] = posts;
  if (!lead) return null;

  return (
    <section className="defer-section relative overflow-hidden bg-white py-14 dark:bg-gray-950 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/25 to-transparent" />
      <div className="container-custom">
        <ScrollReveal direction="up" duration={0.35}>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">Featured Reviews</span>
              <h2 className="section-title mt-4">
                Editor&apos;s <span className="gradient-text">best picks</span>
              </h2>
            </div>
            <p className="section-copy max-w-xl">
              High-intent guides and reviews selected for readers who want faster decisions, stronger SEO, and better online business systems.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <ScrollReveal direction="up" duration={0.35}>
            <Link href={`/blog/${lead.slug}`} className="group block h-full" prefetch>
              <article className="premium-card grid h-full overflow-hidden md:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[260px] bg-gray-100 dark:bg-white/[0.04]">
                  {lead.image.endsWith('.svg') ? (
                    <img
                      src={lead.image}
                      alt={lead.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={lead.image}
                      alt={lead.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-col p-7 sm:p-8">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#7c3aed]/10 px-3 py-1.5 text-xs font-bold uppercase text-[#6d28d9] dark:text-[#c4b5fd]">
                    <Sparkles className="h-3.5 w-3.5" />
                    {lead.category}
                  </span>
                  <h3 className="mt-5 text-2xl font-black leading-tight text-gray-950 transition group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                    {lead.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">{lead.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6 text-sm dark:border-white/10">
                    <span className="font-semibold text-gray-500">{lead.date}</span>
                    <span className="inline-flex items-center gap-2 font-bold text-[#6d28d9] dark:text-[#c4b5fd]">
                      Read review
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </ScrollReveal>

          <div className="grid gap-4">
            {rest.slice(0, 3).map((post, index) => (
              <ScrollReveal key={post.slug} direction="up" delay={index * 0.05} duration={0.35}>
                <Link href={`/blog/${post.slug}`} className="group block" prefetch>
                  <article className="premium-card flex gap-4 p-4">
                    <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-white/[0.04]">
                      {post.image.endsWith('.svg') ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="112px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold uppercase text-[#6d28d9] dark:text-[#c4b5fd]">{post.category}</span>
                      <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-gray-950 transition group-hover:text-[#6d28d9] dark:text-white">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-xs text-gray-500">{post.readTime}</p>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
