'use client'

import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight, Search, SearchX, Sparkles } from 'lucide-react'
import type { BlogListPost } from '@/lib/blog-features'
import BlogListCard from '@/components/BlogListCard'
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
  const showFeatured = activeCategory === 'all' && !search && featuredPosts.length > 0
  const featuredIds = useMemo(() => new Set(featuredPosts.map((post) => post.id)), [featuredPosts])
  const listingPosts = showFeatured ? filteredPosts.filter((post) => !featuredIds.has(post.id)) : filteredPosts
  const totalPages = Math.max(1, Math.ceil(listingPosts.length / pageSize))
  const visiblePosts = listingPosts.slice((page - 1) * pageSize, page * pageSize)

  const total = filteredPosts.length

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#17151f] py-16 text-white sm:py-24">
        <div className="pointer-events-none absolute -right-20 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#7955e8]/25 blur-3xl" />
        <div className="container-custom grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e3d9ff]"><span className="h-px w-8 bg-[#e3d9ff]" />Hasif · The journal</span>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Fresh thinking for <span className="text-[#e3d9ff]">what comes next.</span></h1>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="text-base leading-7 text-white/65 sm:text-lg">Independent reviews and practical ideas to help you make better decisions about the work you do online.</p>
            <p className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/45"><Sparkles className="h-4 w-4 text-[#e3d9ff]" /> {posts.length} thoughtful reads and counting</p>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-gray-200/80 bg-white/95 py-5 backdrop-blur-md dark:border-white/10 dark:bg-gray-950/95 lg:top-[76px]">
        <div className="container-custom">
          <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-150 ${searchFocused ? 'text-violet-700' : 'text-gray-400'}`} />
              <input
                type="text"
                value={search}
                onChange={(event) => { setSearch(event.target.value); setPage(1) }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search articles..."
                className="editorial-input w-full py-2.5 pl-10"
              />
            </div>
            <p className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              <span className="font-bold text-violet-800 dark:text-violet-300">{total}</span> {total === 1 ? 'article' : 'articles'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95 ${
                activeCategory === 'all'
                  ? 'bg-violet-800 text-white shadow-md shadow-violet-700/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-violet-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-violet-950/30'
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
                    ? 'bg-violet-800 text-white shadow-md shadow-violet-700/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-violet-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-violet-950/30'
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
          {showFeatured && (
            <div className="mb-12 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              {featuredPosts[0] && <Link href={`/blog/${featuredPosts[0].slug}`} prefetch className="group relative min-h-[360px] overflow-hidden rounded-3xl bg-gray-900 sm:min-h-[480px]">
                {featuredPosts[0].image && <Image src={featuredPosts[0].image} alt={featuredPosts[0].title} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
                  <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">Editor&apos;s pick · {featuredPosts[0].category}</span>
                  <h2 className="mt-4 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{featuredPosts[0].title}</h2>
                  <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-6 text-white/75 sm:text-base">{featuredPosts[0].excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Read the story <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                </div>
              </Link>}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {featuredPosts.slice(1).map((post, index) => <BlogListCard key={post.id} post={post} index={index + 1} />)}
              </div>
            </div>
          )}

          {total > 0 ? (
            <>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div><span className="eyebrow">{showFeatured ? 'Keep exploring' : 'The collection'}</span><h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-gray-950 dark:text-white">{showFeatured ? 'More to discover' : 'Articles'}</h2></div>
                <span className="pb-1 text-sm text-gray-500 dark:text-gray-400">{listingPosts.length} {listingPosts.length === 1 ? 'article' : 'articles'}</span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post, index) => (
                <BlogListCard key={post.id} post={post} index={index} />
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
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-950/30">
                <SearchX className="h-7 w-7 text-violet-800 dark:text-violet-200" />
              </div>
              <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">No articles found</h3>
              <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter.</p>
              <button
                type="button"
                onClick={() => { setSearch(''); handleCategorySelect('all'); setPage(1) }}
                className="rounded-xl bg-violet-800 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:scale-105 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-700/20 active:scale-95"
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
