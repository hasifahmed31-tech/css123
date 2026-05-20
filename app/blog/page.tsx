'use client';

import { useState, useMemo, useCallback } from 'react';
import { blogPosts, categories } from '@/lib/blog-data';
import BlogCard from '@/components/BlogCard';
import { Search } from 'lucide-react';

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchFocused, setSearchFocused] = useState(false);

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

  return (
    <>
      <section className="relative overflow-hidden bg-[#09090b] py-20 sm:py-24 pt-32 sm:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        <div className="container-custom relative">
          <div className="mx-auto max-w-2xl text-center" style={{ animation: 'fadeInUp 0.4s ease' }}>
            <span className="eyebrow">Our Blog</span>
            <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Latest <span className="gradient-text">Articles</span>
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
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-150 ${searchFocused ? 'text-[#a78bfa]' : 'text-gray-600'}`} />
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
              <span className="font-bold text-[#a78bfa]">{filtered.length}</span> {filtered.length === 1 ? 'article' : 'articles'}
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
              All ({blogPosts.length})
            </button>
            {categories.map((cat) => (
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
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
                <Search className="h-7 w-7 text-gray-600" />
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
