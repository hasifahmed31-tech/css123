'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { FileText, Plus, Eye, Clock, BarChart3, FileStack, Image as ImageIcon, Loader2 } from 'lucide-react';
import type { CmsPost } from '@/lib/types';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<CmsPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const [postsRes, pagesRes, mediaRes] = await Promise.all([
        supabase.from('posts').select('id, title, slug, published, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('pages').select('*', { count: 'exact', head: true }),
        supabase.from('media').select('*', { count: 'exact', head: true }),
      ]);

      if (!postsRes.error && postsRes.data) {
        setPosts(postsRes.data as CmsPost[]);
      }

      const { count: total } = await supabase.from('posts').select('*', { count: 'exact', head: true });
      const { count: pub } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('published', true);

      if (total !== null) { setTotalPosts(total); setPublishedCount(pub ?? 0); setDraftCount(total - (pub ?? 0)); }
      if (pagesRes.count !== null) setPageCount(pagesRes.count ?? 0);
      if (mediaRes.count !== null) setMediaCount(mediaRes.count ?? 0);
      setLoading(false);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[--cms-text] mb-6">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: 'Total Posts', value: totalPosts, icon: FileText, color: '#2271b1', href: '/admin/posts' },
          { label: 'Published', value: publishedCount, icon: BarChart3, color: '#00a32a', href: '/admin/posts' },
          { label: 'Drafts', value: draftCount, icon: Clock, color: '#dba617', href: '/admin/posts' },
          { label: 'Pages', value: pageCount, icon: FileStack, color: '#8b5cf6', href: '/admin/pages' },
          { label: 'Media', value: mediaCount, icon: ImageIcon, color: '#ec4899', href: '/admin/media' },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href} className="rounded-xl border border-[--cms-border] bg-[--cms-card] p-4 hover:border-[--cms-accent] transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${stat.color}15` }}>
                <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[--cms-text]">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : stat.value}</p>
                <p className="text-xs text-[--cms-muted]">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-xl border border-[--cms-border] bg-[--cms-card]">
          <h2 className="border-b border-[--cms-border] px-5 py-3 text-sm font-semibold text-[--cms-text]">Quick Actions</h2>
          <div className="p-5 grid grid-cols-2 gap-3">
            <Link href="/admin/posts/new" className="flex items-center gap-2 rounded-lg bg-[--cms-accent] px-4 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4" /> New Post
            </Link>
            <Link href="/admin/posts" className="flex items-center gap-2 rounded-lg border border-[--cms-border] bg-[--cms-card] px-4 py-3 text-sm font-medium text-[--cms-text] hover:bg-[--cms-hover] transition-colors">
              <Eye className="h-4 w-4" /> All Posts
            </Link>
            <Link href="/admin/pages" className="flex items-center gap-2 rounded-lg border border-[--cms-border] bg-[--cms-card] px-4 py-3 text-sm font-medium text-[--cms-text] hover:bg-[--cms-hover] transition-colors">
              <FileStack className="h-4 w-4" /> Pages
            </Link>
            <Link href="/admin/media" className="flex items-center gap-2 rounded-lg border border-[--cms-border] bg-[--cms-card] px-4 py-3 text-sm font-medium text-[--cms-text] hover:bg-[--cms-hover] transition-colors">
              <ImageIcon className="h-4 w-4" /> Media
            </Link>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="rounded-xl border border-[--cms-border] bg-[--cms-card]">
          <h2 className="border-b border-[--cms-border] px-5 py-3 text-sm font-semibold text-[--cms-text]">Recent Posts</h2>
          <div>
            {loading ? (
              <div className="p-5 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 animate-pulse rounded bg-[--cms-skeleton]" />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <p className="p-5 text-sm text-[--cms-muted]">
                No posts yet.{' '}
                <Link href="/admin/posts/new" className="text-[--cms-accent] hover:underline">Create your first post</Link>
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[--cms-border] text-left text-[--cms-muted]">
                    <th className="px-5 py-2 font-medium">Title</th>
                    <th className="hidden px-5 py-2 font-medium sm:table-cell">Status</th>
                    <th className="hidden px-5 py-2 font-medium sm:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-[--cms-border] last:border-0 hover:bg-[--cms-hover]">
                      <td className="px-5 py-2.5">
                        <Link href={`/admin/posts/${post.id}/edit`} className="font-medium text-[--cms-accent] hover:underline">
                          {post.title}
                        </Link>
                      </td>
                      <td className="hidden px-5 py-2.5 sm:table-cell">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          post.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="hidden px-5 py-2.5 text-[--cms-muted] sm:table-cell">{formatDate(post.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
