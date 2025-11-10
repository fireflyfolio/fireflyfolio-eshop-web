import { test, expect } from '@playwright/test';

test('shows title page', async ({ page }) => {
  await page.goto('http://localhost:13000/');
  console.log(page.url());
  await expect(page).toHaveTitle('eShop');
});
