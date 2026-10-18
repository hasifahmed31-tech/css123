import { expect, test } from '@playwright/test'

const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'

test.describe('Core public interactions', () => {
  test('growth finder recommends useful articles without an email signup', async ({ page }) => {
    await page.goto(`${baseUrl}/`)
    const finder = page.getByRole('region', { name: /Make your next move/ })
    await expect(finder.getByRole('button', { name: 'Grow traffic' })).toBeVisible()
    await finder.getByRole('button', { name: 'Build a business' }).click()
    await expect(finder.getByRole('link', { name: /Start a Profitable Blog in 2026/ })).toBeVisible()
    await expect(finder.getByPlaceholder('Enter your email')).toHaveCount(0)
  })

  test('desktop navigation, theme menu, search, and guide finder respond', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(`${baseUrl}/`)

    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.locator('html')).toHaveClass(/dark/)
    const themeButton = page.getByRole('button', { name: 'Choose color theme' })
    await expect(themeButton.locator('svg')).toBeVisible()
    await themeButton.click()
    await expect(page.getByRole('menu')).toBeVisible()
    await page.getByRole('menuitemradio', { name: 'Light' }).click()
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    await themeButton.click()
    await page.getByRole('menuitemradio', { name: 'Dark' }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)

    const finder = page.getByRole('region', { name: /Make your next move/ })
    await finder.getByRole('button', { name: 'Work smarter with AI' }).click()
    await expect(finder.getByRole('link', { name: /AI Marketing Tools & Strategy/ })).toBeVisible()

    await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Blog' }).click()
    await expect(page).toHaveURL(/\/blog/)
    await page.getByPlaceholder('Search articles...').fill('seo')
    await expect(page.getByPlaceholder('Search articles...')).toHaveValue('seo')
    await expect(page.getByRole('link', { name: /Read article:/ }).first()).toBeVisible()
  })

  test('mobile menu opens and closes cleanly', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 740 })
    await page.goto(`${baseUrl}/`)

    await expect(page.getByRole('link', { name: 'Search articles' })).toBeVisible()
    await page.getByRole('button', { name: 'Toggle navigation menu' }).click()
    const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' })
    await expect(mobileNav).toBeVisible()
    await mobileNav.getByRole('link', { name: 'Blog' }).click()
    await expect(page).toHaveURL(/\/blog/)
  })

  test('article sharing keeps only LinkedIn and Gmail and comments are removed', async ({ page }) => {
    await page.goto(`${baseUrl}/blog/ultimate-guide-affiliate-marketing-2026`)

    await expect(page.getByLabel('Share this article on LinkedIn')).toBeVisible()
    await expect(page.getByLabel('Share this article by email')).toBeVisible()
    await expect(page.getByLabel('Share on X')).toHaveCount(0)
    await expect(page.getByLabel('Share on Facebook')).toHaveCount(0)
    await expect(page.getByText(/\d+\s+views/i)).toHaveCount(0)
    await expect(page.getByPlaceholder('Add a comment')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Post comment' })).toHaveCount(0)
  })

  test('blog filters, pagination, article actions, contact FAQ, and service links work', async ({ page }) => {
    await page.goto(`${baseUrl}/blog`)
    const search = page.getByPlaceholder('Search articles...')
    await search.fill('seo')
    await expect(page.getByRole('link', { name: /Read article:/ }).first()).toBeVisible()

    const categoryButtons = page.getByRole('button', { name: /^(SEO|Affiliate Marketing|Blogging|Marketing Tools|SaaS|AI Tools)\s+\d+$/ })
    if (await categoryButtons.count() > 1) {
      await categoryButtons.nth(1).click()
      await expect(categoryButtons.nth(1)).toHaveAttribute('aria-pressed', 'true')
    }

    await search.fill('no-matching-hasif-article-987654')
    await expect(page.getByRole('heading', { name: 'No articles found' })).toBeVisible()
    await page.getByRole('button', { name: 'Reset filters' }).click()
    await expect(search).toHaveValue('')
    await expect(page.getByRole('link', { name: /Read article:/ }).first()).toBeVisible()

    const nextPage = page.getByRole('button', { name: 'Next page' })
    if (await nextPage.isVisible()) {
      await nextPage.click()
      await expect(page.getByText(/Page 2 of/)).toBeVisible()
      await page.getByRole('button', { name: 'Previous page' }).click()
      await expect(page.getByText(/Page 1 of/)).toBeVisible()
    }

    await page.goto(`${baseUrl}/blog/ultimate-guide-affiliate-marketing-2026`)
    await page.getByRole('button', { name: 'Like', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Liked', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Save', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Saved', exact: true })).toBeVisible()

    await page.goto(`${baseUrl}/contact`)
    const firstFaq = page.getByRole('button', { name: 'How can I collaborate?' })
    await firstFaq.click()
    await expect(firstFaq).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByText(/Email us at info@hasif\.online/)).toBeVisible()
    await firstFaq.click()
    await expect(firstFaq).toHaveAttribute('aria-expanded', 'false')

    await page.goto(`${baseUrl}/services`)
    await page.getByRole('link', { name: 'Explore services' }).click()
    await expect(page).toHaveURL(/\/services#offerings$/)
  })

  test('article search submits full-text queries and finds body-only matches', async ({ page }) => {
    await page.goto(`${baseUrl}/blog`)
    await page.getByRole('search').getByRole('searchbox', { name: 'Search articles' }).fill('goldmines')
    await page.getByRole('button', { name: 'Search', exact: true }).click()
    await expect(page).toHaveURL(/\/search\?q=goldmines/)
    await expect(page.getByRole('link', { name: /ultimate guide to affiliate marketing/i })).toBeVisible()
  })

  test('the built-in article library uses a distinct photo for every article', async ({ page }) => {
    await page.goto(`${baseUrl}/search`)
    const imageSources = async () => page.locator('a[href^="/blog/"] article > div:first-child img').evaluateAll((images) =>
      images.map((image) => image.getAttribute('src')).filter((src): src is string => Boolean(src)),
    )
    const firstPageSources = await imageSources()
    const nextPage = page.getByRole('button', { name: 'Next page' })
    if (await nextPage.isVisible()) {
      await nextPage.click()
      await expect(page.getByText(/Page 2 of/)).toBeVisible()
    }
    const allSources = [...firstPageSources, ...await imageSources()]
    expect(new Set(allSources).size).toBe(allSources.length)
  })
})
