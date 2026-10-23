type ImageLoaderOptions = {
  src: string
  width: number
  quality?: number
}

/** Serve editorial images responsively from their source CDNs. */
export default function imageLoader({ src, width, quality }: ImageLoaderOptions) {
  const localImageVariants: Record<string, number[]> = {
    '/images/articles/content.webp': [256, 384, 640, 750, 828, 1080],
    '/images/articles/top-saas-feature.webp': [256, 384, 640, 750, 828, 1080],
  }
  const localWidths = localImageVariants[src]
  if (localWidths) {
    const responsiveWidth = localWidths.find((candidate) => candidate >= width) ?? localWidths[localWidths.length - 1]
    return src.replace('.webp', `-${responsiveWidth}.webp`)
  }

  if (src === '/images/home-hero.webp') {
    const widths = [384, 640, 750, 828, 1080, 1200]
    const responsiveWidth = widths.find((candidate) => candidate >= width) ?? 1200
    return `/images/home-hero-${responsiveWidth}.webp`
  }

  try {
    const imageUrl = new URL(src)
    if (imageUrl.hostname === 'images.unsplash.com') {
      imageUrl.searchParams.set('auto', 'format')
      imageUrl.searchParams.set('fit', 'crop')
      imageUrl.searchParams.set('w', String(width))
      imageUrl.searchParams.set('q', String(Math.min(quality ?? 65, 50)))
      return imageUrl.toString()
    }
    if (imageUrl.hostname === 'cdn.sanity.io') {
      // CMS cards receive a fixed 1400x875 source URL. Drop its fixed height
      // so each responsive candidate is resized to the actual display width.
      imageUrl.searchParams.set('auto', 'format')
      imageUrl.searchParams.set('fit', 'max')
      imageUrl.searchParams.set('w', String(width))
      imageUrl.searchParams.set('q', String(Math.min(quality ?? 65, 55)))
      imageUrl.searchParams.delete('h')
      return imageUrl.toString()
    }
  } catch {
    // Non-Unsplash sources are returned unchanged below.
  }
  return src
}
