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
import type { BlogPost } from '@/lib/blog-data';
import ScrollReveal from './ScrollReveal';

interface Props {
  posts: BlogPost[];
}

const categoryConfig: Record<string, { bg: string; icon: ElementType }> = {
  'Affiliate Marketing': { bg: 'from-[#6d28d9] to-[#4f46e5]', icon: Megaphone },
  SEO: { bg: 'from-emerald-500 to-teal-600', icon: Search },
  Blogging: { bg: 'from-amber-500 to-orange-600', icon: PenLine },
  SaaS: { bg: 'from-cyan-500 to-blue-600', icon: ChartNoAxesCombined },
  'AI Tools': { bg: 'from-[#7c3aed] to-fuchsia-600', icon: Bot },
  'Marketing Tools': { bg: 'from-rose-500 to-pink-600', icon: ChartNoAxesCombined },
};

function PostCard({ post }: { post: BlogPost }) {
  const config = categoryConfig[post.category] || { bg: 'from-[#6d28d9] to-[#4f46e5]', icon: FileText };
  const Icon = config.icon;
  const [month, day] = post.date.split(',')[0].split(' ');

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full" prefetch>
      <article className="premium-card relative h-full">
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
          {post.image.endsWith('.svg') ? (
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Image
              src={post.image}
              alt={post.title}
              fill
              loading="lazy"
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
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span>{post.author}</span>
          </div>

          <h3 className="line-clamp-2 text-base font-bold leading-tight text-gray-950 transition-colors duration-200 group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{post.excerpt}</p>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/10">
            <span className="text-sm font-semibold text-gray-500 transition group-hover:text-[#6d28d9] dark:text-gray-400 dark:group-hover:text-[#c4b5fd]">
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
    <section className="relative overflow-hidden bg-gray-50 py-16 dark:bg-gray-900/35 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/25 to-transparent" />

      <div className="container-custom relative">
        <ScrollReveal direction="up" duration={0.35}>
          <div className="mb-10 text-center sm:mb-12">
            <span className="eyebrow">Latest Content</span>
            <h2 className="section-title mt-4">
              Fresh <span className="gradient-text">Articles</span>
            </h2>
            <p className="section-copy mx-auto mt-3 max-w-lg px-4">
              Discover our latest guides, tutorials, and insights to help you grow your business.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <MemoizedPostCard key={post.slug} post={post} />
          ))}
        </div>

        <ScrollReveal direction="up" delay={0.15} duration={0.35}>
          <div className="mt-10 text-center sm:mt-12">
            <Link
              href="/blog"
              className="button-premium group relative gap-2 overflow-hidden bg-gradient-to-r from-[#6d28d9] to-[#4f46e5] px-6 py-3 text-sm text-white shadow-lg shadow-[#7c3aed]/20 hover:shadow-xl hover:shadow-[#7c3aed]/30 sm:px-8 sm:py-4 sm:text-base"
              prefetch
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">View All Articles</span>
              <ArrowRight className="relative h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
