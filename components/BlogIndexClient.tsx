'use client'

import { useCallback, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Flame, Search, SearchX, Sparkles } from 'lucide-react'
import type { BlogListPost } from '@/lib/blog-features'
import NotionBlogCard from '@/components/NotionBlogCard'
import { slugify } from '@/lib/slug'

interface Props {
  posts: BlogListPost[]
  categories: Array<{ name: string; slug: string; count: number }>
  initialSearch?: string
}

const pageSize = 9

export default function BlogIndexClient({ posts, categories, initialSearch = '' }: Props) {
  const [search, setSearch] = useState(initialSearch)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchFocused, setSearchFocused] = useState(false)
  const [page, setPage] = useState(1)

  const handleCategorySelect = useCallback((slug: string) => {
    setActiveCategory(slug)
    setPage(1)
  }, [])

  const filteredPosts = useMemo(() => {
    const query = search.toLowerCase()
    return posts.filter((post) => {
      const catMatch = activeCategory === 'all' || slugify(post.category) === activeCategory
      const searchMatch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
      return catMatch && searchMatch
    })
  }, [activeCategory, posts, search])

  const featuredPosts = useMemo(() => posts.filter((post) => post.featured).slice(0, 3), [posts])
  const trendingPosts = useMemo(() => posts.filter((post) => post.trending).slice(0, 3), [posts])
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize))
  const visiblePosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize)

  const total = filteredPosts.length

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-700 py-16 dark:from-indigo-900 dark:to-indigo-950 sm:py-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute right-0 top-0 h-80 w-80 -translate-y-1/2 translate-x-1/3 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/2 rounded-full bg-white/5" />
        </div>

        <div className="container-custom relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-medium text-white">
              Our Blog
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              Latest <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Articles</span>
            </h1>
            <p className="mt-3 text-white/70">
              Stay ahead with guides, reviews, and tutorials.
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-24 z-30 border-b border-gray-100 bg-white/80 py-5 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80 lg:top-[104px]">
        <div className="container-custom">
          <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-150 ${searchFocused ? 'text-indigo-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search articles..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm transition-all duration-150 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-indigo-600"
              />
            </div>
            <p className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{total}</span> {total === 1 ? 'article' : 'articles'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95 ${
                activeCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-indigo-900/30'
              }`}
            >
              All ({posts.length})
            </button>
            {categories.filter((cat) => cat.slug !== 'all').map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95 ${
                  activeCategory === cat.slug
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-indigo-900/30'
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
          {activeCategory === 'all' && !search && (featuredPosts.length > 0 || trendingPosts.length > 0) && (
            <div className="mb-10 grid gap-5 lg:grid-cols-2">
              {featuredPosts.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                    <Sparkles className="h-4 w-4 text-[#7c3aed]" />
                    Featured Posts
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    {featuredPosts.map((post, index) => <NotionBlogCard key={post.id} post={post} index={index} />)}
                  </div>
                </div>
              )}
              {trendingPosts.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                    <Flame className="h-4 w-4 text-rose-500" />
                    Trending Now
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    {trendingPosts.map((post, index) => <NotionBlogCard key={post.id} post={post} index={index + featuredPosts.length} />)}
                  </div>
                </div>
              )}
            </div>
          )}

          {total > 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post, index) => (
                <NotionBlogCard key={post.id} post={post} index={index} />
              ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-gray-300"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    disabled={page === totalPages}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-gray-300"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/30">
                <SearchX className="h-7 w-7 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">No articles found</h3>
              <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter.</p>
              <button
                type="button"
                onClick={() => { setSearch(''); handleCategorySelect('all'); setPage(1) }}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:scale-105 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
