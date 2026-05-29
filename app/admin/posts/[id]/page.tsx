import { notFound } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase-server'
import type { CmsPost } from '@/lib/cms-types'
import { PageHeader } from '@/components/admin/AdminPrimitives'
import PostForm from '@/components/admin/PostForm'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('posts').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  const post = data as CmsPost

  return (
    <>
      <PageHeader title="Edit post" description={`Editing /blog/${post.slug}`} />
      <PostForm post={post} />
    </>
  )
}

