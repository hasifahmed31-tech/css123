import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BlogCollectionPage from '@/components/BlogCollectionPage'
import { getEnterprisePosts, getTags } from '@/lib/enterprise-blog'
import { slugify } from '@/lib/slug'

export const revalidate = 1800

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getEnterprisePosts()
  return getTags(posts).map((tag) => ({ slug: tag.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tag = getTags(await getEnterprisePosts()).find((item) => item.slug === slug)
  if (!tag) return {}
  return {
    title: `${tag.name} Guides`,
    description: `Read Hasif articles tagged ${tag.name}.`,
    alternates: { canonical: `/blog/tag/${tag.slug}` },
  }
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params
  const posts = await getEnterprisePosts()
  const tag = getTags(posts).find((item) => item.slug === slug)
  if (!tag) notFound()

  return (
    <BlogCollectionPage
      title={`#${tag.name}`}
      description={`${tag.count} articles with this tag.`}
      posts={posts.filter((post) => post.tags.some((item) => slugify(item) === slug))}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: `#${tag.name}` }]}
    />
  )
}
