'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2, Eye, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!content.trim()) {
      toast.error('Content is required');
      return;
    }

    setSaving(true);
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim(), content: content.trim() }),
    });

    if (res.ok) {
      toast.success('Post published!');
      router.push('/admin/posts');
    } else {
      const data = await res.json();
      toast.error(data.error || 'Failed to publish');
    }
    setSaving(false);
  };

  return (
    <div className="p-5">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-[23px] font-normal text-[#1d2327]">Add New Post</h1>
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
                  {content || '*Nothing to preview yet...*'}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here... (Markdown supported)"
              rows={20}
              className="w-full rounded-b border border-[#c3c4c7] bg-white px-3 py-3 font-mono text-sm text-[#1d2327] placeholder-[#8c8f94] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1] resize-y"
            />
          )}
        </div>

        {/* Sidebar publish box */}
        <div className="space-y-4">
          <div className="rounded border border-[#c3c4c7] bg-white">
            <h3 className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-3 py-2 text-sm font-semibold text-[#1d2327]">
              Publish
            </h3>
            <div className="space-y-3 p-3">
              <div className="flex items-center gap-2 text-sm text-[#646970]">
                <span className="font-medium">Status:</span>
                <span>Draft</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#646970]">
                <span className="font-medium">Visibility:</span>
                <span>Public</span>
              </div>
              <hr className="border-[#c3c4c7]" />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push('/admin/posts')}
                  className="flex-1 rounded border border-[#c3c4c7] bg-white px-3 py-2 text-sm font-medium text-[#d63638] hover:bg-[#f6f7f7] transition-colors"
                >
                  Discard
                </button>
                <button
                  onClick={handlePublish}
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded bg-[#2271b1] px-3 py-2 text-sm font-medium text-white hover:bg-[#135e96] transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Publish'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Format help */}
          <div className="rounded border border-[#c3c4c7] bg-white">
            <h3 className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-3 py-2 text-sm font-semibold text-[#1d2327]">
              Markdown Guide
            </h3>
            <div className="p-3 text-xs text-[#646970] space-y-1.5 font-mono">
              <p><span className="text-[#1d2327]"># Heading 1</span></p>
              <p><span className="text-[#1d2327]">## Heading 2</span></p>
              <p><span className="text-[#1d2327]">**bold**</span> &rarr; <strong>bold</strong></p>
              <p><span className="text-[#1d2327]">*italic*</span> &rarr; <em>italic</em></p>
              <p><span className="text-[#1d2327]">[link](url)</span></p>
              <p><span className="text-[#1d2327]">```code```</span></p>
              <p><span className="text-[#1d2327]">- list item</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
