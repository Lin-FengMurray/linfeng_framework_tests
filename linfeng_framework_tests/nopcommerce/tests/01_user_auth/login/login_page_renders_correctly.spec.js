import { test, expect } from '@playwright/test';


test.describe('Login - Page Renders Correctly', () => {

  test('login page shows all required form elements', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/login');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#Email')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#Password')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.login-button')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible({ timeout: 10000 });
  });
});