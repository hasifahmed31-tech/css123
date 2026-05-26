'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Search, Trash2, Edit, Eye, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/admin/ConfirmModal';
import type { CmsPost } from '@/lib/types';

const PER_PAGE = 10;

export default function PostsListPage() {
  const [posts, setPosts] = useState<CmsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; ids: string[] }>({ open: false, ids: [] });
  const supabase = createClient();

  const loadPosts = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * PER_PAGE, page * PER_PAGE - 1);

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }
    if (filter === 'published') query = query.eq('published', true);
    if (filter === 'draft') query = query.eq('published', false);

    const { data, count, error } = await query;
    if (!error && data) {
      setPosts(data as CmsPost[]);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, [supabase, page, search, filter]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const totalPages = Math.ceil(total / PER_PAGE);

  const handleDelete = async (ids: string[]) => {
    for (const id of ids) {
      await supabase.from('posts').delete().eq('id', id);
    }
    setSelected(new Set());
    setDeleteModal({ open: false, ids: [] });
    toast.success(`${ids.length} post${ids.length > 1 ? 's' : ''} deleted`);
    loadPosts();
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === posts.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(posts.map((p) => p.id)));
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-[--cms-text]">Posts</h1>
        <Link href="/admin/posts/new" className="flex items-center gap-2 rounded-lg bg-[--cms-accent] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Add New
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {(['all', 'published', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(1); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f ? 'bg-[--cms-accent] text-white' : 'text-[--cms-muted] hover:bg-[--cms-hover]'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <span className="text-xs text-[--cms-muted] ml-2">{total} total</span>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[--cms-muted]" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search posts..."
            className="w-full rounded-lg border border-[--cms-border] bg-[--cms-input-bg] py-2 pl-10 pr-4 text-sm text-[--cms-text] placeholder:text-[--cms-muted] focus:border-[--cms-accent] focus:outline-none focus:ring-1 focus:ring-[--cms-accent]"
          />
        </div>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-[--cms-border] bg-[--cms-card] px-4 py-2">
          <span className="text-sm text-[--cms-text]">{selected.size} selected</span>
          <button
            onClick={() => setDeleteModal({ open: true, ids: Array.from(selected) })}
            className="flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      )}

      {/* Posts table */}
      <div className="rounded-xl border border-[--cms-border] bg-[--cms-card] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-[--cms-muted]" />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[--cms-muted] mb-3">No posts found</p>
            <Link href="/admin/posts/new" className="text-[--cms-accent] hover:underline text-sm">Create your first post</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[--cms-border] bg-[--cms-hover] text-left">
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" checked={selected.size === posts.length} onChange={toggleAll} className="rounded" />
                </th>
                <th className="px-4 py-3 font-medium text-[--cms-muted]">Title</th>
                <th className="hidden px-4 py-3 font-medium text-[--cms-muted] md:table-cell">Status</th>
                <th className="hidden px-4 py-3 font-medium text-[--cms-muted] sm:table-cell">Date</th>
                <th className="w-24 px-4 py-3 font-medium text-[--cms-muted] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-[--cms-border] last:border-0 hover:bg-[--cms-hover] transition-colors">
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.has(post.id)} onChange={() => toggleSelect(post.id)} className="rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/posts/${post.id}/edit`} className="font-medium text-[--cms-accent] hover:underline">
                      {post.title}
                    </Link>
                    {post.slug && <p className="text-xs text-[--cms-muted] mt-0.5">/{post.slug}</p>}
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-[--cms-muted] sm:table-cell">{formatDate(post.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/posts/${post.id}/edit`} className="rounded p-1.5 text-[--cms-muted] hover:bg-[--cms-hover] hover:text-[--cms-accent]" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Link>
                      {post.published && (
                        <Link href={`/blog/${post.slug}`} className="rounded p-1.5 text-[--cms-muted] hover:bg-[--cms-hover] hover:text-[--cms-accent]" title="View" target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      )}
                      <button
                        onClick={() => setDeleteModal({ open: true, ids: [post.id] })}
                        className="rounded p-1.5 text-[--cms-muted] hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-[--cms-muted]">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="rounded-lg border border-[--cms-border] p-2 text-[--cms-muted] hover:bg-[--cms-hover] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-[--cms-border] p-2 text-[--cms-muted] hover:bg-[--cms-hover] disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <ConfirmModal
        open={deleteModal.open}
        title="Delete Post"
        message={`Are you sure you want to delete ${deleteModal.ids.length} post${deleteModal.ids.length > 1 ? 's' : ''}? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => handleDelete(deleteModal.ids)}
        onCancel={() => setDeleteModal({ open: false, ids: [] })}
      />
    </div>
  );
}
