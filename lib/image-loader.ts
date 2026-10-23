type ImageLoaderOptions = {
  src: string
  width: number
  quality?: number
}

/** Serve editorial Unsplash images responsively from their CDN. All other
 * images opt out of this loader and remain as authored URLs. */
export default function imageLoader({ src, width, quality }: ImageLoaderOptions) {
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
