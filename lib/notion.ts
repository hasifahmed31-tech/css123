import { Client } from '@notionhq/client'
import { markdownToHtml, sanitizeHtml } from '@/lib/content'
import { slugify } from '@/lib/slug'

export const notionRevalidate = 60 * 30

export interface NotionPost {
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

type RichText = {
  plain_text?: string
  href?: string | null
  annotations?: {
    bold?: boolean
    italic?: boolean
    strikethrough?: boolean
    underline?: boolean
    code?: boolean
  }
}

type NotionProperty = {
  type?: string
  title?: RichText[]
  rich_text?: RichText[]
  checkbox?: boolean
  select?: { name?: string } | null
  multi_select?: Array<{ name?: string }>
  number?: number | null
  date?: { start?: string | null } | null
  files?: Array<{
    name?: string
    type?: 'file' | 'external'
    file?: { url?: string }
    external?: { url?: string }
  }>
  url?: string | null
}

type NotionPage = {
  id: string
  created_time?: string
  last_edited_time?: string
  properties?: Record<string, NotionProperty>
}

type NotionBlock = {
  type?: string
  paragraph?: { rich_text?: RichText[] }
  heading_1?: { rich_text?: RichText[] }
  heading_2?: { rich_text?: RichText[] }
  heading_3?: { rich_text?: RichText[] }
  bulleted_list_item?: { rich_text?: RichText[] }
  numbered_list_item?: { rich_text?: RichText[] }
  quote?: { rich_text?: RichText[] }
  code?: { rich_text?: RichText[]; language?: string }
  image?: { file?: { url?: string }; external?: { url?: string }; caption?: RichText[] }
}

let notionClient: Client | null = null
let resolvedDataSourceId: string | null = null

export function hasNotionEnv() {
  return Boolean(process.env.NOTION_TOKEN && (process.env.NOTION_DATA_SOURCE_ID || process.env.NOTION_DATABASE_ID))
}

function notion() {
  if (!notionClient) {
    notionClient = new Client({ auth: process.env.NOTION_TOKEN })
  }
  return notionClient
}

async function notionDataSourceId() {
  if (resolvedDataSourceId) return resolvedDataSourceId
  if (process.env.NOTION_DATA_SOURCE_ID) {
    resolvedDataSourceId = process.env.NOTION_DATA_SOURCE_ID
    return resolvedDataSourceId
  }

  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) return null

  try {
    const database = await notion().databases.retrieve({ database_id: databaseId })
    const dataSources = 'data_sources' in database ? database.data_sources : []
    resolvedDataSourceId = dataSources?.[0]?.id || databaseId
    return resolvedDataSourceId
  } catch {
    return databaseId
  }
}

function richTextToPlain(items: RichText[] = []) {
  return items.map((item) => item.plain_text ?? '').join('').trim()
}

function richTextToHtml(items: RichText[] = []) {
  return items.map((item) => {
    let value = escapeHtml(item.plain_text ?? '')
    if (item.annotations?.code) value = `<code>${value}</code>`
    if (item.annotations?.bold) value = `<strong>${value}</strong>`
    if (item.annotations?.italic) value = `<em>${value}</em>`
    if (item.annotations?.underline) value = `<u>${value}</u>`
    if (item.annotations?.strikethrough) value = `<s>${value}</s>`
    const href = safeHtmlUrl(item.href)
    if (href) value = `<a href="${escapeAttribute(href)}" target="_blank" rel="noopener noreferrer">${value}</a>`
    return value
  }).join('')
}

function title(properties: Record<string, NotionProperty>) {
  return richTextToPlain(properties.Name?.title)
}

function text(properties: Record<string, NotionProperty>, name: string) {
  return richTextToPlain(properties[name]?.rich_text)
}

function selectName(properties: Record<string, NotionProperty>, name: string) {
  return properties[name]?.select?.name || text(properties, name) || null
}

