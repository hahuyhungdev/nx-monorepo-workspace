import { test, expect } from '@playwright/test';

test('should display the login page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/backoffice/i);
});
