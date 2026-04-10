import { test, expect } from '@playwright/test';

test('should display the login page', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
});
