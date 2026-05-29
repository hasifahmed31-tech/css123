import Link from 'next/link'
import { Pencil, Plus } from 'lucide-react'
import { createServerSupabase } from '@/lib/supabase-server'
import type { CmsPost } from '@/lib/cms-types'
import DeleteButton from '@/components/admin/DeleteButton'
import { Card, PageHeader } from '@/components/admin/AdminPrimitives'

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q = '', page = '1' } = await searchParams
  const currentPage = Math.max(1, Number(page))
  const limit = 12
  const from = (currentPage - 1) * limit
  const supabase = await createServerSupabase()
  let query = supabase.from('posts').select('*', { count: 'exact' }).order('created_at', { ascending: false })
  if (q) query = query.ilike('title', `%${q}%`)
  const { data, count } = await query.range(from, from + limit - 1)
  const posts = (data ?? []) as CmsPost[]
  const pages = Math.max(1, Math.ceil((count ?? 0) / limit))

  return (
    <>
      <PageHeader
        title="Posts"
        description="Create, draft, publish, search, and manage long-form content."
        action={
          <Link href="/admin/posts/new" className="inline-flex h-11 items-center gap-2 rounded-xl bg-gray-950 px-4 text-sm font-bold text-white dark:bg-white dark:text-gray-950">
            <Plus className="h-4 w-4" />
            New post
          </Link>
        }
      />
      <Card>
        <form className="border-b border-gray-200 p-4 dark:border-white/10">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search posts..."
            className="h-11 w-full max-w-md rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400 dark:border-white/10 dark:bg-white/[0.04]"
          />
        </form>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500 dark:border-white/10 dark:bg-white/[0.03]">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-4 font-bold">{post.title}</td>
                  <td className="px-4 py-4 text-gray-500">/blog/{post.slug}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${post.published ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{new Date(post.updated_at).toLocaleDateString()}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/posts/${post.id}`} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Edit post">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteButton endpoint={`/api/posts/${post.id}`} label={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-center text-gray-500">No posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 p-4 text-sm dark:border-white/10">
          <span className="text-gray-500">Page {currentPage} of {pages}</span>
          <div className="flex gap-2">
            <Link href={`/admin/posts?page=${Math.max(1, currentPage - 1)}${q ? `&q=${encodeURIComponent(q)}` : ''}`} className="rounded-lg border border-gray-200 px-3 py-2 font-bold dark:border-white/10">Previous</Link>
            <Link href={`/admin/posts?page=${Math.min(pages, currentPage + 1)}${q ? `&q=${encodeURIComponent(q)}` : ''}`} className="rounded-lg border border-gray-200 px-3 py-2 font-bold dark:border-white/10">Next</Link>
          </div>
        </div>
      </Card>
    </>
  )
}

