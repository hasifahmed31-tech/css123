import { createServerSupabase } from './supabase-server'

interface SupabasePost {
  id: string
  title: string
  content: string
  created_at: string
}

export interface MergedPost extends SupabasePost {
  excerpt: string
  slug: string
  isCms: boolean
  date: string
  readTime: string
}

function estimateReadTime(content: string): string {
  const text = content.replace(/<[^>]+>/g, '')
  const words = text.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

function createExcerpt(content: string): string {
  const text = content.replace(/<[^>]+>/g, '').trim()
  return text.length > 160 ? text.slice(0, 157) + '...' : text
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 80) || 'post'
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function getAllPosts(): Promise<MergedPost[]> {
  try {
    const supabase = await createServerSupabase()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) return []

    return data.map((post: SupabasePost) => ({
      ...post,
      excerpt: createExcerpt(post.content),
      slug: slugify(post.title),
      isCms: true,
      date: formatDate(post.created_at),
      readTime: estimateReadTime(post.content),
    }))
  } catch {
    return []
  }
}

export async function getPostById(id: string): Promise<MergedPost | null> {
  try {
    const supabase = await createServerSupabase()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null

    return {
      ...data,
      excerpt: createExcerpt(data.content),
      slug: slugify(data.title),
      isCms: true,
      date: formatDate(data.created_at),
      readTime: estimateReadTime(data.content),
    }
  } catch {
    return null
  }
}
