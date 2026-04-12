import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage.js';

test.describe('UI Responsive - Homepage Renders on Tablet', () => {

  test('homepage header footer visible at 768x1024 tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const home = new HomePage(page);
    await home.open();
    await expect(page.locator('.header')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.header-logo')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.footer')).toBeVisible({ timeout: 10000 });
  });
});