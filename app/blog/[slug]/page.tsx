import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { blogPosts, getPostBySlug, getPostIsoDate } from '@/lib/blog-data'
import { excerptFromContent } from '@/lib/content'
import { getNotionPostBySlug, type NotionPost } from '@/lib/notion'
import {
  enhanceArticleHtml,
  extractToc,
  getRelatedPosts,
  notionToListPost,
  staticToListPost,
} from '@/lib/blog-features'
import { getEnterprisePosts } from '@/lib/enterprise-blog'
import Newsletter from '@/components/Newsletter'
import ReadingProgress from '@/components/ReadingProgress'
import ShareButtons from '@/components/ShareButtons'
import TableOfContents from '@/components/TableOfContents'
import BlogEngagement from '@/components/BlogEngagement'
import NotionBlogCard from '@/components/NotionBlogCard'
import PageTransition from '@/components/PageTransition'
import Breadcrumbs from '@/components/Breadcrumbs'
import { slugify } from '@/lib/slug'

interface Props {
  params: Promise<{ slug: string }>
}

const authorImage = '/site-icon.png'

export const revalidate = 1800

export async function generateStaticParams() {
  const posts = await getEnterprisePosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const staticPost = getPostBySlug(slug)

  if (staticPost) {
    const publishedTime = getPostIsoDate(staticPost)
    return {
      title: staticPost.title,
      description: staticPost.excerpt,
      keywords: staticPost.seoKeywords,
      alternates: { canonical: `/blog/${staticPost.slug}` },
      openGraph: {
        title: staticPost.title,
        description: staticPost.excerpt,
        type: 'article',
        publishedTime,
        authors: [staticPost.author],
        tags: staticPost.seoKeywords,
        images: [{ url: staticPost.image, width: 1200, height: 675, alt: staticPost.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: staticPost.title,
        description: staticPost.excerpt,
        images: [staticPost.image],
      },
    }
  }

  const notionPost = await getNotionPostBySlug(slug)
  if (!notionPost) return {}

  const description = notionPost.excerpt || excerptFromContent(notionPost.content)
  const image = notionPost.og_image || notionPost.featured_image || `/blog/${notionPost.slug}/opengraph-image`
  return {
    title: notionPost.title,
    description,
    keywords: notionPost.meta_keywords || notionPost.tags,
    alternates: { canonical: `/blog/${notionPost.slug}` },
    openGraph: {
      title: notionPost.title,
      description,
      type: 'article',
      publishedTime: notionPost.created_at,
      modifiedTime: notionPost.updated_at,
      authors: [notionPost.author.name],
      tags: notionPost.tags,
      images: [{ url: image, width: 1200, height: 675, alt: notionPost.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: notionPost.title,
      description,
      images: [image],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const staticPost = getPostBySlug(slug)
  const notionPost = !staticPost ? await getNotionPostBySlug(slug) : null

  if (!staticPost && !notionPost) notFound()

  const current = staticPost
    ? staticToListPost(staticPost)
    : notionToListPost(notionPost as NotionPost)

  const contentHtml = enhanceArticleHtml(current.content)
  const extractedToc = extractToc(contentHtml)
  const toc = extractedToc.length > 0 ? extractedToc : [{ id: 'article-content', text: 'Article', level: 2 as const }]
  const relatedPosts = getRelatedPosts(current, await getEnterprisePosts())
  const image = current.image || '/site-icon.png'
  const publishedTime = current.createdAt
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: current.title,
    description: current.excerpt,
    image,
    datePublished: publishedTime,
    dateModified: current.updatedAt,
    author: { '@type': 'Person', name: current.authorName, image: current.authorImage || authorImage },
    publisher: {
      '@type': 'Organization',
      name: 'Hasif',
      logo: { '@type': 'ImageObject', url: authorImage },
    },
    keywords: current.tags.join(', '),
    articleSection: current.category,
  }

  return (
    <PageTransition>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="page-surface pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="container-custom">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: current.category, href: `/blog/category/${slugify(current.category)}` },
            { label: current.title },
          ]} />

          <header className="mx-auto mb-8 max-w-3xl">
            <Link href={`/blog/category/${slugify(current.category)}`} className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-600 transition hover:border-indigo-200 hover:bg-indigo-100 dark:border-indigo-800/50 dark:bg-indigo-950/50 dark:text-indigo-400">
              {current.category}
            </Link>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              {current.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
              <Link href={`/author/${slugify(current.authorName)}`} className="transition hover:text-indigo-600 dark:hover:text-indigo-300">{current.authorName}</Link>
              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
              <span>{current.date}</span>
              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
              <span>{current.readTime}</span>
            </div>
            {current.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {current.tags.slice(0, 8).map((tag) => (
                  <Link key={tag} href={`/blog/tag/${slugify(tag)}`} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500 transition hover:bg-indigo-50 hover:text-indigo-600 dark:bg-white/10 dark:text-gray-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300">
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <section className="mx-auto mb-8 max-w-3xl rounded-2xl border border-indigo-100 bg-indigo-50/80 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-300">AI Summary</div>
            <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">{current.aiSummary}</p>
          </section>

          {image && (
            <div className="relative mx-auto mb-10 aspect-[16/9] max-w-3xl overflow-hidden rounded-2xl bg-gray-100 shadow-xl dark:bg-white/5">
              <Image
                src={image}
                alt={current.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="min-w-0">
              <div id="article-content" className="blog-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />

              <div className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-800">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white shadow-lg ring-1 ring-indigo-100 dark:bg-gray-900 dark:ring-white/10">
                      <Image
                        src={current.authorImage || authorImage}
                        alt={`${current.authorName} avatar`}
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{current.authorName}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{current.authorRole || 'Author'}</div>
                    </div>
                  </div>
                  <ShareButtons />
                </div>
                {current.authorBio && <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">{current.authorBio}</p>}
              </div>

              <BlogEngagement slug={current.slug} />
            </div>

            <div className="lg:sticky lg:top-32">
              <TableOfContents items={toc} />
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="pb-16 sm:pb-24">
          <div className="container-custom">
            <div className="mb-8 text-center sm:mb-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:border-indigo-800/50 dark:bg-indigo-900/40 dark:text-indigo-400">
                Related Content
              </span>
              <h2 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">Related Articles</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post, index) => <NotionBlogCard key={post.id} post={post} index={index} />)}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </PageTransition>
  )
}
