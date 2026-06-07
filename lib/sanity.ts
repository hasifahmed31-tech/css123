import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { excerptFromContent, sanitizeHtml, stripHtml } from '@/lib/content'
import { slugify } from '@/lib/slug'

export const sanityRevalidate = 60

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: false,
})

const builder = imageUrlBuilder({ projectId, dataset })

export interface SanityPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  category: string | null
  tags: string[]
  author: {
    name: string
    slug: string
    role: string | null
    bio: string | null
    image: string | null
  }
  featured: boolean
  trending: boolean
  ai_summary: string | null
  og_image: string | null
  meta_keywords: string[] | null
  created_at: string
  updated_at: string
  published: boolean
}

export interface EditablePage {
  slug: string
  eyebrow: string | null
  title: string | null
  description: string | null
  bodyHtml: string
  metaTitle: string | null
  metaDescription: string | null
  keywords: string[] | null
  ogImage: string | null
}

export interface SiteSettings {
  title: string
  description: string
  email: string
  linkedin: string
  navLinks: Array<{ label: string; href: string }>
  footerLinks: Array<{ label: string; href: string }>
  footerNote: string
}

type PortableTextSpan = {
  _type?: string
  text?: string
  marks?: string[]
}

type PortableTextBlock = {
  _type?: string
  style?: string
  listItem?: 'bullet' | 'number'
  children?: PortableTextSpan[]
  markDefs?: Array<{ _key: string; _type?: string; href?: string; blank?: boolean }>
  asset?: unknown
  alt?: string
  caption?: string
}

type SanityPostDocument = {
  _id: string
  title?: string
  slug?: string
  excerpt?: string | null
  body?: PortableTextBlock[] | null
  featuredImage?: unknown
  category?: string | null
  tags?: string[] | null
  author?: {
    name?: string
    slug?: string
    role?: string | null
    bio?: string | null
    image?: unknown
  } | null
  featured?: boolean
  trending?: boolean
  aiSummary?: string | null
  ogImage?: unknown
  metaKeywords?: string[] | null
  publishedAt?: string | null
  _createdAt: string
  _updatedAt: string
}

const publishedPostFilter = `_type == "post" && defined(slug.current) && (!defined(publishedAt) || publishedAt <= now()) && !(_id in path("drafts.**"))`

const postProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  featuredImage,
  "category": category->title,
  "tags": tags[]->title,
  "author": author->{name, "slug": slug.current, role, bio, image},
  featured,
  trending,
  aiSummary,
  "ogImage": ogImage,
  "metaKeywords": keywords,
  publishedAt,
  _createdAt,
  _updatedAt
}`

export async function getPublishedSanityPosts(limit?: number): Promise<SanityPost[]> {
  const query = `*[${publishedPostFilter}] | order(coalesce(publishedAt, _createdAt) desc) [0...$limit] ${postProjection}`
  const docs = await client.fetch<SanityPostDocument[]>(
    query,
    { limit: limit ?? 100 },
    { next: { revalidate: sanityRevalidate, tags: ['sanity-posts'] } },
  )
  return docs.map(documentToPost).filter((post): post is SanityPost => Boolean(post))
}

export async function getSanityPostBySlug(slug: string): Promise<SanityPost | null> {
  const query = `*[${publishedPostFilter} && slug.current == $slug][0] ${postProjection}`
  const doc = await client.fetch<SanityPostDocument | null>(
    query,
    { slug },
    { next: { revalidate: sanityRevalidate, tags: ['sanity-posts', `sanity-post-${slug}`] } },
  )
  return doc ? documentToPost(doc) : null
}

export async function getEditablePage(slug: 'home' | 'about' | 'contact'): Promise<EditablePage | null> {
  const doc = await client.fetch<{
    slug?: string
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    body?: PortableTextBlock[] | null
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string[] | null
    ogImage?: unknown
  } | null>(
    `*[_type == "page" && slug == $slug && !(_id in path("drafts.**"))][0]{
      slug, eyebrow, title, description, body, metaTitle, metaDescription, keywords, ogImage
    }`,
    { slug },
    { next: { revalidate: sanityRevalidate, tags: ['sanity-pages', `sanity-page-${slug}`] } },
  )

  if (!doc) return null
  return {
    slug,
    eyebrow: doc.eyebrow || null,
    title: doc.title || null,
    description: doc.description || null,
    bodyHtml: portableTextToHtml(doc.body || []),
    metaTitle: doc.metaTitle || null,
    metaDescription: doc.metaDescription || null,
    keywords: doc.keywords || null,
    ogImage: imageUrl(doc.ogImage, 1200, 675),
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await client.fetch<Partial<SiteSettings> | null>(
    `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{
      title, description, email, linkedin, navLinks, footerLinks, footerNote
    }`,
    {},
    { next: { revalidate: sanityRevalidate, tags: ['sanity-settings'] } },
  )

  const description = cleanSettingText(
    settings?.description,
    'Clear SaaS, AI, SEO, and marketing guides for creators who want faster decisions and cleaner growth systems.',
  )
  const footerNote = cleanSettingText(
    settings?.footerNote,
    'Independent guides for smarter tools, stronger SEO, and sustainable online growth.',
  )

  return {
    title: settings?.title || 'Hasif',
    description,
    email: settings?.email || 'info@hasif.online',
    linkedin: settings?.linkedin || 'https://www.linkedin.com/in/hasifonline',
    navLinks: settings?.navLinks?.length ? settings.navLinks : [
      { href: '/', label: 'Home' },
      { href: '/blog', label: 'Blog' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    footerLinks: settings?.footerLinks?.length ? settings.footerLinks : [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
      { href: '/affiliate-disclosure', label: 'Affiliate disclosure' },
      { href: '/disclaimer', label: 'Disclaimer' },
    ],
    footerNote,
  }
}

function cleanSettingText(value: unknown, fallback: string) {
  const text = String(value || '').trim()
  if (!text || text.length < 12 || !/[a-z]{4,}/i.test(text)) return fallback
  return text
}

function documentToPost(doc: SanityPostDocument): SanityPost | null {
  if (!doc.title || !doc.slug) return null
  const content = portableTextToHtml(doc.body || [])
  const excerpt = doc.excerpt || excerptFromContent(content)
  const createdAt = doc.publishedAt || doc._createdAt

  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug,
    excerpt,
    content,
    featured_image: imageUrl(doc.featuredImage, 1400, 875),
    category: doc.category || 'Article',
    tags: doc.tags || [],
    author: {
      name: doc.author?.name || 'Hasif',
      slug: doc.author?.slug || slugify(doc.author?.name || 'Hasif'),
      role: doc.author?.role || null,
      bio: doc.author?.bio || null,
      image: imageUrl(doc.author?.image, 300, 300),
    },
    featured: Boolean(doc.featured),
    trending: Boolean(doc.trending),
    ai_summary: doc.aiSummary || null,
    og_image: imageUrl(doc.ogImage, 1200, 675),
    meta_keywords: doc.metaKeywords || doc.tags || null,
    created_at: createdAt,
    updated_at: doc._updatedAt || createdAt,
    published: Boolean(doc.publishedAt),
  }
}

function imageUrl(source: unknown, width: number, height: number) {
  if (!source) return null
  try {
    return builder.image(source as SanityImageSource).width(width).height(height).fit('crop').auto('format').url()
  } catch {
    return null
  }
}

export function portableTextToHtml(blocks: PortableTextBlock[]) {
  const html: string[] = []
  let listType: 'ul' | 'ol' | null = null

  function closeList() {
    if (listType) {
      html.push(`</${listType}>`)
      listType = null
    }
  }

  for (const block of blocks) {
    if (block._type === 'image') {
      closeList()
      const src = imageUrl(block, 1200, 800)
      if (src) html.push(`<img src="${escapeAttribute(src)}" alt="${escapeAttribute(block.alt || block.caption || '')}" />`)
      continue
    }

    if (block._type !== 'block') continue

    const body = renderSpans(block)
    if (!body) continue

    if (block.listItem) {
      const nextList = block.listItem === 'number' ? 'ol' : 'ul'
      if (listType !== nextList) {
        closeList()
        html.push(`<${nextList}>`)
        listType = nextList
      }
      html.push(`<li>${body}</li>`)
      continue
    }

    closeList()
    if (block.style === 'h2') {
      html.push(`<h2 id="${escapeAttribute(slugify(stripHtml(body)))}">${body}</h2>`)
    } else if (block.style === 'h3') {
      html.push(`<h3 id="${escapeAttribute(slugify(stripHtml(body)))}">${body}</h3>`)
    } else if (block.style === 'blockquote') {
      html.push(`<blockquote>${body}</blockquote>`)
    } else {
      html.push(`<p>${body}</p>`)
    }
  }

  closeList()
  return sanitizeHtml(html.join('\n'))
}

function renderSpans(block: PortableTextBlock) {
  const markDefs = new Map((block.markDefs || []).map((def) => [def._key, def]))
  return (block.children || [])
    .map((span) => {
      let value = escapeHtml(span.text || '')
      for (const mark of span.marks || []) {
        const def = markDefs.get(mark)
        if (mark === 'strong') value = `<strong>${value}</strong>`
        else if (mark === 'em') value = `<em>${value}</em>`
        else if (mark === 'code') value = `<code>${value}</code>`
        else if (mark === 'underline') value = `<u>${value}</u>`
        else if (mark === 'strike-through') value = `<s>${value}</s>`
        else if (def?._type === 'link' && safeHtmlUrl(def.href)) {
          const target = def.blank ? ' target="_blank" rel="noopener noreferrer"' : ''
          value = `<a href="${escapeAttribute(def.href || '')}"${target}>${value}</a>`
        }
      }
      return value
    })
    .join('')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replace(/'/g, '&#39;')
}

function safeHtmlUrl(value?: string | null) {
  if (!value) return null
  if (value.startsWith('/')) return value
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'https:' || parsed.protocol === 'mailto:' ? parsed.toString() : null
  } catch {
    return null
  }
}
