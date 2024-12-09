import { test, expect } from '@playwright/test';

test('should handle user and API modals correctly', async ({ page }) => {
  await page.goto('/');

  await page.click('text=Open User Modal');
  const userModalText = await page.locator('[data-testid="modal-content"]').textContent();
  expect(userModalText).toContain('User Modal');

  await page.click('[data-testid="modal-close-button"]');
  await page.locator('[data-testid="modal-backdrop"]').waitFor({ state: 'hidden' });

  await page.waitForTimeout(10000);
  const apiModalText = await page.locator('[data-testid="modal-content"]').textContent();
  expect(apiModalText).toContain('Data from API: Example Title');

  await page.click('[data-testid="modal-close-button"]');
});