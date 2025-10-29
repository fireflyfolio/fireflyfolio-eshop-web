import { test, expect } from '@playwright/test';

test('shows status text', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('API says:')).toBeVisible();
});
