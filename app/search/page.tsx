import type { Metadata } from 'next'
import BlogIndexClient from '@/components/BlogIndexClient'
import { getCategories, getEnterprisePosts, searchPosts } from '@/lib/enterprise-blog'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Search Articles',
  description: 'Search Hasif articles by topic, tag, author, and full article text.',
  alternates: { canonical: '/search' },
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams
  const posts = await getEnterprisePosts()
  const filtered = q ? searchPosts(posts, q) : posts
  const categories = [{ name: 'All', slug: 'all', count: filtered.length }, ...getCategories(filtered)]

  return <BlogIndexClient posts={filtered} categories={categories} initialSearch={q} />
}
