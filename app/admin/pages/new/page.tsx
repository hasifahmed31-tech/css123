import { PageHeader } from '@/components/admin/AdminPrimitives'
import PageForm from '@/components/admin/PageForm'

export default function NewPagePage() {
  return (
    <>
      <PageHeader title="New page" description="Create editable structured page sections for the public site." />
      <PageForm />
    </>
  )
}

