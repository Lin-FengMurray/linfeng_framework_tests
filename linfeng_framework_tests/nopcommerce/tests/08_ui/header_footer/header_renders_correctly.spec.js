import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage.js';

test.describe('UI Header - Renders Correctly', () => {

  test('header shows logo navigation cart and wishlist links', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await expect(page.locator('.header')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.header-logo')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('menu', { name: 'Categories' })).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.cart-label')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.wishlist-label')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.ico-register')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.ico-login')).toBeVisible({ timeout: 10000 });
  });
});