import { test, expect } from '@playwright/test';

test('should display the login page', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveTitle(/front-office/i);
});
