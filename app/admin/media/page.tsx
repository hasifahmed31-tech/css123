import { PageHeader } from '@/components/admin/AdminPrimitives'
import MediaLibrary from '@/components/admin/MediaLibrary'

export default function AdminMediaPage() {
  return (
    <>
      <PageHeader title="Media" description="Upload, preview, copy, and delete Supabase Storage image assets." />
      <MediaLibrary />
    </>
  )
}

