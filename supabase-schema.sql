-- ============================================
-- Supabase Schema for Hasif Online CMS
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Create the posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access (anyone can view posts)
CREATE POLICY "Public can read posts"
  ON posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. Allow authenticated users to insert posts
CREATE POLICY "Authenticated users can insert posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 5. Allow authenticated users to update posts
CREATE POLICY "Authenticated users can update posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Allow authenticated users to delete posts
CREATE POLICY "Authenticated users can delete posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (true);
