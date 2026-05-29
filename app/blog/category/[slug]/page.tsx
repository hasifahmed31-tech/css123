import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BlogCollectionPage from '@/components/BlogCollectionPage'
import { getCategories, getEnterprisePosts } from '@/lib/enterprise-blog'

export const revalidate = 1800

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getEnterprisePosts()
  return getCategories(posts).map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const posts = await getEnterprisePosts()
  const category = getCategories(posts).find((item) => item.slug === slug)
  if (!category) return {}
  return {
    title: `${category.name} Articles`,
    description: `Browse ${category.count} Hasif articles about ${category.name}.`,
    alternates: { canonical: `/blog/category/${category.slug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const posts = await getEnterprisePosts()
  const category = getCategories(posts).find((item) => item.slug === slug)
  if (!category) notFound()

  return (
    <BlogCollectionPage
      title={category.name}
      description={`${category.count} articles grouped by this topic.`}
      posts={posts.filter((post) => post.category.toLowerCase().replace(/\s+/g, '-') === slug)}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: category.name }]}
    />
  )
}
