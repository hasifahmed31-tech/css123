import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, FileText, Tag } from 'lucide-react'
import type { BlogListPost } from '@/lib/blog-features'

interface Props {
  post: BlogListPost
  index?: number
}

export default function NotionBlogCard({ post, index = 0 }: Props) {
  const image = post.image

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full" prefetch={index < 3}>
      <article className="premium-card h-full">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
          {image ? (
            <Image
              src={image}
              alt={post.title}
              fill
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FileText className="h-10 w-10 text-indigo-500/70" />
            </div>
          )}
          <div className="absolute left-2.5 top-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#6d28d9] to-[#4f46e5] px-2.5 py-1.5 text-[10px] font-bold uppercase text-white shadow-md">
              <FileText className="h-3.5 w-3.5" />
              {post.category}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
          <h3 className="line-clamp-2 text-sm font-bold text-gray-950 transition-colors duration-200 group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-500 dark:bg-white/10 dark:text-gray-400">
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/10">
            <span className="inline-flex min-w-0 items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              <Image
                src="/site-icon.png"
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px] shrink-0 rounded-full bg-[#7c3aed]/10 object-contain p-0.5"
              />
              <span className="truncate">By {post.authorName}</span>
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-[#6d28d9] transition-all duration-200 group-hover:gap-2 dark:text-[#c4b5fd]">
              Read
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#7c3aed]/10 transition-transform duration-200 group-hover:scale-105">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
