import { getPublishedPosts } from '@/lib/cms'
import { getPublishedNotionPosts } from '@/lib/notion'
import { getAllListPosts } from '@/lib/blog-features'

export const revalidate = 1800

const siteUrl = 'https://hasif.online'

export async function GET() {
  const [notionPosts, cmsPosts] = await Promise.all([
    getPublishedNotionPosts(),
    getPublishedPosts(),
  ])
  const notionList = getAllListPosts(notionPosts)
  const cmsList = cmsPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    updatedAt: post.updated_at,
  }))

  const items = [
    ...notionList.map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      updatedAt: post.updatedAt,
    })),
    ...cmsList,
  ]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 50)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hasif Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Smart tools, reviews, and growth strategies.</description>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.updatedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
    },
  })
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
