'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, SearchX } from 'lucide-react';
import { blogPosts, categories } from '@/lib/blog-data';
import BlogCard from '@/components/BlogCard';

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
      <section className="relative bg-gradient-to-br from-indigo-600 to-indigo-700 py-16 sm:py-20 dark:from-indigo-900 dark:to-indigo-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container-custom relative">
          <div className="mx-auto max-w-2xl text-center" style={{ animation: 'fadeInUp 0.4s ease' }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white border border-white/10">
              Our Blog
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Articles</span>
            </h1>
            <p className="mt-3 text-white/70">
              Stay ahead with guides, reviews, and tutorials.
            </p>
          </div>
        </div>
      </section>

      <section className="py-5 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-24 lg:top-[104px] z-30 shadow-sm">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 dark:focus:border-indigo-600 transition-all duration-150"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{filtered.length}</span> {filtered.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95 ${
                activeCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
              }`}
            >
              All ({blogPosts.length})
            </button>
            {categories.filter((cat) => cat.slug !== 'all').map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95 ${
                  activeCategory === cat.slug
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No articles found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Try adjusting your search or filter.</p>
              <button
                type="button"
                onClick={() => { setSearch(''); handleCategorySelect('all'); }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500 transition-all duration-150 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-indigo-500/20"
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
