import { expect, test } from '@playwright/test'

test.describe('Core public interactions', () => {
  test('desktop navigation, theme menu, search, and newsletter form respond', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    await expect(page.getByRole('banner')).toBeVisible()
    await page.getByRole('button', { name: 'Choose color theme' }).click()
    await expect(page.getByRole('menu')).toBeVisible()
    await page.getByRole('menuitemradio', { name: 'Dark' }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)

    const newsletter = page.locator('section').filter({ hasText: 'Join Our Newsletter' })
    await newsletter.getByPlaceholder('Enter your email').fill('reader@example.com')
    await newsletter.getByRole('button', { name: 'Subscribe' }).click()
    await expect(newsletter.getByRole('button', { name: /Subscribed|Saving/ })).toBeVisible()

    await page.getByRole('link', { name: 'Blog' }).first().click()
    await expect(page).toHaveURL(/\/blog/)
    await page.getByPlaceholder('Search articles...').fill('seo')
    await expect(page.getByPlaceholder('Search articles...')).toHaveValue('seo')
  })

  test('mobile menu opens and closes cleanly', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('http://localhost:3000/')

    await page.getByRole('button', { name: 'Toggle navigation menu' }).click()
    const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' })
    await expect(mobileNav).toBeVisible()
    await mobileNav.getByRole('link', { name: 'Blog' }).click()
    await expect(page).toHaveURL(/\/blog/)
  })

  test('article sharing keeps only LinkedIn and Gmail and comments are removed', async ({ page }) => {
    await page.goto('http://localhost:3000/blog/ultimate-guide-affiliate-marketing-2026')

    await expect(page.getByLabel('Share this article on LinkedIn')).toBeVisible()
    await expect(page.getByLabel('Share this article by email')).toBeVisible()
    await expect(page.getByLabel('Share on X')).toHaveCount(0)
    await expect(page.getByLabel('Share on Facebook')).toHaveCount(0)
    await expect(page.getByText(/\d+\s+views/i)).toHaveCount(0)
    await expect(page.getByPlaceholder('Add a comment')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Post comment' })).toHaveCount(0)
  })
})
