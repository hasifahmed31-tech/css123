import { test, expect } from '@playwright/test';

const baseUrl = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'

test.describe('Site Layout (Chrome) Visibility', () => {
  test('should show Header and Footer on the homepage', async ({ page }) => {
    await page.goto(`${baseUrl}/`);
    
    // Verify Header and Footer exist
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });
});
