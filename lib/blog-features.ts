import { blogPosts, type BlogPost } from '@/lib/blog-data'
import type { NotionPost } from '@/lib/notion'
import { excerptFromContent, readTime, sanitizeHtml, stripHtml } from '@/lib/content'
import { slugify } from '@/lib/slug'

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

export interface BlogListPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string | null
  category: string
  tags: string[]
  authorName: string
  authorRole: string | null
  authorBio: string | null
  authorImage: string | null
  date: string
  createdAt: string
  updatedAt: string
  readTime: string
  featured: boolean
  trending: boolean
  aiSummary: string
  source: 'notion' | 'static'
}

export function formatPostDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function notionToListPost(post: NotionPost): BlogListPost {
  const excerpt = post.excerpt || excerptFromContent(post.content)
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt,
    content: post.content,
    image: post.featured_image,
    category: post.category || 'CMS Article',
    tags: post.tags,
    authorName: post.author.name,
    authorRole: post.author.role,
    authorBio: post.author.bio,
    authorImage: post.author.image,
    date: formatPostDate(post.created_at),
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    readTime: readTime(post.content || excerpt),
    featured: post.featured,
    trending: post.trending,
    aiSummary: post.ai_summary || generateAiSummary(post.content || excerpt),
    source: 'notion',
  }
}

export function staticToListPost(post: BlogPost): BlogListPost {
  return {
    id: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    image: post.image,
    category: post.category,
    tags: post.seoKeywords.slice(0, 6),
    authorName: post.author,
    authorRole: 'Founder, Hasif',
    authorBio: null,
    authorImage: '/site-icon.png',
    date: post.date,
    createdAt: new Date(`${post.date} 12:00:00 UTC`).toISOString(),
    updatedAt: new Date(`${post.date} 12:00:00 UTC`).toISOString(),
    readTime: post.readTime,
    featured: post.featured,
    trending: post.featured,
    aiSummary: generateAiSummary(post.content || post.excerpt),
    source: 'static',
  }
}

export function getAllListPosts(notionPosts: NotionPost[]) {
  return [
    ...notionPosts.map(notionToListPost),
    ...blogPosts.map(staticToListPost),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function extractToc(html: string): TocItem[] {
  const items: TocItem[] = []
  const headingPattern = /<h([23])(?:\s+id="([^"]+)")?[^>]*>(.*?)<\/h[23]>/gi
  let match: RegExpExecArray | null

  while ((match = headingPattern.exec(html))) {
    const text = stripHtml(match[3])
    if (!text) continue
    items.push({
      id: match[2] || slugify(text),
      text,
      level: match[1] === '3' ? 3 : 2,
    })
  }

  return items
}

export function enhanceArticleHtml(html: string) {
  let index = 0
  const withHeadingIds = html.replace(/<h([23])(?:\s+id="([^"]+)")?([^>]*)>(.*?)<\/h[23]>/gi, (match, level, id, attrs, body) => {
    const headingText = stripHtml(body)
    const safeId = id || `${slugify(headingText)}-${index++}`
    return `<h${level} id="${safeId}"${attrs}>${body}</h${level}>`
  })
  return sanitizeHtml(withHeadingIds)
}

export function getRelatedPosts(current: BlogListPost, posts: BlogListPost[], limit = 3) {
  return posts
    .filter((post) => post.slug !== current.slug)
    .map((post) => ({
      post,
      score:
        (post.category === current.category ? 4 : 0) +
        post.tags.filter((tag) => current.tags.includes(tag)).length +
        (post.featured ? 1 : 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.createdAt).getTime() - new Date(a.post.createdAt).getTime())
    .slice(0, limit)
    .map((item) => item.post)
}

export function generateAiSummary(content: string) {
  const sentences = stripHtml(content)
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)

  return sentences.slice(0, 2).join(' ') || excerptFromContent(content, 220)
}
