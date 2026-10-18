import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { cache, Suspense } from 'react'
import { blogPosts, getPostBySlug, getPostIsoDate } from '@/lib/blog-data'
import { excerptFromContent } from '@/lib/content'
import { getSanityPostBySlug, type SanityPost } from '@/lib/sanity'
import {
  enhanceArticleHtml,
  extractToc,
  getRelatedPosts,
  sanityToListPost,
  staticToListPost,
  type BlogListPost,
} from '@/lib/blog-features'
import { getEnterprisePostListings } from '@/lib/enterprise-blog'
import GrowthGuideFinder from '@/components/GrowthGuideFinder'
import ReadingProgress from '@/components/ReadingProgress'
import ShareButtons from '@/components/ShareButtons'
import TableOfContents from '@/components/TableOfContents'
import BlogEngagement from '@/components/BlogEngagement'
import BlogListCard from '@/components/BlogListCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import { slugify } from '@/lib/slug'

const getCachedSanityPost = cache((slug: string) => getSanityPostBySlug(slug))
const getSanityPostSummary = cache(async (slug: string) =>
  (await getEnterprisePostListings()).find((post) => post.slug === slug) || null,
)

interface Props {
  params: Promise<{ slug: string }>
}

const authorImage = '/site-icon.png'

export const revalidate = 1800

export async function generateStaticParams() {
  const posts = await getEnterprisePostListings()
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

  const sanityPost = await getCachedSanityPost(slug)
  const summaryPost = sanityPost ? null : await getSanityPostSummary(slug)
  if (!sanityPost && !summaryPost) return {}

  if (summaryPost) {
    return {
      title: summaryPost.title,
      description: summaryPost.excerpt,
      keywords: summaryPost.tags,
      alternates: { canonical: `/blog/${summaryPost.slug}` },
      openGraph: {
        title: summaryPost.title,
        description: summaryPost.excerpt,
        type: 'article',
        publishedTime: summaryPost.createdAt,
        authors: [summaryPost.authorName],
        tags: summaryPost.tags,
        images: [{ url: summaryPost.image || '/site-icon.png', width: 1200, height: 675, alt: summaryPost.title }],
      },
    }
  }

  const description = sanityPost!.excerpt || excerptFromContent(sanityPost!.content)
  const image = sanityPost!.og_image || sanityPost!.featured_image || `/blog/${sanityPost!.slug}/opengraph-image`
  return {
    title: sanityPost!.title,
    description,
    keywords: sanityPost!.meta_keywords || sanityPost!.tags,
    alternates: { canonical: `/blog/${sanityPost!.slug}` },
    openGraph: {
      title: sanityPost!.title,
      description,
      type: 'article',
      publishedTime: sanityPost!.created_at,
      modifiedTime: sanityPost!.updated_at,
      authors: [sanityPost!.author.name],
      tags: sanityPost!.tags,
      images: [{ url: image, width: 1200, height: 675, alt: sanityPost!.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: sanityPost!.title,
      description,
      images: [image],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const staticPost = getPostBySlug(slug)
  const sanityPost = !staticPost ? await getCachedSanityPost(slug) : null
  const summaryPost = !staticPost && !sanityPost ? await getSanityPostSummary(slug) : null

  if (!staticPost && !sanityPost && !summaryPost) notFound()

  const current: BlogListPost = staticPost
    ? staticToListPost(staticPost)
    : sanityPost
      ? sanityToListPost(sanityPost as SanityPost)
      : summaryPost as BlogListPost

  const contentHtml = enhanceArticleHtml(current.content)
  const extractedToc = extractToc(contentHtml)
  const toc = extractedToc.length > 0 ? extractedToc : [{ id: 'article-content', text: 'Article', level: 2 as const }]
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
    <>
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

          <header className="article-masthead editorial-hero mx-auto mb-8 max-w-5xl rounded-3xl px-6 py-8 sm:px-10 sm:py-12">
            <Link href={`/blog/category/${slugify(current.category)}`} className="eyebrow border-[#7955e8]/20 bg-[#7955e8]/[0.07] text-[#5b35b8] transition hover:border-[#7955e8]/40 dark:border-white/15 dark:bg-white/[0.08] dark:text-[#e3d9ff] dark:hover:border-white/30">
              {current.category}
            </Link>
            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] text-gray-950 dark:text-white sm:text-4xl lg:text-5xl">
              {current.title}
            </h1>
            <div className="article-meta mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <Link href={`/author/${slugify(current.authorName)}`} className="transition hover:text-violet-800 dark:hover:text-violet-200">{current.authorName}</Link>
              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
              <span>{current.date}</span>
              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
              <span>{current.readTime}</span>
            </div>
            {current.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {current.tags.slice(0, 8).map((tag) => (
                <Link key={tag} href={`/blog/tag/${slugify(tag)}`} className="article-tag rounded-full border border-[#7955e8]/15 bg-white/70 px-3 py-1 text-xs font-semibold text-gray-700 transition hover:border-[#7955e8]/40 hover:text-[#5b35b8] dark:border-white/10 dark:bg-white/[0.06] dark:text-white/70 dark:hover:border-violet-200/35 dark:hover:bg-white/10 dark:hover:text-white">
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <section className="article-summary mx-auto mb-8 max-w-5xl rounded-2xl border border-[#5b35b8]/15 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.035] sm:p-6">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#5b35b8] dark:text-[#e3d9ff]">Quick summary</div>
            <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">{current.aiSummary}</p>
          </section>

          {image && (
            <div className="article-cover relative mx-auto mb-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-2xl bg-gray-100 shadow-xl ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:rounded-3xl">
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
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white shadow-lg ring-1 ring-violet-100 dark:bg-gray-900 dark:ring-white/10">
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

      <Suspense fallback={null}>
        <RelatedArticles current={current} />
      </Suspense>

      <GrowthGuideFinder />
    </>
  )
}

async function RelatedArticles({ current }: { current: ReturnType<typeof staticToListPost> }) {
  const posts = await getEnterprisePostListings();
  const relatedPosts = getRelatedPosts(current, posts);
  if (!relatedPosts.length) return null;

  return (
    <section className="pb-16 sm:pb-24">
      <div className="container-custom">
        <div className="mb-8 text-center sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-violet-50 px-4 py-1.5 text-xs font-semibold text-violet-800 dark:border-violet-900/50 dark:bg-violet-950/40 dark:text-violet-300">
            Related Content
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">Related Articles</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post, index) => <BlogListCard key={post.id} post={post} index={index} />)}
        </div>
      </div>
    </section>
  );
}
