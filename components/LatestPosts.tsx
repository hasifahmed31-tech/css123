import { memo, type ElementType } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Bot,
  ChartNoAxesCombined,
  Clock3,
  FileText,
  Megaphone,
  PenLine,
  Search,
} from 'lucide-react';
import type { BlogListPost } from '@/lib/blog-features';
import ScrollReveal from './ScrollReveal';

interface Props {
  posts: BlogListPost[];
}

const categoryConfig: Record<string, { bg: string; icon: ElementType }> = {
  'Affiliate Marketing': { bg: 'from-[#55426f] to-[#74618f]', icon: Megaphone },
  SEO: { bg: 'from-[#456e66] to-[#648a7d]', icon: Search },
  Blogging: { bg: 'from-[#826b46] to-[#a38b65]', icon: PenLine },
  SaaS: { bg: 'from-[#47637a] to-[#6c8295]', icon: ChartNoAxesCombined },
  'AI Tools': { bg: 'from-[#634c87] to-[#826ca3]', icon: Bot },
  'Marketing Tools': { bg: 'from-[#805d69] to-[#a27b86]', icon: ChartNoAxesCombined },
};

function PostCard({ post, index = 0, lead = false }: { post: BlogListPost; index?: number; lead?: boolean }) {
  const config = categoryConfig[post.category] || { bg: 'from-slate-700 to-slate-600', icon: FileText };
  const Icon = config.icon;
  const [month = 'New', day = ''] = post.date.split(',')[0].split(' ');

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full" prefetch={index < 3}>
      <article className={`premium-card relative h-full ${lead ? 'rounded-[1.75rem]' : ''}`}>
        <div className={`relative overflow-hidden bg-gradient-to-br from-violet-100 to-violet-100 dark:from-violet-950/30 dark:to-violet-950/30 ${lead ? 'aspect-[16/8] min-h-[300px] lg:aspect-auto lg:min-h-[440px]' : 'aspect-[16/9]'}`}>
          {!post.image ? (
            <div className="flex h-full w-full items-center justify-center">
              <FileText className="h-10 w-10 text-[#7955e8]/70" />
            </div>
          ) : post.image.endsWith('.svg') ? (
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
              priority={index === 0}
              loading={index < 3 ? 'eager' : 'lazy'}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute left-3 top-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${config.bg} px-3 py-1.5 text-[11px] font-bold uppercase text-white shadow-lg backdrop-blur-sm`}>
              <Icon className="h-3.5 w-3.5" />
              {post.category}
            </span>
          </div>
          <div className="absolute right-3 top-3">
            <div className="flex flex-col items-center rounded-xl bg-gray-950/70 px-2.5 py-1.5 text-white shadow-lg backdrop-blur-md">
              <span className="text-sm font-bold">{day}</span>
              <span className="text-[10px] text-white/70">{month}</span>
            </div>
          </div>
          {lead && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14111d]/95 via-[#14111d]/35 to-transparent" />}
          {lead && (
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <span className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200">
                <span className="h-px w-6 bg-violet-300" /> Editor&apos;s latest
              </span>
              <h3 className="max-w-2xl font-serif text-2xl font-medium leading-tight tracking-tight sm:text-3xl lg:text-4xl">{post.title}</h3>
              <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">{post.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-all group-hover:gap-3">
                Read the story <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          )}
        </div>

        <div className={`${lead ? 'hidden' : 'p-5'}`}>
          <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <Image
                src="/site-icon.png"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 shrink-0 rounded-full bg-[#7955e8]/10 object-contain p-0.5"
              />
              <span className="truncate">{post.authorName}</span>
            </span>
          </div>

          <h3 className="line-clamp-2 text-base font-bold leading-tight text-gray-950 transition-colors duration-200 group-hover:text-[#5b35b8] dark:text-white dark:group-hover:text-[#e3d9ff]">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{post.excerpt}</p>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/10">
            <span className="text-sm font-semibold text-gray-500 transition group-hover:text-[#5b35b8] dark:text-gray-400 dark:group-hover:text-[#e3d9ff]">
              Read Article
            </span>
            <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r ${config.bg} text-white shadow-lg transition-transform duration-200 group-hover:translate-x-0.5 group-hover:scale-105`}>
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

const MemoizedPostCard = memo(PostCard);

export default function LatestPosts({ posts }: Props) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="defer-section relative overflow-hidden border-y border-slate-100 bg-white py-16 dark:border-white/[0.06] dark:bg-gray-950 sm:py-24">

      <div className="container-custom relative">
        <ScrollReveal direction="up" duration={0.35}>
          <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">The Hasif journal · Freshly published</span>
              <h2 className="section-title mt-4 text-4xl sm:text-5xl">
                Ideas for your <span className="gradient-text">next move.</span>
              </h2>
              <p className="section-copy mt-3 max-w-xl">
                New research, practical guides, and thoughtful tool reviews to help you move forward with confidence.
              </p>
            </div>
            <Link href="/blog" className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#7955e8]/20 bg-white px-5 py-3 text-sm font-semibold text-[#5b35b8] shadow-sm transition hover:-translate-y-0.5 hover:border-[#7955e8]/40 hover:shadow-md dark:bg-white/[0.04] dark:text-[#e3d9ff]" prefetch>
              Browse all articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div key={post.slug} className={index === 0 ? 'sm:col-span-2' : ''}>
            <MemoizedPostCard post={post} index={index} lead={index === 0} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
