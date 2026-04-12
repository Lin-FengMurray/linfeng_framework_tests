import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage.js';

test.describe('UI Footer - Renders Correctly', () => {

  test('footer shows information customer service and my account sections', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await page.locator('.footer').scrollIntoViewIfNeeded();
    await expect(page.locator('.footer')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('menu', { name: 'Information' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('menu', { name: 'Customer service' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('menu', { name: 'My account' })).toBeVisible({ timeout: 10000 });
  });
});