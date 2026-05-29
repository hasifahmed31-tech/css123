import Link from 'next/link'
import { Activity, FileText, ImageIcon, PanelLeftClose, TrendingUp, Users } from 'lucide-react'
import { Card, PageHeader } from '@/components/admin/AdminPrimitives'
import { createServerSupabase } from '@/lib/supabase-server'

async function getCounts() {
  const supabase = await createServerSupabase()
  const [posts, published, pages, media, subscribers] = await Promise.all([
    supabase.from('posts').select('id', { count: 'exact', head: true }),
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('published', true),
    supabase.from('pages').select('id', { count: 'exact', head: true }),
    supabase.from('media').select('id', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
  ])
  return {
    posts: posts.count ?? 0,
    published: published.count ?? 0,
    pages: pages.count ?? 0,
    media: media.count ?? 0,
    subscribers: subscribers.count ?? 0,
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts()
  const cards = [
    { label: 'Total posts', value: counts.posts, icon: FileText, href: '/admin/posts' },
    { label: 'Published', value: counts.published, icon: TrendingUp, href: '/admin/posts' },
    { label: 'Pages', value: counts.pages, icon: PanelLeftClose, href: '/admin/pages' },
    { label: 'Media assets', value: counts.media, icon: ImageIcon, href: '/admin/media' },
    { label: 'Subscribers', value: counts.subscribers, icon: Users, href: '/admin/settings' },
  ]

  return (
    <>
      <PageHeader title="Dashboard" description="Manage publishing, media, SEO, and site settings from one clean workspace." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href}>
            <Card className="p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500">{label}</p>
                  <p className="mt-2 text-3xl font-extrabold">{value}</p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-white dark:bg-white dark:text-gray-950">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h2 className="text-lg font-extrabold">Editorial workflow</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {['Draft content', 'Upload assets', 'Publish with SEO'].map((step, index) => (
              <div key={step} className="rounded-xl border border-gray-200 p-4 dark:border-white/10">
                <span className="text-xs font-bold text-gray-400">STEP {index + 1}</span>
                <p className="mt-2 text-sm font-bold">{step}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-extrabold">Performance</h2>
          </div>
          <div className="mt-4 grid gap-3">
            {['ISR: 30 min', 'Image CDN: enabled', 'Vitals: collecting'].map((item) => (
              <div key={item} className="rounded-xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 dark:bg-white/[0.04] dark:text-gray-200">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-lg font-extrabold">Quick actions</h2>
          <div className="mt-4 grid gap-2">
            <Link href="/admin/posts/new" className="rounded-xl bg-gray-950 px-4 py-3 text-center text-sm font-bold text-white dark:bg-white dark:text-gray-950">
              New post
            </Link>
            <Link href="/admin/media" className="rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-bold dark:border-white/10">
              Upload media
            </Link>
          </div>
        </Card>
      </div>
    </>
  )
}
