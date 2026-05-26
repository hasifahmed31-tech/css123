export interface CmsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  seo_title: string;
  seo_description: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  content: Record<string, string>;
  seo_title: string;
  seo_description: string;
  featured_image: string;
  updated_at: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  storage_path: string;
  size: number;
  mime_type: string;
  alt_text: string;
  created_at: string;
}

export interface SiteSettings {
  general: {
    site_title: string;
    site_description: string;
    contact_email: string;
    phone: string;
  };
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
  branding: {
    logo_url: string;
    favicon_url: string;
    footer_text: string;
  };
}
