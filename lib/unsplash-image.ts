export function isUnsplashImage(src: string | null | undefined): src is string {
  if (!src) return false
  try {
    return new URL(src).hostname === 'images.unsplash.com'
  } catch {
    return false
  }
}
