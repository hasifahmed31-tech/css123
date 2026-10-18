import { blogPosts, type BlogPost } from '@/lib/blog-data'
import type { SanityPost } from '@/lib/sanity'
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
  source: 'sanity' | 'static'
}

// Curated, distinct editorial photos for the built-in article library. Sanity
// featured images remain author-controlled; these are used for static posts
// and as a graceful fallback when a Sanity post has no image.
const editorialPhotos = [
  'photo-1620287920810-3f5b9746380c',
  'photo-1711540846696-9389ab66377e',
  'photo-1575909812264-6902b55846ad',
  'photo-1582327267907-7634b769b06b',
  'photo-1688733720228-4f7a18681c4f',
  'photo-1634046450114-af84f3110bfe',
  'photo-1585180763054-55885f89f0d9',
  'photo-1608324777753-5d2f6e547b1b',
  'photo-1551288049-bebda4e38f71',
  'photo-1511467687858-23d96c32e4ae',
  'photo-1676279168805-97adc0d4c648',
  'photo-1499750310107-5fef28a66643',
  'photo-1688733718722-27b7027a0f5b',
  'photo-1499951360447-b19be8fe80f5',
  'photo-1663524789630-b18292c8de6e',
  'photo-1518770660439-4636190af475',
  'photo-1547658719-da2b51169166',
  'photo-1663524789735-83fabcdd00bf',
  'photo-1731916349129-6d5f58c32c4e',
]

const staticArticlePhotoBySlug: Record<string, number> = {
  'ultimate-guide-affiliate-marketing-2026': 0,
  'top-seo-tools-rank-higher': 1,
  'start-profitable-blog-2026': 2,
  'top-saas-tools-online-business': 3,
  'ai-marketing-tools-strategy': 4,
  'email-marketing-automation-guide': 5,
  'affiliate-vs-influencer-marketing': 6,
  'content-strategy-plan-create-promote': 7,
  'google-analytics-4-beginners-guide': 8,
  'productivity-tools-remote-teams': 9,
  'on-page-seo-techniques-2026': 10,
  'affiliate-marketing-tips-beginners': 11,
  'ai-content-writing-tools-review': 14,
  'local-seo-strategies-small-business': 12,
  'blog-monetization-strategies': 13,
  'technical-seo-checklist': 15,
  'saas-pricing-strategies': 16,
  'email-marketing-copywriting-tips': 17,
  'start-online-store-dropshipping': 18,
}

function editorialPhoto(index: number) {
  return `https://images.unsplash.com/${editorialPhotos[index]}?auto=format&fit=crop&w=1200&q=80`
}

export function articleImageForSlug(slug: string, fallback?: string | null) {
  const index = staticArticlePhotoBySlug[slug]
  return typeof index === 'number' ? editorialPhoto(index) : fallback || editorialPhoto(0)
}

export function formatPostDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function sanityToListPost(post: SanityPost): BlogListPost {
  const excerpt = post.excerpt || excerptFromContent(post.content)
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt,
    content: post.content,
    image: post.featured_image || fallbackImageForCategory(post.category, post.slug),
    category: post.category || 'Article',
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
    source: 'sanity',
  }
}

export function staticToListPost(post: BlogPost): BlogListPost {
  return {
    id: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    image: articleImageForSlug(post.slug, post.image),
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

export function getAllListPosts(sanityPosts: SanityPost[]) {
  const sanitySlugs = new Set(sanityPosts.map((post) => post.slug))
  return [
    ...sanityPosts.map(sanityToListPost),
    ...blogPosts.filter((post) => !sanitySlugs.has(post.slug)).map(staticToListPost),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

function fallbackImageForCategory(category: string | null | undefined, slug: string) {
  const key = category?.toLowerCase() || ''
  const categoryOffset = key.includes('seo') || key.includes('analytics') ? 1
    : key.includes('ai') ? 4
      : key.includes('saas') || key.includes('software') ? 3
        : key.includes('email') ? 5
          : key.includes('blog') || key.includes('content') ? 7 : 0
  const hash = [...slug].reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 0)
  return editorialPhoto((categoryOffset + hash % (editorialPhotos.length - categoryOffset)) % editorialPhotos.length)
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
