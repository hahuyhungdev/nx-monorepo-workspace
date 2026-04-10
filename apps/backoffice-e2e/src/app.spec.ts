import { test, expect } from '@playwright/test';

test('should render the backoffice dashboard', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole('heading', { name: 'Backoffice Dashboard' })
  ).toBeVisible();
});
