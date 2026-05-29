import BlogIndexClient from '@/components/BlogIndexClient'
import { getCategories, getEnterprisePosts } from '@/lib/enterprise-blog'

export const revalidate = 1800

export default async function BlogPage() {
  const posts = await getEnterprisePosts()
  const categories = [
    { name: 'All', slug: 'all', count: posts.length },
    ...getCategories(posts),
  ]

  return <BlogIndexClient posts={posts} categories={categories} />
}
