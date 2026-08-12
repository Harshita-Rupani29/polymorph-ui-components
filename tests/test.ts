import { expect, test } from '@playwright/test';

test('index redirects to the first component page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/components\//);
  await expect(page.locator('.page-header h1')).toBeVisible();
});
