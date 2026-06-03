import type { MetadataRoute } from 'next';
import { blogPosts, getPostIsoDate } from '@/lib/blog-data';
import { getPublishedSanityPosts } from '@/lib/sanity';
import { getAuthors, getCategories, getEnterprisePosts, getTags } from '@/lib/enterprise-blog';
import { siteOrigin } from '@/lib/site';

const siteUrl = siteOrigin;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/affiliate-disclosure',
    '/disclaimer',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date('2026-05-20T12:00:00.000Z'),
    changeFrequency: route === '' || route === '/blog' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(getPostIsoDate(post)),
    changeFrequency: 'monthly',
    priority: post.featured ? 0.9 : 0.8,
  }));

  const sanityPosts = await getPublishedSanityPosts();
  const sanityPostRoutes: MetadataRoute.Sitemap = sanityPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const enterprisePosts = await getEnterprisePosts();
  const taxonomyRoutes: MetadataRoute.Sitemap = [
    ...getCategories(enterprisePosts).map((item) => `/blog/category/${item.slug}`),
    ...getTags(enterprisePosts).map((item) => `/blog/tag/${item.slug}`),
    ...getAuthors(enterprisePosts).map((item) => `/author/${item.slug}`),
    '/search',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...sanityPostRoutes, ...taxonomyRoutes];
}
