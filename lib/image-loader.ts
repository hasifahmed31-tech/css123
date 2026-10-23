type ImageLoaderOptions = {
  src: string
  width: number
  quality?: number
}

/** Serve editorial images responsively from their source CDNs. */
export default function imageLoader({ src, width, quality }: ImageLoaderOptions) {
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
      imageUrl.searchParams.set('q', String(quality ?? 65))
      return imageUrl.toString()
    }
    if (imageUrl.hostname === 'cdn.sanity.io') {
      // CMS cards receive a fixed 1400x875 source URL. Drop its fixed height
      // so each responsive candidate is resized to the actual display width.
      imageUrl.searchParams.set('auto', 'format')
      imageUrl.searchParams.set('fit', 'max')
      imageUrl.searchParams.set('w', String(width))
      imageUrl.searchParams.set('q', String(quality ?? 65))
      imageUrl.searchParams.delete('h')
      return imageUrl.toString()
    }
  } catch {
    // Non-Unsplash sources are returned unchanged below.
  }
  return src
}
