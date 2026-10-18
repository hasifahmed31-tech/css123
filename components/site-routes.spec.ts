import { expect, test } from '@playwright/test'

const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'

const routes = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/blog',
  '/blog/top-seo-tools-rank-higher',
  '/search',
  '/privacy',
  '/terms',
  '/affiliate-disclosure',
  '/disclaimer',
]

test('public pages render without route errors', async ({ page }) => {
  test.setTimeout(90_000)
  const pageErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' })
    expect(response?.status(), `${route} response`).toBe(200)
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Something went wrong' })).toHaveCount(0)
  }

  expect(pageErrors).toEqual([])
})

test('public pages fit a narrow mobile viewport without horizontal overflow', async ({ page }) => {
  test.setTimeout(90_000)
  await page.setViewportSize({ width: 320, height: 740 })

  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' })
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    }))
    expect(dimensions.page, `${route} should fit a 320px viewport`).toBeLessThanOrEqual(dimensions.viewport + 1)
  }
})

test('desktop header shows primary navigation and keeps mobile menu hidden', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Search articles' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Toggle navigation menu' })).toBeHidden()
})

test('homepage hero photo is requested eagerly and loads successfully', async ({ page }) => {
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
  const heroImage = page.getByAltText('A team discussing ideas around a laptop')
  await expect(heroImage).toHaveAttribute('fetchpriority', 'high')
  await expect(heroImage).not.toHaveAttribute('loading', 'lazy')
  await expect.poll(() => heroImage.evaluate((image: HTMLImageElement) => image.naturalWidth), { timeout: 10_000 }).toBeGreaterThan(0)
})

test('homepage shows an immediately usable latest-articles section', async ({ page }) => {
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
  const latest = page.locator('section').filter({ hasText: 'The Hasif journal · Freshly published' })
  await expect(latest.getByRole('heading', { name: /Ideas for your next move/ })).toBeVisible()
  const firstArticle = latest.locator('a[href^="/blog/"]').first()
  await expect(firstArticle).toBeVisible()
  await expect(firstArticle).toHaveAttribute('href', /\/blog\//)
})

test('published Sanity articles appear in the public blog', async ({ page }) => {
  await page.goto(`${baseUrl}/blog`, { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('link', { name: /Read article: Housecall Pro Review/i })).toBeVisible({ timeout: 15_000 })
})

test('a homepage article opens with readable article content', async ({ page }) => {
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' })
  const latest = page.locator('section').filter({ hasText: 'The Hasif journal · Freshly published' })
  const article = latest.locator('a[href^="/blog/"]').first()
  await expect(article).toBeVisible()
  await article.click()
  await expect(page).toHaveURL(/\/blog\/.+/)
  await expect(page.locator('.blog-content')).toBeVisible({ timeout: 15_000 })
})

test('article heading has readable colors in light and dark themes', async ({ page }) => {
  await page.goto(`${baseUrl}/blog/top-seo-tools-rank-higher`, { waitUntil: 'networkidle' })
  const heading = page.locator('.article-masthead h1')
  const metadata = page.locator('.article-meta').first()
  const themeButton = page.getByRole('button', { name: 'Choose color theme' })
  await expect(themeButton).toBeVisible()
  await themeButton.click()
  await expect(page.getByRole('menu')).toBeVisible()
  await page.getByRole('menuitemradio', { name: 'Light' }).click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await expect.poll(() => heading.evaluate((element) => getComputedStyle(element).color)).toBe('rgb(23, 21, 31)')
  await expect.poll(() => metadata.evaluate((element) => getComputedStyle(element).color)).toBe('rgb(93, 88, 103)')
  await themeButton.click()
  await page.getByRole('menuitemradio', { name: 'Dark' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await expect.poll(() => heading.evaluate((element) => getComputedStyle(element).color)).toBe('rgb(255, 255, 255)')
  await expect.poll(() => metadata.evaluate((element) => getComputedStyle(element).color)).toBe('rgba(255, 255, 255, 0.65)')
})

test('contact form validates and shows a success state after a successful response', async ({ page }) => {
  await page.route('**/api/contact', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ ok: true }),
  }))
  await page.goto(`${baseUrl}/contact`)

  await page.getByRole('button', { name: 'Send message' }).click()
  await expect(page.getByText('Required').first()).toBeVisible()

  await page.getByPlaceholder('Your name').fill('Test Visitor')
  await page.getByPlaceholder('you@example.com').fill('visitor@example.com')
  await page.getByPlaceholder('Tell us what is on your mind...').fill('This is a local end-to-end test message.')
  await page.getByRole('button', { name: 'Send message' }).click()
  await expect(page.getByText('Message sent! We will get back to you soon.')).toBeVisible()
})
