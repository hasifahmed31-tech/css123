import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './components',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  reporter: 'list',
  use: {
    browserName: 'chromium',
    channel: process.env.PLAYWRIGHT_CHANNEL,
    headless: true,
  },
})
