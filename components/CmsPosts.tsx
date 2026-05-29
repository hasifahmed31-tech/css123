import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { getPublishedPosts } from '@/lib/cms'

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim()
}

function excerpt(content: string): string {
  const text = stripHtml(content)
  return text.length > 160 ? text.slice(0, 157) + '...' : text
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function readTime(content: string): string {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

export default async function CmsPosts() {
  const posts = await getPublishedPosts(6)

  if (posts.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-white py-14 dark:bg-gray-950 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />

      <div className="container-custom relative">
        <div className="mb-10 text-center sm:mb-12">
          <span className="inline-flex items-center rounded-full border border-indigo-500/15 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:border-indigo-400/20 dark:bg-indigo-500/20 dark:text-indigo-300">
            CMS Updates
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-4xl lg:text-5xl">
            Latest <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Updates</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-gray-600 dark:text-gray-400">
            Recently published articles from our content management system.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block h-full"
              prefetch={i < 3}
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-[0_24px_70px_rgba(124,58,237,0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-indigo-400/25 dark:hover:bg-white/[0.06]">
                <div className="flex h-full flex-col p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.created_at)}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {readTime(post.content)}
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-sm font-bold text-gray-950 transition-colors duration-200 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    {post.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 flex-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                    {post.excerpt || excerpt(post.content)}
                  </p>

                  <div className="mt-4 flex items-center gap-1 border-t border-gray-100 pt-3 text-xs font-bold text-indigo-600 transition-all duration-200 group-hover:gap-2 dark:border-white/10 dark:text-indigo-400">
                    Read
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
