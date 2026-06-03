import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-white text-gray-950">
      <NextStudio config={config} />
    </div>
  )
}
