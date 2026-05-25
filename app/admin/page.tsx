'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { FileText, Plus, Eye, Clock, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const [postCount, setPostCount] = useState(0);
  const [recentPosts, setRecentPosts] = useState<{ id: string; title: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) {
        setRecentPosts(data);
        setPostCount(data.length);
      }

      const { count } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true });
      if (count !== null) setPostCount(count);

      setLoading(false);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="p-5">
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-5">Dashboard</h1>

      {/* At a Glance + Quick Draft row */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* At a Glance */}
        <div className="rounded border border-[#c3c4c7] bg-white">
          <h2 className="border-b border-[#c3c4c7] px-4 py-2 text-sm font-semibold text-[#1d2327]">
            At a Glance
          </h2>
          <div className="p-4">
            {loading ? (
              <p className="text-sm text-[#646970]">Loading...</p>
            ) : (
              <div className="flex flex-wrap gap-6">
                <Link
                  href="/admin/posts"
                  className="flex items-center gap-2 text-sm text-[#2271b1] hover:text-[#135e96]"
                >
                  <FileText className="h-4 w-4" />
                  <span className="font-semibold">{postCount}</span> Posts
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Draft */}
        <div className="rounded border border-[#c3c4c7] bg-white">
          <h2 className="border-b border-[#c3c4c7] px-4 py-2 text-sm font-semibold text-[#1d2327]">
            Quick Actions
          </h2>
          <div className="p-4 space-y-3">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 rounded bg-[#2271b1] px-4 py-2 text-sm font-medium text-white hover:bg-[#135e96] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Write a New Post
            </Link>
            <Link
              href="/admin/posts"
              className="flex items-center gap-2 rounded border border-[#c3c4c7] bg-white px-4 py-2 text-sm font-medium text-[#2271b1] hover:bg-[#f0f0f1] transition-colors"
            >
              <Eye className="h-4 w-4" />
              Manage All Posts
            </Link>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <div className="rounded border border-[#c3c4c7] bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#2271b1]/10">
              <FileText className="h-5 w-5 text-[#2271b1]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1d2327]">{loading ? '—' : postCount}</p>
              <p className="text-xs text-[#646970]">Total Posts</p>
            </div>
          </div>
        </div>
        <div className="rounded border border-[#c3c4c7] bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#00a32a]/10">
              <BarChart3 className="h-5 w-5 text-[#00a32a]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1d2327]">{loading ? '—' : postCount}</p>
              <p className="text-xs text-[#646970]">Published</p>
            </div>
          </div>
        </div>
        <div className="rounded border border-[#c3c4c7] bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#dba617]/10">
              <Clock className="h-5 w-5 text-[#dba617]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1d2327]">0</p>
              <p className="text-xs text-[#646970]">Drafts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mt-5 rounded border border-[#c3c4c7] bg-white">
        <h2 className="border-b border-[#c3c4c7] px-4 py-2 text-sm font-semibold text-[#1d2327]">
          Recent Posts
        </h2>
        <div>
          {loading ? (
            <p className="p-4 text-sm text-[#646970]">Loading...</p>
          ) : recentPosts.length === 0 ? (
            <p className="p-4 text-sm text-[#646970]">
              No posts yet.{' '}
              <Link href="/admin/posts/new" className="text-[#2271b1] hover:underline">
                Create your first post
              </Link>
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#c3c4c7] text-left text-[#646970]">
                  <th className="px-4 py-2 font-medium">Title</th>
                  <th className="hidden px-4 py-2 font-medium sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.id} className="border-b border-[#f0f0f1] hover:bg-[#f6f7f7]">
                    <td className="px-4 py-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="font-medium text-[#2271b1] hover:text-[#135e96]"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="hidden px-4 py-2 text-[#646970] sm:table-cell">
                      {formatDate(post.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
