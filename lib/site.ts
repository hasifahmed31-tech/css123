export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    'https://hasif.online',
)

export const siteOrigin = siteUrl.origin

function normalizeSiteUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`

  try {
    return new URL(withProtocol)
  } catch {
    return new URL('https://hasif.online')
  }
}
