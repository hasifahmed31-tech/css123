-- ============================================
-- Supabase Schema for Hasif Online CMS
-- Run this in your Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. POSTS TABLE (expanded)
-- ============================================
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  featured_image TEXT DEFAULT '',
  seo_title TEXT DEFAULT '',
  seo_description TEXT DEFAULT '',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert posts"
  ON posts FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
  ON posts FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete posts"
  ON posts FOR DELETE TO authenticated
  USING (true);

-- ============================================
-- 2. PAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB DEFAULT '{}'::jsonb,
  seo_title TEXT DEFAULT '',
  seo_description TEXT DEFAULT '',
  featured_image TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read pages"
  ON pages FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert pages"
  ON pages FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pages"
  ON pages FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete pages"
  ON pages FOR DELETE TO authenticated
  USING (true);

-- Insert default page entries
INSERT INTO pages (title, slug, content) VALUES
  ('Home', 'home', '{"hero_title": "Your Source for Premium Tech & AI Resources", "hero_subtitle": "Explore the latest in AI tools, hosting, web development, and affiliate marketing.", "hero_cta_text": "Explore Articles", "hero_cta_link": "/blog"}'::jsonb),
  ('About', 'about', '{"heading": "About Hasif Online", "body": ""}'::jsonb),
  ('Contact', 'contact', '{"heading": "Get in Touch", "body": ""}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 3. MEDIA TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  size INTEGER DEFAULT 0,
  mime_type TEXT DEFAULT '',
  alt_text TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read media"
  ON media FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert media"
  ON media FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update media"
  ON media FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete media"
  ON media FOR DELETE TO authenticated
  USING (true);

-- ============================================
-- 4. SETTINGS TABLE (key-value)
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read settings"
  ON settings FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert settings"
  ON settings FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update settings"
  ON settings FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('general', '{"site_title": "Hasif Online", "site_description": "Your Source for Premium Tech & AI Resources", "contact_email": "", "phone": ""}'::jsonb),
  ('social', '{"linkedin": "", "twitter": "", "github": ""}'::jsonb),
  ('branding', '{"logo_url": "", "favicon_url": "", "footer_text": "© 2026 Hasif Online. All rights reserved."}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- 5. STORAGE BUCKET for media uploads
-- ============================================
-- Run this in Supabase SQL editor or create via dashboard:
-- Go to Storage → Create bucket named "media" → Set to public

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to media bucket
CREATE POLICY "Public read media bucket"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media');

CREATE POLICY "Authenticated upload to media bucket"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated delete from media bucket"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media');

-- ============================================
-- 6. HELPER: auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