function multiSelect(properties: Record<string, NotionProperty>, name: string) {
  const property = properties[name]
  if (property?.multi_select?.length) {
    return property.multi_select.map((item) => item.name).filter((item): item is string => Boolean(item))
  }
  return text(properties, name)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function checkbox(properties: Record<string, NotionProperty>, name: string) {
  return Boolean(properties[name]?.checkbox)
}

function date(properties: Record<string, NotionProperty>, name: string, fallback?: string) {
  return properties[name]?.date?.start || fallback || new Date().toISOString()
}

function fileUrl(properties: Record<string, NotionProperty>, name: string) {
  const property = properties[name]
  const file = property?.files?.[0]
  return property?.url || file?.file?.url || file?.external?.url || null
}

function contentFromProperty(properties: Record<string, NotionProperty>) {
  const value = text(properties, 'content')
  if (!value) return ''
  return value.trim().startsWith('<') ? sanitizeHtml(value) : markdownToHtml(value)
}

async function pageToPost(page: NotionPage, includeBlocks = false): Promise<NotionPost | null> {
  const properties = page.properties ?? {}
  const postTitle = title(properties)
  const postSlug = text(properties, 'slug') || slugify(postTitle)
  const createdAt = date(properties, 'created_at', page.created_time)
  const propertyContent = contentFromProperty(properties)

  if (!postTitle || !postSlug) return null

  return {
    id: page.id,
    title: postTitle,
    slug: postSlug,
    excerpt: text(properties, 'excerpt') || null,
    content: propertyContent || (includeBlocks ? await blocksToHtml(page.id) : ''),
    featured_image: fileUrl(properties, 'featured_image'),
    category: selectName(properties, 'category'),
    tags: multiSelect(properties, 'tags'),
    author: {
      name: text(properties, 'author_name') || 'Hasif',
      role: text(properties, 'author_role') || null,
      bio: text(properties, 'author_bio') || null,
      image: fileUrl(properties, 'author_image'),
    },
    featured: checkbox(properties, 'featured'),
    trending: checkbox(properties, 'trending') || Boolean(properties.trending_score?.number && properties.trending_score.number > 0),
    ai_summary: text(properties, 'ai_summary') || text(properties, 'summary') || null,
    og_image: fileUrl(properties, 'og_image'),
    meta_keywords: multiSelect(properties, 'meta_keywords'),
    created_at: createdAt,
    updated_at: page.last_edited_time || createdAt,
    published: checkbox(properties, 'published'),
  }
}

export async function getPublishedNotionPosts(limit?: number): Promise<NotionPost[]> {
  if (!hasNotionEnv()) return [] as NotionPost[]

  try {
    const dataSourceId = await notionDataSourceId()
    if (!dataSourceId) return []

    const response = await notion().dataSources.query({
      data_source_id: dataSourceId,
      filter: { property: 'published', checkbox: { equals: true } },
      sorts: [{ property: 'created_at', direction: 'descending' }],
      page_size: Math.min(limit ?? 100, 100),
    })

    const posts = await Promise.all(response.results.map((page) => pageToPost(page as NotionPage, false)))
    return posts.filter((post): post is NotionPost => Boolean(post))
  } catch {
    return []
  }
}

export async function getNotionPostBySlug(slug: string): Promise<NotionPost | null> {
  if (!hasNotionEnv()) return null

  try {
    const dataSourceId = await notionDataSourceId()
    if (!dataSourceId) return null

    const response = await notion().dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          { property: 'published', checkbox: { equals: true } },
          { property: 'slug', rich_text: { equals: slug } },
        ],
      },
      page_size: 1,
    })

    const page = response.results[0]
    return page ? pageToPost(page as NotionPage, true) : null
  } catch {
    return null
  }
}

async function blocksToHtml(blockId: string) {
  const blocks: NotionBlock[] = []
  let cursor: string | undefined

  do {
    const response = await notion().blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    })
    blocks.push(...response.results as NotionBlock[])
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined
  } while (cursor)

  return sanitizeHtml(renderBlocks(blocks))
}

function renderBlocks(blocks: NotionBlock[]) {
  const html: string[] = []
  let listType: 'ul' | 'ol' | null = null

  function closeList() {
    if (listType) {
      html.push(`</${listType}>`)
      listType = null
    }
  }

  for (const block of blocks) {
    const type = block.type
    if (type !== 'bulleted_list_item' && type !== 'numbered_list_item') closeList()

    if (type === 'paragraph') html.push(`<p>${richTextToHtml(block.paragraph?.rich_text)}</p>`)
    if (type === 'heading_1') html.push(`<h2 id="${escapeAttribute(slugify(richTextToPlain(block.heading_1?.rich_text)))}">${richTextToHtml(block.heading_1?.rich_text)}</h2>`)
    if (type === 'heading_2') html.push(`<h2 id="${escapeAttribute(slugify(richTextToPlain(block.heading_2?.rich_text)))}">${richTextToHtml(block.heading_2?.rich_text)}</h2>`)
    if (type === 'heading_3') html.push(`<h3 id="${escapeAttribute(slugify(richTextToPlain(block.heading_3?.rich_text)))}">${richTextToHtml(block.heading_3?.rich_text)}</h3>`)
    if (type === 'quote') html.push(`<blockquote>${richTextToHtml(block.quote?.rich_text)}</blockquote>`)
    if (type === 'divider') html.push('<hr />')
    if (type === 'code') {
      const language = block.code?.language || 'plain text'
      html.push(`<pre data-language="${escapeAttribute(language)}"><code>${highlightCode(richTextToPlain(block.code?.rich_text))}</code></pre>`)
    }
    if (type === 'image') {
      const src = block.image?.file?.url || block.image?.external?.url
      const caption = richTextToPlain(block.image?.caption)
      const imageSrc = safeHtmlUrl(src)
      if (imageSrc) html.push(`<img src="${escapeAttribute(imageSrc)}" alt="${escapeAttribute(caption)}" />`)
    }
    if (type === 'bulleted_list_item') {
      if (listType !== 'ul') {
        closeList()
        html.push('<ul>')
        listType = 'ul'
      }
      html.push(`<li>${richTextToHtml(block.bulleted_list_item?.rich_text)}</li>`)
    }
    if (type === 'numbered_list_item') {
      if (listType !== 'ol') {
        closeList()
        html.push('<ol>')
        listType = 'ol'
      }
      html.push(`<li>${richTextToHtml(block.numbered_list_item?.rich_text)}</li>`)
    }
  }

  closeList()
  return html.join('\n')
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
    return parsed.protocol === 'https:' ? parsed.toString() : null
  } catch {
    return null
  }
}

function highlightCode(value: string) {
  const escaped = escapeHtml(value)
  return escaped.replace(
    /\b(const|let|var|function|return|async|await|import|export|from|type|interface|class|if|else|for|while|try|catch|true|false|null|undefined)\b/g,
    '<span class="code-keyword">$1</span>'
  )
}
