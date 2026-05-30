import { formatPostDate, generateAiSummary, getAllListPosts, type BlogListPost } from '@/lib/blog-features'
import { getPublishedNotionPosts } from '@/lib/notion'
import { slugify } from '@/lib/slug'
import { stripHtml } from '@/lib/content'

export async function getEnterprisePosts() {
  const notionPosts = await getPublishedNotionPosts()
  return getAllListPosts(notionPosts)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getCategories(posts: BlogListPost[]) {
  return groupBySlug(posts, (post) => post.category)
}

export function getTags(posts: BlogListPost[]) {
  return groupBySlug(posts.flatMap((post) => post.tags.map((tag) => ({ ...post, category: tag }))), (post) => post.category)
}

export function getAuthors(posts: BlogListPost[]) {
  return groupBySlug(posts, (post) => post.authorName)
}

export function searchPosts(posts: BlogListPost[], query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return posts

  return posts
    .map((post) => {
      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        post.authorName,
        post.tags.join(' '),
        stripHtml(post.content),
      ].join(' ').toLowerCase()
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0)
      return { post, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || Number(b.post.featured) - Number(a.post.featured))
    .map((item) => item.post)
}

function groupBySlug(posts: BlogListPost[], labelFor: (post: BlogListPost) => string) {
  const map = new Map<string, { name: string; slug: string; count: number }>()
  for (const post of posts) {
    const name = labelFor(post) || 'Uncategorized'
    const slug = slugify(name)
    const existing = map.get(slug)
    if (existing) existing.count += 1
    else map.set(slug, { name, slug, count: 1 })
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}
