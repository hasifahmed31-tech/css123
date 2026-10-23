export function isUnsplashImage(src: string | null | undefined): src is string {
  if (!src) return false
  try {
    return new URL(src).hostname === 'images.unsplash.com'
  } catch {
    return false
  }
}

export function isOptimizableImage(src: string | null | undefined): src is string {
  if (!src) return false
  if (src === '/images/articles/content.webp' || src === '/images/articles/top-saas-feature.webp') return true
  try {
    const hostname = new URL(src).hostname
    return hostname === 'images.unsplash.com' || hostname === 'cdn.sanity.io'
  } catch {
    return false
  }
}
