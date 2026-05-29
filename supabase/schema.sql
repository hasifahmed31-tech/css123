create extension if not exists "pgcrypto";

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  featured_image text,
  seo_title text,
  seo_description text,
  og_image text,
  canonical_url text,
  meta_keywords text[] default '{}',
  category text default 'CMS Article',
  tags text[] default '{}',
  author_name text default 'Hasif',
  author_role text,
  author_bio text,
  author_image text,
  scheduled_at timestamptz,
  preview_token text default encode(gen_random_bytes(24), 'hex'),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.posts add column if not exists category text default 'CMS Article';
alter table public.posts add column if not exists tags text[] default '{}';
alter table public.posts add column if not exists author_name text default 'Hasif';
alter table public.posts add column if not exists author_role text;
alter table public.posts add column if not exists author_bio text;
alter table public.posts add column if not exists author_image text;
alter table public.posts add column if not exists scheduled_at timestamptz;
alter table public.posts add column if not exists preview_token text default encode(gen_random_bytes(24), 'hex');

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content jsonb not null default '{}'::jsonb,
  seo_title text,
  seo_description text,
  featured_image text,
  og_image text,
  canonical_url text,
  meta_keywords text[] default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_path text not null unique,
  public_url text not null,
  mime_type text,
  size bigint,
  alt_text text,
  created_at timestamptz not null default now()
);

create table if not exists public.settings (
  id text primary key default 'site',
  site_title text not null default 'Hasif',
  site_description text not null default 'Smart tools, reviews, and growth strategies.',
  logo text,
  favicon text,
  footer_text text,
  contact_email text,
  phone_number text,
  social_links jsonb not null default '{}'::jsonb,
  navbar_links jsonb not null default '[{"label":"Home","href":"/"},{"label":"Blog","href":"/blog"},{"label":"About","href":"/about"},{"label":"Contact","href":"/contact"}]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'inline',
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at before update on public.posts
for each row execute function public.set_updated_at();

drop trigger if exists pages_updated_at on public.pages;
create trigger pages_updated_at before update on public.pages
for each row execute function public.set_updated_at();

drop trigger if exists settings_updated_at on public.settings;
create trigger settings_updated_at before update on public.settings
for each row execute function public.set_updated_at();

insert into public.settings (id) values ('site')
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do update set public = true;

alter table public.posts enable row level security;
alter table public.pages enable row level security;
alter table public.media enable row level security;
alter table public.settings enable row level security;
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts" on public.posts
for select using (published = true or auth.role() = 'authenticated');

drop policy if exists "Authenticated users manage posts" on public.posts;
create policy "Authenticated users manage posts" on public.posts
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public can read pages" on public.pages;
create policy "Public can read pages" on public.pages
for select using (true);

drop policy if exists "Authenticated users manage pages" on public.pages;
create policy "Authenticated users manage pages" on public.pages
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public can read media" on public.media;
create policy "Public can read media" on public.media
for select using (true);

drop policy if exists "Authenticated users manage media" on public.media;
create policy "Authenticated users manage media" on public.media
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public can read settings" on public.settings;
create policy "Public can read settings" on public.settings
for select using (true);

drop policy if exists "Authenticated users manage settings" on public.settings;
create policy "Authenticated users manage settings" on public.settings
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users read newsletter subscribers" on public.newsletter_subscribers;
create policy "Authenticated users read newsletter subscribers" on public.newsletter_subscribers
for select using (auth.role() = 'authenticated');

drop policy if exists "Anyone can subscribe to newsletter" on public.newsletter_subscribers;
create policy "Anyone can subscribe to newsletter" on public.newsletter_subscribers
for insert with check (true);

drop policy if exists "Public reads cms media files" on storage.objects;
create policy "Public reads cms media files" on storage.objects
for select using (bucket_id = 'cms-media');

drop policy if exists "Authenticated users upload cms media files" on storage.objects;
create policy "Authenticated users upload cms media files" on storage.objects
for insert with check (bucket_id = 'cms-media' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users update cms media files" on storage.objects;
create policy "Authenticated users update cms media files" on storage.objects
for update using (bucket_id = 'cms-media' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users delete cms media files" on storage.objects;
create policy "Authenticated users delete cms media files" on storage.objects
for delete using (bucket_id = 'cms-media' and auth.role() = 'authenticated');
