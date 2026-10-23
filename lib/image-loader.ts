type ImageLoaderOptions = {
  src: string
  width: number
  quality?: number
}

/** Serve editorial Unsplash images responsively from their CDN. All other
 * images opt out of this loader and remain as authored URLs. */
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
  } catch {
    // Non-Unsplash sources are returned unchanged below.
  }
  return src
}
