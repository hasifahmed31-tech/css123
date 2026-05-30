import { test, expect } from '@playwright/test';

test.describe('Site Layout (Chrome) Visibility', () => {
  test('should show Header and Footer on the homepage', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Verify Header and Footer exist
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });
});
