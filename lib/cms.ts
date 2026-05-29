import type { Metadata } from 'next'
import { createServerSupabase } from '@/lib/supabase-server'
import type { CmsPage, CmsPost, SiteSettings } from '@/lib/cms-types'

export const siteUrl = 'https://hasif.online'

export function hasSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(
    url &&
    key &&
    !url.includes('example.supabase.co') &&
    !key.includes('YOUR_') &&
    key !== 'public-anon-key'
  )
}

export async function getPublishedPosts(limit?: number) {
  if (!hasSupabaseEnv()) return [] as CmsPost[]
  const supabase = await createServerSupabase()
  let query = supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .or(`scheduled_at.is.null,scheduled_at.lte.${new Date().toISOString()}`)
    .order('created_at', { ascending: false })
  if (limit) query = query.limit(limit)
  const { data } = await query
  return (data ?? []) as CmsPost[]
}

export async function getPostBySlug(slug: string, previewToken?: string) {
  if (!hasSupabaseEnv()) return null
  const supabase = await createServerSupabase()
  let query = supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
  if (previewToken) {
    query = query.eq('preview_token', previewToken)
  } else {
    query = query
      .eq('published', true)
      .or(`scheduled_at.is.null,scheduled_at.lte.${new Date().toISOString()}`)
  }
  const { data } = await query.maybeSingle()
  return data as CmsPost | null
}

export async function getPageBySlug(slug: string) {
  if (!hasSupabaseEnv()) return null
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('pages').select('*').eq('slug', slug).maybeSingle()
  return data as CmsPage | null
}

export async function getSiteSettings() {
  if (!hasSupabaseEnv()) return null
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('settings').select('*').eq('id', 'site').maybeSingle()
  return data as SiteSettings | null
}

export function metadataFromCms(input: {
  title?: string | null
  description?: string | null
  image?: string | null
  canonical?: string | null
  keywords?: string[] | null
  type?: 'website' | 'article'
}): Metadata {
  const title = input.title || 'Hasif'
  const description = input.description || 'Smart tools, reviews, and growth strategies.'
  const canonical = input.canonical || '/'
  const image = input.image || '/site-icon.png'

  return {
    title,
    description,
    keywords: input.keywords ?? undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: input.type || 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
