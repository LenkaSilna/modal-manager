import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/e2e',
  testMatch: '**/*.test.ts',
  use: {
    headless: true,
    baseURL: 'http://localhost:3000',
    viewport: { width: 1920, height: 1080 },
  },
});