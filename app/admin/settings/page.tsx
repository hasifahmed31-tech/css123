import { createServerSupabase } from '@/lib/supabase-server'
import type { SiteSettings } from '@/lib/cms-types'
import { PageHeader } from '@/components/admin/AdminPrimitives'
import SettingsForm from '@/components/admin/SettingsForm'

export default async function AdminSettingsPage() {
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('settings').select('*').eq('id', 'site').maybeSingle()
  return (
    <>
      <PageHeader title="Settings" description="Edit global identity, contact, footer, logo, favicon, social links, and navbar links." />
      <SettingsForm settings={(data ?? null) as SiteSettings | null} />
    </>
  )
}

