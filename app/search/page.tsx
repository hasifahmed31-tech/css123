import type { Metadata } from 'next';
import LiveBlogIndex from '@/components/LiveBlogIndex';
import { blogPosts } from '@/lib/blog-data';
import { staticToListPost } from '@/lib/blog-features';

export const metadata: Metadata = {
  title: 'Search Articles',
  description: 'Search Hasif articles by topic, tag, author, and full article text.',
  alternates: { canonical: '/search' },
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams;
  const query = q.trim().toLowerCase();
  const allPosts = blogPosts.map(staticToListPost);
  const initialPosts = query
    ? allPosts.filter((post) => [post.title, post.excerpt, post.category, post.authorName, post.tags.join(' '), post.content]
      .join(' ').replace(/<[^>]*>/g, ' ').toLowerCase().includes(query))
    : allPosts;

  return <LiveBlogIndex initialPosts={initialPosts} initialSearch={q} searchPage />;
}
