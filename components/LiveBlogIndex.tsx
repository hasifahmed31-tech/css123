'use client';

import { useEffect, useMemo, useState } from 'react';
import BlogIndexClient from '@/components/BlogIndexClient';
import type { BlogListPost } from '@/lib/blog-features';

type Props = {
  initialPosts: BlogListPost[];
  initialSearch?: string;
  searchPage?: boolean;
};

function categoriesFor(posts: BlogListPost[]) {
  const counts = new Map<string, number>();
  posts.forEach((post) => counts.set(post.category, (counts.get(post.category) || 0) + 1));
  return [
    { name: 'All', slug: 'all', count: posts.length },
    ...[...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'),
      count,
    })),
  ];
}

export default function LiveBlogIndex({ initialPosts, initialSearch = '', searchPage = false }: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const categories = useMemo(() => categoriesFor(posts), [posts]);

  useEffect(() => {
    const controller = new AbortController();
    const endpoint = searchPage && initialSearch
      ? `/api/search?q=${encodeURIComponent(initialSearch)}`
      : '/api/homepage-posts';

    fetch(endpoint, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { posts?: BlogListPost[]; hits?: BlogListPost[] } | null) => {
        const freshPosts = searchPage && initialSearch ? data?.hits : data?.posts;
        if (freshPosts?.length) setPosts(freshPosts);
      })
      .catch(() => {
        // The statically rendered article list remains available offline.
      });

    return () => controller.abort();
  }, [initialSearch, searchPage]);

  return <BlogIndexClient posts={posts} categories={categories} initialSearch={initialSearch} searchPage={searchPage} />;
}
