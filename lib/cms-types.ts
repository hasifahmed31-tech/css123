export type JsonRecord = Record<string, unknown>

export interface CmsPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  seo_title: string | null
  seo_description: string | null
  og_image: string | null
  canonical_url: string | null
  meta_keywords: string[] | null
  category: string | null
  tags: string[] | null
  author_name: string | null
  author_role: string | null
  author_bio: string | null
  author_image: string | null
  scheduled_at: string | null
  preview_token: string | null
  created_at: string
  updated_at: string
  published: boolean
}

export interface CmsPage {
  id: string
  title: string
  slug: string
  content: JsonRecord
  seo_title: string | null
  seo_description: string | null
  featured_image: string | null
  og_image: string | null
  canonical_url: string | null
  meta_keywords: string[] | null
  updated_at: string
}

export interface CmsMedia {
  id: string
  file_name: string
  file_path: string
  public_url: string
  mime_type: string | null
  size: number | null
  alt_text: string | null
  created_at: string
}

export interface SiteSettings {
  id: string
  site_title: string
  site_description: string
  logo: string | null
  favicon: string | null
  footer_text: string | null
  contact_email: string | null
  phone_number: string | null
  social_links: Record<string, string>
  navbar_links: Array<{ label: string; href: string }>
  updated_at: string
}

export interface PageContent {
  hero?: {
    eyebrow?: string
    heading?: string
    body?: string
    primaryLabel?: string
    primaryHref?: string
    secondaryLabel?: string
    secondaryHref?: string
    image?: string
  }
  sections?: Array<{
    id: string
    label: string
    heading: string
    body: string
    image?: string
    buttonLabel?: string
    buttonHref?: string
  }>
  cta?: {
    heading?: string
    body?: string
    buttonLabel?: string
    buttonHref?: string
  }
}
