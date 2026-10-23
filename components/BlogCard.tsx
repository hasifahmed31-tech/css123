import { memo, type ElementType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bot, ChartNoAxesCombined, FileText, Megaphone, PenLine, Search } from 'lucide-react';
import { getPostIsoDate, type BlogPost } from '@/lib/blog-data';
import { isOptimizableImage } from '@/lib/unsplash-image';

interface Props {
  post: BlogPost;
  index?: number;
}

const categoryConfig: Record<string, { icon: ElementType }> = {
  'Affiliate Marketing': { icon: Megaphone },
  SEO: { icon: Search },
  Blogging: { icon: PenLine },
  SaaS: { icon: ChartNoAxesCombined },
  'AI Tools': { icon: Bot },
  'Marketing Tools': { icon: ChartNoAxesCombined },
};

export default memo(function BlogCard({ post, index = 0 }: Props) {
  const config = categoryConfig[post.category] || { icon: FileText };
  const Icon = config.icon;

  return (
    <Link href={`/blog/${post.slug}`} aria-label={`Read article: ${post.title}`} className="group block h-full" prefetch={index < 3}>
      <article className="premium-card h-full rounded-2xl">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/[0.04]">
          <Image
            src={post.image}
            unoptimized={!isOptimizableImage(post.image)}
            alt={post.title}
            fill
            priority={index === 0}
            quality={65}
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 30px), (max-width: 1424px) calc(33.333vw - 32px), 410px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/35 to-transparent" />
          <div className="absolute left-2.5 top-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-slate-950/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm backdrop-blur-md">
              <Icon className="h-3.5 w-3.5" />
              {post.category}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
            <time dateTime={getPostIsoDate(post)}>{post.date}</time>
            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span>{post.readTime}</span>
          </div>
          <h3 className="line-clamp-2 text-sm font-bold text-gray-950 transition-colors duration-200 group-hover:text-[#5b35b8] dark:text-white dark:group-hover:text-[#e3d9ff]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-600 dark:text-gray-400">{post.excerpt}</p>

          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/10">
            <span className="inline-flex min-w-0 items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
              <Image
                src="/site-avatar.webp"
                unoptimized
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px] shrink-0 rounded-full bg-[#7955e8]/10 object-contain p-0.5"
              />
              <span className="truncate">By {post.author}</span>
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-[#5b35b8] transition-all duration-200 group-hover:gap-2 dark:text-[#e3d9ff]">
              Read article
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#5b35b8]/[0.08] transition-transform duration-200 group-hover:translate-x-0.5 dark:bg-violet-200/10">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
});
