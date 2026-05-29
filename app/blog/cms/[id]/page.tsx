import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/posts'
import type { Metadata } from 'next'
import { enhanceArticleHtml } from '@/lib/blog-features'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await getPostById(id)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/cms/${post.id}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
    },
  }
}

export default async function CmsBlogPostPage({ params }: Props) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    dateModified: post.created_at,
    author: { '@type': 'Person', name: 'Hasif' },
    publisher: {
      '@type': 'Organization',
      name: 'Hasif',
      logo: { '@type': 'ImageObject', url: '/site-icon.png' },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="page-surface pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="container-custom max-w-3xl">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" prefetch>
              Home
            </Link>
            <span className="text-gray-300 dark:text-gray-600" aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" prefetch>
              Blog
            </Link>
            <span className="text-gray-300 dark:text-gray-600" aria-hidden="true">/</span>
            <span className="text-gray-600 dark:text-gray-400 truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-400 dark:text-gray-500">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-7 w-7 overflow-hidden rounded-full bg-white shadow-md ring-1 ring-indigo-100 dark:bg-gray-900 dark:ring-white/10">
                  <img
                    src="/site-icon.png"
                    alt="Hasif logo"
                    className="object-contain p-0.5 w-full h-full"
                  />
                </span>
                Hasif
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </span>
            </div>
          </div>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: enhanceArticleHtml(post.content) }}
          />
        </div>
      </article>
    </>
  )
}
