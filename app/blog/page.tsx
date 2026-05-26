'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { blogPosts, categories } from '@/lib/blog-data';
import BlogCard from '@/components/BlogCard';
import { Search, SearchX, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { CmsPost } from '@/lib/types';

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchFocused, setSearchFocused] = useState(false);
  const [cmsPosts, setCmsPosts] = useState<CmsPost[]>([]);
  const [cmsLoading, setCmsLoading] = useState(true);

  useEffect(() => {
    async function fetchCmsPosts() {
      try {
        const res = await fetch('/api/posts?published=true');
        if (res.ok) {
          const json = await res.json();
          setCmsPosts(Array.isArray(json) ? json : json.data || []);
        }
      } catch {
        // Supabase not configured yet — silently ignore
      }
      setCmsLoading(false);
    }
    fetchCmsPosts();
  }, []);

  const handleCategorySelect = useCallback((slug: string) => {
    setActiveCategory(slug);
  }, []);

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const catMatch = activeCategory === 'all' || post.category.toLowerCase().replace(/\s+/g, '-') === activeCategory;
      const searchMatch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const filteredCms = useMemo(() => {
    if (activeCategory !== 'all') return [];
    if (!search) return cmsPosts;
    return cmsPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase())
    );
  }, [cmsPosts, search, activeCategory]);

  const totalCount = filtered.length + filteredCms.length;

  return (
    <>
      <section className="relative overflow-hidden bg-[#09090b] py-20 sm:py-24 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        <div className="container-custom relative">
          <div className="mx-auto max-w-2xl text-center" style={{ animation: 'fadeInUp 0.4s ease' }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white border border-white/10">
              Our Blog
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Articles</span>
            </h1>
            <p className="mt-4 text-gray-400">
              Stay ahead with guides, reviews, and tutorials.
            </p>
          </div>
        </div>
      </section>

      <section className="py-5 border-b border-white/[0.06] bg-[#09090b]/90 backdrop-blur-sm sticky top-[72px] lg:top-[88px] z-30 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="relative w-full sm:w-64">
              <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-150 ${searchFocused ? 'text-indigo-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search articles..."
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 transition-all duration-150 focus:border-[#a78bfa]/30 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20"
              />
            </div>
            <p className="text-sm text-gray-500 whitespace-nowrap">
              <span className="font-bold text-[#a78bfa]">{totalCount}</span> {totalCount === 1 ? 'article' : 'articles'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95 ${
                activeCategory === 'all'
                  ? 'bg-[#7c3aed] text-white shadow-md shadow-[#7c3aed]/20'
                  : 'bg-white/[0.04] text-gray-400 border border-white/[0.06] hover:bg-white/[0.06]'
              }`}
            >
              All ({blogPosts.length + cmsPosts.length})
            </button>
            {categories.filter((cat) => cat.slug !== 'all').map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95 ${
                  activeCategory === cat.slug
                    ? 'bg-[#7c3aed] text-white shadow-md shadow-[#7c3aed]/20'
                    : 'bg-white/[0.04] text-gray-400 border border-white/[0.06] hover:bg-white/[0.06]'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CMS Posts Section */}
      {filteredCms.length > 0 && (
        <section className="py-10 bg-[#09090b] border-b border-white/[0.06]">
          <div className="container-custom">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c3aed]/10">
                <FileText className="h-4 w-4 text-[#a78bfa]" />
              </div>
              <h2 className="text-lg font-bold text-white">CMS Posts</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCms.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug || post.id}`}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-200 hover:border-[#a78bfa]/20 hover:bg-white/[0.04] hover:shadow-lg"
                >
                  {post.featured_image && (
                    <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
                      <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-[#7c3aed]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c4b5fd] border border-[#a78bfa]/20">
                      CMS
                    </span>
                    <span className="text-xs text-gray-600">
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#a78bfa] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                    {post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, '').slice(0, 150) : '')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {cmsLoading && (
        <section className="py-6 bg-[#09090b]">
          <div className="container-custom flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading CMS posts...
          </div>
        </section>
      )}

      <section className="py-10 bg-[#09090b]">
        <div className="container-custom">
          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 mb-4">
                <SearchX className="h-7 w-7 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">No articles found</h3>
              <p className="text-sm text-gray-500 mb-5">Try adjusting your search or filter.</p>
              <button
                type="button"
                onClick={() => { setSearch(''); handleCategorySelect('all'); }}
                className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-sm font-semibold text-white hover:bg-[#6d28d9] transition-all duration-150 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-[#7c3aed]/20"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
