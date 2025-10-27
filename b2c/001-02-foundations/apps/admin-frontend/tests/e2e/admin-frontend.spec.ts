import { test, expect } from '@playwright/test';

test('shows API label', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByText('API says:')).toBeVisible();
});
