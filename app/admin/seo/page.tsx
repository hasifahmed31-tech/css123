import Link from 'next/link'
import { createServerSupabase } from '@/lib/supabase-server'
import type { CmsPage, CmsPost } from '@/lib/cms-types'
import { Card, PageHeader } from '@/components/admin/AdminPrimitives'

export default async function AdminSeoPage() {
  const supabase = await createServerSupabase()
  const [postsResult, pagesResult] = await Promise.all([
    supabase.from('posts').select('*').order('updated_at', { ascending: false }).limit(20),
    supabase.from('pages').select('*').order('updated_at', { ascending: false }).limit(20),
  ])
  const posts = (postsResult.data ?? []) as CmsPost[]
  const pages = (pagesResult.data ?? []) as CmsPage[]

  return (
    <>
      <PageHeader title="SEO" description="Audit metadata coverage and jump into records that need attention." />
      <div className="grid gap-5 lg:grid-cols-2">
        <SeoList title="Posts" items={posts.map((post) => ({ title: post.title, href: `/admin/posts/${post.id}`, description: post.seo_description, image: post.og_image || post.featured_image }))} />
        <SeoList title="Pages" items={pages.map((page) => ({ title: page.title, href: `/admin/pages/${page.id}`, description: page.seo_description, image: page.og_image || page.featured_image }))} />
      </div>
    </>
  )
}

function SeoList({ title, items }: { title: string; items: Array<{ title: string; href: string; description?: string | null; image?: string | null }> }) {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-extrabold">{title}</h2>
      <div className="mt-4 divide-y divide-gray-100 dark:divide-white/10">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center justify-between gap-4 py-3">
            <div>
              <p className="text-sm font-bold">{item.title}</p>
              <p className="mt-1 text-xs text-gray-500">{item.description ? 'Description set' : 'Missing SEO description'} · {item.image ? 'OG image set' : 'Missing OG image'}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.description && item.image ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'}`}>
              {item.description && item.image ? 'Ready' : 'Needs work'}
            </span>
          </Link>
        ))}
        {items.length === 0 && <p className="py-10 text-center text-sm text-gray-500">No records yet.</p>}
      </div>
    </Card>
  )
}

