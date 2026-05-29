'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Bookmark, Heart, MessageCircle, Send, Eye } from 'lucide-react'

interface Comment {
  id: string
  name: string
  body: string
  createdAt: string
}

export default function BlogEngagement({ slug }: { slug: string }) {
  const keys = useMemo(() => ({
    views: `hasif:views:${slug}`,
    liked: `hasif:liked:${slug}`,
    bookmarked: `hasif:bookmarked:${slug}`,
    comments: `hasif:comments:${slug}`,
  }), [slug])
  const [views, setViews] = useState(0)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    const nextViews = Number(localStorage.getItem(keys.views) || '0') + 1
    localStorage.setItem(keys.views, String(nextViews))
    setViews(nextViews)
    setLiked(localStorage.getItem(keys.liked) === '1')
    setBookmarked(localStorage.getItem(keys.bookmarked) === '1')
    try {
      setComments(JSON.parse(localStorage.getItem(keys.comments) || '[]') as Comment[])
    } catch {
      setComments([])
    }
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

  const addComment = (event: FormEvent) => {
    event.preventDefault()
    const trimmedBody = body.trim()
    if (!trimmedBody) return
    const nextComments = [
      ...comments,
      {
        id: `${Date.now()}`,
        name: name.trim() || 'Reader',
        body: trimmedBody,
        createdAt: new Date().toISOString(),
      },
    ]
    setComments(nextComments)
    localStorage.setItem(keys.comments, JSON.stringify(nextComments))
    setName('')
    setBody('')
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
        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-600 dark:bg-white/10 dark:text-gray-300">
          <MessageCircle className="h-4 w-4" />
          {comments.length} comments
        </span>
      </div>

      <form onSubmit={addComment} className="mt-5 grid gap-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#7c3aed] dark:border-white/10 dark:bg-gray-950"
        />
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Add a comment"
          rows={3}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#7c3aed] dark:border-white/10 dark:bg-gray-950"
        />
        <button type="submit" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#6d28d9] px-5 py-2.5 text-sm font-bold text-white">
          <Send className="h-4 w-4" />
          Post comment
        </button>
      </form>

      {comments.length > 0 && (
        <div className="mt-5 grid gap-3">
          {comments.map((comment) => (
            <article key={comment.id} className="rounded-xl bg-gray-50 p-4 dark:bg-white/[0.04]">
              <div className="text-sm font-bold text-gray-900 dark:text-white">{comment.name}</div>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{comment.body}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
