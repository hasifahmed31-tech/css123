'use client'

import { useEffect, useMemo, useState } from 'react'
import { Bookmark, Heart, Eye } from 'lucide-react'

export default function BlogEngagement({ slug }: { slug: string }) {
  const keys = useMemo(() => ({
    views: `hasif:views:${slug}`,
    liked: `hasif:liked:${slug}`,
    bookmarked: `hasif:bookmarked:${slug}`,
  }), [slug])
  const [views, setViews] = useState(0)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const nextViews = Number(localStorage.getItem(keys.views) || '0') + 1
    localStorage.setItem(keys.views, String(nextViews))
    setViews(nextViews)
    setLiked(localStorage.getItem(keys.liked) === '1')
    setBookmarked(localStorage.getItem(keys.bookmarked) === '1')
  }, [keys])

  const toggleLiked = () => {
    const next = !liked
    setLiked(next)
    localStorage.setItem(keys.liked, next ? '1' : '0')
  }

  const toggleBookmarked = () => {
    const next = !bookmarked
    setBookmarked(next)
    localStorage.setItem(keys.bookmarked, next ? '1' : '0')
  }

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-600 dark:bg-white/10 dark:text-gray-300">
          <Eye className="h-4 w-4" />
          {views} views
        </span>
        <button
          type="button"
          onClick={toggleLiked}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${liked ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'}`}
        >
          <Heart className="h-4 w-4" />
          {liked ? 'Liked' : 'Like'}
        </button>
        <button
          type="button"
          onClick={toggleBookmarked}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${bookmarked ? 'bg-[#6d28d9] text-white' : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'}`}
        >
          <Bookmark className="h-4 w-4" />
          {bookmarked ? 'Saved' : 'Save'}
        </button>
      </div>
    </section>
  )
}
