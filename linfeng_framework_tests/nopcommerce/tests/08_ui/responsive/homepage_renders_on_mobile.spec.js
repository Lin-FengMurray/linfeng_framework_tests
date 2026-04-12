import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage.js';

test.describe('UI Responsive - Homepage Renders on Mobile', () => {

  test('homepage header and logo visible at 390x844 mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const home = new HomePage(page);
    await home.open();
    await expect(page.locator('.header')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.header-logo')).toBeVisible({ timeout: 10000 });
  });
});