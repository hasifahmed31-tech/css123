import { NextResponse } from 'next/server'
import { getEnterprisePosts, searchPosts } from '@/lib/enterprise-blog'
import { secureApi } from '@/lib/security'

export const revalidate = 300

export async function GET(request: Request) {
  const blocked = secureApi(request, { key: 'search', limit: 90 })
  if (blocked) return blocked

  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') || '').trim().slice(0, 120)
  if (!query) return NextResponse.json({ hits: [] })

  const algolia = await searchAlgolia(query)
  if (algolia) return NextResponse.json({ hits: algolia, provider: 'algolia' })

  const posts = searchPosts(await getEnterprisePosts(), query).slice(0, 12)
  return NextResponse.json({ hits: posts, provider: 'local' })
}

async function searchAlgolia(query: string) {
  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_SEARCH_API_KEY
  const indexName = process.env.ALGOLIA_INDEX_NAME
  if (!appId || !apiKey || !indexName) return null

  try {
    const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/${encodeURIComponent(indexName)}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
      },
      body: JSON.stringify({ query, hitsPerPage: 12 }),
      next: { revalidate: 300 },
    })
    if (!response.ok) return null
    const data = await response.json()
    return Array.isArray(data.hits) ? data.hits : null
  } catch {
    return null
  }
}
