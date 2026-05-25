'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import type { CmsPost } from '@/lib/types';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Search, Loader2, Trash2 } from 'lucide-react';

export default function AllPostsPage() {
  const [posts, setPosts] = useState<CmsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const supabase = createClient();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load posts');
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post? This action cannot be undone.')) return;
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Post deleted');
      fetchPosts();
    } else {
      toast.error('Failed to delete');
    }
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} post(s)? This action cannot be undone.`)) return;
    setDeleting(true);
    const ids = Array.from(selected);
    await Promise.all(ids.map((id) => fetch(`/api/posts/${id}`, { method: 'DELETE' })));
    toast.success(`${ids.length} post(s) deleted`);
    setSelected(new Set());
    fetchPosts();
    setDeleting(false);
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((p) => p.id)));
    }
  };

  const filtered = posts.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="p-5">
      {/* Page header */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-[23px] font-normal text-[#1d2327]">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded bg-[#2271b1] px-3 py-1 text-xs font-medium text-white hover:bg-[#135e96] transition-colors"
        >
          Add New
        </Link>
      </div>

      {/* Toolbar */}
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c8f94]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full rounded border border-[#8c8f94] bg-white py-1.5 pl-9 pr-3 text-sm text-[#1d2327] placeholder-[#8c8f94] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
          />
        </div>
        {selected.size > 0 && (
          <button
            onClick={handleBulkDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 rounded border border-[#d63638] bg-white px-3 py-1.5 text-xs font-medium text-[#d63638] hover:bg-[#d63638] hover:text-white transition-colors disabled:opacity-50"
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Delete ({selected.size})
          </button>
        )}
        <span className="text-sm text-[#646970]">
          {filtered.length} item{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Posts table */}
      <div className="overflow-x-auto rounded border border-[#c3c4c7] bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-[#2271b1]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[#646970]">
              {search ? 'No posts match your search.' : 'No posts found.'}
            </p>
            {!search && (
              <Link
                href="/admin/posts/new"
                className="mt-3 inline-block rounded bg-[#2271b1] px-4 py-2 text-sm font-medium text-white hover:bg-[#135e96]"
              >
                Create your first post
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7] text-left text-[#1d2327]">
                <th className="w-8 px-2 py-2">
                  <input
                    type="checkbox"
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="rounded border-[#8c8f94]"
                  />
                </th>
                <th className="px-3 py-2 font-semibold">Title</th>
                <th className="hidden px-3 py-2 font-semibold md:table-cell">Date</th>
                <th className="w-24 px-3 py-2 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr
                  key={post.id}
                  className={`border-b border-[#f0f0f1] transition-colors ${
                    selected.has(post.id) ? 'bg-[#f0f6fc]' : 'hover:bg-[#f6f7f7]'
                  }`}
                >
                  <td className="px-2 py-2">
                    <input
                      type="checkbox"
                      checked={selected.has(post.id)}
                      onChange={() => toggleSelect(post.id)}
                      className="rounded border-[#8c8f94]"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="font-semibold text-[#2271b1] hover:text-[#135e96] hover:underline"
                    >
                      {post.title}
                    </Link>
                    <div className="mt-0.5 text-xs text-[#646970] truncate max-w-sm">
                      {post.content.slice(0, 100)}
                      {post.content.length > 100 ? '...' : ''}
                    </div>
                    {/* Row actions */}
                    <div className="mt-1 flex gap-2 text-xs">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-[#2271b1] hover:text-[#135e96]"
                      >
                        Edit
                      </Link>
                      <span className="text-[#c3c4c7]">|</span>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-[#d63638] hover:text-[#a02c2d]"
                      >
                        Trash
                      </button>
                      <span className="text-[#c3c4c7]">|</span>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-[#2271b1] hover:text-[#135e96]"
                        target="_blank"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                  <td className="hidden px-3 py-2 text-[#646970] md:table-cell whitespace-nowrap">
                    {formatDate(post.created_at)}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="rounded border border-[#c3c4c7] bg-white px-2.5 py-1 text-xs font-medium text-[#2271b1] hover:bg-[#f0f0f1] transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
