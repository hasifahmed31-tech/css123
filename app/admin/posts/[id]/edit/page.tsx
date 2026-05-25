'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2, Eye, FileText, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: Props) {
  const { id } = use(params);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        const post = await res.json();
        setTitle(post.title);
        setContent(post.content);
        setCreatedAt(post.created_at);
      } else {
        toast.error('Post not found');
        router.push('/admin/posts');
      }
      setLoading(false);
    }
    load();
  }, [id, router]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!content.trim()) {
      toast.error('Content is required');
      return;
    }

    setSaving(true);
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim(), content: content.trim() }),
    });

    if (res.ok) {
      toast.success('Post updated!');
    } else {
      const data = await res.json();
      toast.error(data.error || 'Failed to update');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm('Delete this post? This action cannot be undone.')) return;
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Post deleted');
      router.push('/admin/posts');
    } else {
      toast.error('Failed to delete');
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#2271b1]" />
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Link
          href="/admin/posts"
          className="flex items-center gap-1 text-sm text-[#2271b1] hover:text-[#135e96]"
        >
          <ArrowLeft className="h-4 w-4" />
          All Posts
        </Link>
        <h1 className="text-[23px] font-normal text-[#1d2327]">Edit Post</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        {/* Main editor area */}
        <div className="space-y-4">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here"
            className="w-full rounded border border-[#8c8f94] bg-white px-3 py-2.5 text-xl text-[#1d2327] placeholder-[#8c8f94] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
          />

          {/* Permalink */}
          <p className="text-xs text-[#646970]">
            Permalink:{' '}
            <Link href={`/blog/${id}`} className="text-[#2271b1] hover:underline" target="_blank">
              /blog/{id}
            </Link>
          </p>

          {/* Editor toolbar */}
          <div className="flex items-center gap-1 rounded-t border border-b-0 border-[#c3c4c7] bg-[#f6f7f7] px-2 py-1">
            <button
              onClick={() => setPreview(false)}
              className={`flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-colors ${
                !preview
                  ? 'bg-white text-[#1d2327] shadow-sm border border-[#c3c4c7]'
                  : 'text-[#646970] hover:text-[#1d2327]'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              Write
            </button>
            <button
              onClick={() => setPreview(true)}
              className={`flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-colors ${
                preview
                  ? 'bg-white text-[#1d2327] shadow-sm border border-[#c3c4c7]'
                  : 'text-[#646970] hover:text-[#1d2327]'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </button>
            <span className="ml-auto text-[11px] text-[#8c8f94]">Markdown supported</span>
          </div>

          {/* Content */}
          {preview ? (
            <div className="min-h-[400px] rounded-b border border-[#c3c4c7] bg-white p-4">
              <div className="prose prose-sm max-w-none prose-headings:text-[#1d2327] prose-p:text-[#3c434a] prose-a:text-[#2271b1] prose-strong:text-[#1d2327] prose-code:text-[#2271b1] prose-pre:bg-[#f6f7f7] prose-pre:border prose-pre:border-[#c3c4c7]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content || '*Nothing to preview...*'}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content here..."
              rows={20}
              className="w-full rounded-b border border-[#c3c4c7] bg-white px-3 py-3 font-mono text-sm text-[#1d2327] placeholder-[#8c8f94] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1] resize-y"
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish box */}
          <div className="rounded border border-[#c3c4c7] bg-white">
            <h3 className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-3 py-2 text-sm font-semibold text-[#1d2327]">
              Publish
            </h3>
            <div className="space-y-3 p-3">
              <div className="flex items-center gap-2 text-sm text-[#646970]">
                <span className="font-medium">Status:</span>
                <span className="text-[#00a32a] font-medium">Published</span>
              </div>
              {createdAt && (
                <div className="text-xs text-[#8c8f94]">
                  Published: {formatDate(createdAt)}
                </div>
              )}
              <hr className="border-[#c3c4c7]" />
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="flex w-full items-center justify-center gap-1.5 rounded bg-[#2271b1] px-3 py-2 text-sm font-medium text-white hover:bg-[#135e96] transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded border border-[#d63638]/30 bg-white">
            <h3 className="border-b border-[#d63638]/20 bg-[#fcf0f1] px-3 py-2 text-sm font-semibold text-[#d63638]">
              Danger Zone
            </h3>
            <div className="p-3">
              <button
                onClick={handleDelete}
                className="w-full rounded border border-[#d63638] bg-white px-3 py-2 text-sm font-medium text-[#d63638] hover:bg-[#d63638] hover:text-white transition-colors"
              >
                Move to Trash
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
