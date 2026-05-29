import { formatPostDate, generateAiSummary, getAllListPosts, type BlogListPost } from '@/lib/blog-features'
import { getPublishedNotionPosts } from '@/lib/notion'
import { slugify } from '@/lib/slug'
import { excerptFromContent, readTime, stripHtml } from '@/lib/content'
import { getPublishedPosts } from '@/lib/cms'
import type { CmsPost } from '@/lib/cms-types'

export async function getEnterprisePosts() {
  const [notionPosts, cmsPosts] = await Promise.all([getPublishedNotionPosts(), getPublishedPosts()])
  return [
    ...cmsPosts.map(cmsToListPost),
    ...getAllListPosts(notionPosts),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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

function cmsToListPost(post: CmsPost): BlogListPost {
  const excerpt = post.excerpt || excerptFromContent(post.content)
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt,
    content: post.content,
    image: post.featured_image,
    category: post.category || 'CMS Article',
    tags: post.tags || post.meta_keywords || [],
    authorName: post.author_name || 'Hasif',
    authorRole: post.author_role,
    authorBio: post.author_bio,
    authorImage: post.author_image || '/site-icon.png',
    date: formatPostDate(post.created_at),
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    readTime: readTime(post.content || excerpt),
    featured: false,
    trending: false,
    aiSummary: generateAiSummary(post.content || excerpt),
    source: 'notion',
  }
}
