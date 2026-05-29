import Link from 'next/link'
import { Pencil, Plus } from 'lucide-react'
import { createServerSupabase } from '@/lib/supabase-server'
import type { CmsPage } from '@/lib/cms-types'
import { Card, PageHeader } from '@/components/admin/AdminPrimitives'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminPagesPage() {
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('pages').select('*').order('updated_at', { ascending: false })
  const pages = (data ?? []) as CmsPage[]

  return (
    <>
      <PageHeader title="Pages" description="Edit homepage, about, contact, services, hero, CTA, footer, and navigation content." action={<Link href="/admin/pages/new" className="inline-flex h-11 items-center gap-2 rounded-xl bg-gray-950 px-4 text-sm font-bold text-white dark:bg-white dark:text-gray-950"><Plus className="h-4 w-4" />New page</Link>} />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500 dark:border-white/10 dark:bg-white/[0.03]">
              <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className="px-4 py-4 font-bold">{page.title}</td>
                  <td className="px-4 py-4 text-gray-500">/{page.slug === 'home' ? '' : page.slug}</td>
                  <td className="px-4 py-4 text-gray-500">{new Date(page.updated_at).toLocaleDateString()}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/pages/${page.id}`} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-white/10 dark:hover:text-white"><Pencil className="h-4 w-4" /></Link>
                      <DeleteButton endpoint={`/api/pages/${page.id}`} label={page.title} />
                    </div>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && <tr><td colSpan={4} className="px-4 py-16 text-center text-gray-500">No CMS pages yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

