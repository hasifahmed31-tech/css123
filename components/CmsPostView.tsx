'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { CmsPost } from '@/lib/types';
import ReadingProgress from '@/components/ReadingProgress';
import ShareButtons from '@/components/ShareButtons';

function sanitizeHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

export default function CmsPostView({ post }: { post: CmsPost }) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <>
      <ReadingProgress />

      <article className="bg-[#09090b] pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="container-custom max-w-3xl">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#a78bfa] transition-colors duration-150">Home</Link>
            <span className="text-gray-700" aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-[#a78bfa] transition-colors duration-150">Blog</Link>
            <span className="text-gray-700" aria-hidden="true">/</span>
            <span className="text-gray-400 truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#7c3aed]/10 text-[#c4b5fd] border border-[#a78bfa]/20">
                {post.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 text-lg text-gray-400 leading-relaxed">{post.excerpt}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-500">
              <span className="inline-flex items-center gap-2">
                <span className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/10 shadow-md">
                  <Image src="/hasif-logo-new.png" alt="Hasif" fill sizes="28px" className="object-cover" />
                </span>
                Hasif
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-700" aria-hidden="true" />
              <span>{formatDate(post.created_at)}</span>
              {post.updated_at && post.updated_at !== post.created_at && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-700" aria-hidden="true" />
                  <span>Updated {formatDate(post.updated_at)}</span>
                </>
              )}
            </div>
          </div>

          {post.featured_image && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-xl">
              <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div
            className="blog-content prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-extrabold prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-[#a78bfa] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-[#c4b5fd] prose-pre:bg-white/[0.04] prose-pre:border prose-pre:border-white/[0.06] prose-pre:rounded-xl prose-blockquote:border-[#7c3aed]/40 prose-blockquote:text-gray-400 prose-li:text-gray-300 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
          />

          <div className="mt-10 pt-8 border-t border-white/[0.06]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#a78bfa]/20 shadow-lg">
                  <Image src="/hasif-logo-new.png" alt="Hasif" fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Hasif</div>
                  <div className="text-xs text-gray-500">Founder, Hasif Online</div>
                </div>
              </div>
              <ShareButtons />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
