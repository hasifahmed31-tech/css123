import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog-data'

export const runtime = 'edge'
export const alt = 'Hasif article'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const staticPost = getPostBySlug(slug)
  const title = staticPost?.title || titleFromSlug(slug)
  const description = staticPost?.excerpt || 'Smart tools, reviews, and growth strategies for modern online business.'
  const category = staticPost?.category || 'Article'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#111827',
          color: 'white',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, fontWeight: 800 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: '#7c3aed' }} />
          Hasif
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ color: '#c4b5fd', fontSize: 26, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3 }}>{category}</div>
          <div style={{ fontSize: 66, lineHeight: 1.04, fontWeight: 900, maxWidth: 980 }}>{title}</div>
          <div style={{ color: '#d1d5db', fontSize: 28, lineHeight: 1.35, maxWidth: 920 }}>{description}</div>
        </div>
      </div>
    ),
    size
  )
}

function titleFromSlug(slug: string) {
  return slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}
