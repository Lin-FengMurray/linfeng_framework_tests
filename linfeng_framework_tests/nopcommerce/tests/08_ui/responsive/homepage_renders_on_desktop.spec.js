import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage.js';

test.describe('UI Responsive - Homepage Renders on Desktop', () => {

  test('homepage header nav footer visible at 1440x900 desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const home = new HomePage(page);
    await home.open();
    await expect(page.locator('.header')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('menu', { name: 'Categories' })).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.footer')).toBeVisible({ timeout: 10000 });
  });
});