import type { MetadataRoute } from 'next';
import { blogPosts, getPostIsoDate } from '@/lib/blog-data';

const siteUrl = 'https://hasif.online';

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [...staticRoutes, ...postRoutes];
}
