import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Newsletter from '@/components/Newsletter'
import ReadingProgress from '@/components/ReadingProgress'
import TableOfContents from '@/components/TableOfContents'
import { getPostBySlug } from '@/lib/cms'
import { enhanceArticleHtml, extractToc, formatPostDate, generateAiSummary } from '@/lib/blog-features'
import { excerptFromContent, readTime } from '@/lib/content'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ token?: string }>
}

export const metadata: Metadata = {
  title: 'Draft preview',
  robots: { index: false, follow: false },
}

export default async function DraftPreviewPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { token = '' } = await searchParams
  const post = token ? await getPostBySlug(slug, token) : null
  if (!post) notFound()

  const html = enhanceArticleHtml(post.content)
  const toc = extractToc(html)
  const image = post.featured_image || '/site-icon.png'
  const excerpt = post.excerpt || excerptFromContent(post.content)

  return (
    <>
      <ReadingProgress />
      <article className="page-surface pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Draft preview' }, { label: post.title }]} />
          <header className="mx-auto mb-8 max-w-3xl">
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              Draft preview
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
              <span>{post.author_name || 'Hasif'}</span>
              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
              <span>{formatPostDate(post.created_at)}</span>
              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
              <span>{readTime(post.content)}</span>
            </div>
          </header>
          <section className="mx-auto mb-8 max-w-3xl rounded-2xl border border-indigo-100 bg-indigo-50/80 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-300">AI Summary</div>
            <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">{generateAiSummary(post.content || excerpt)}</p>
          </section>
          <div className="relative mx-auto mb-10 aspect-[16/9] max-w-3xl overflow-hidden rounded-2xl bg-gray-100 shadow-xl dark:bg-white/5">
            <Image src={image} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div id="article-content" className="blog-content min-w-0" dangerouslySetInnerHTML={{ __html: html }} />
            <div className="lg:sticky lg:top-32">
              <TableOfContents items={toc} />
              <Link href="/admin/posts" className="mt-4 block rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-bold text-gray-700 dark:border-white/10 dark:text-gray-200">
                Back to posts
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Newsletter />
    </>
  )
}
