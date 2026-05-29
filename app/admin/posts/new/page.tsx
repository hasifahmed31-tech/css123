import { PageHeader } from '@/components/admin/AdminPrimitives'
import PostForm from '@/components/admin/PostForm'

export default function NewPostPage() {
  return (
    <>
      <PageHeader title="New post" description="Write in HTML or Markdown, preview live, and publish when ready." />
      <PostForm />
    </>
  )
}

