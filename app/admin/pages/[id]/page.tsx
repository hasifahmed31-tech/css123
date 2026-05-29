import { notFound } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase-server'
import type { CmsPage } from '@/lib/cms-types'
import { PageHeader } from '@/components/admin/AdminPrimitives'
import PageForm from '@/components/admin/PageForm'

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('pages').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  const page = data as CmsPage
  return (
    <>
      <PageHeader title="Edit page" description={`Editing ${page.slug === 'home' ? '/' : `/${page.slug}`}`} />
      <PageForm page={page} />
    </>
  )
}

