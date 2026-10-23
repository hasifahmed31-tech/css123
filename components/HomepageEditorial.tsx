'use client';

import { useEffect, useState } from 'react';
import FeaturedInsights from '@/components/FeaturedInsights';
import LatestPosts from '@/components/LatestPosts';
import type { BlogListPost } from '@/lib/blog-features';

export default function HomepageEditorial({ initialPosts }: { initialPosts: BlogListPost[] }) {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    const controller = new AbortController();
    const refreshPosts = () => {
      fetch('/api/homepage-posts', { signal: controller.signal })
        .then((response) => (response.ok ? response.json() : null))
        .then((data: { posts?: BlogListPost[] } | null) => {
          if (data?.posts?.length) setPosts(data.posts);
        })
        .catch(() => {
          // Keep the immediately rendered articles when CMS/network is offline.
        });
    };

    // Give the hero image and first viewport the network and main thread first.
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idleId = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(refreshPosts, { timeout: 1200 })
      : undefined;
    const timeoutId = idleId === undefined ? window.setTimeout(refreshPosts, 700) : undefined;

    return () => {
      controller.abort();
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <FeaturedInsights posts={posts.filter((post) => post.featured).slice(0, 4)} />
      <LatestPosts posts={posts.slice(0, 6)} />
    </>
  );
}
