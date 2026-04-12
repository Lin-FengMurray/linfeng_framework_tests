import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage.js';
import users from '../../../fixtures/users.json' assert { type: 'json' };

/**
 * SKIPPED: Cloudflare blocks POST to /login on demo.nopcommerce.com.
 * Fix: run against a local nopCommerce instance.
 */
test.describe('Login - Valid Credentials', () => {
  test.skip(true, 'Cloudflare blocks login POST — run against local instance');

  test('login with valid credentials redirects to home page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.validUser);
    await page.waitForURL('https://demo.nopcommerce.com/', { timeout: 15000 });
    await expect(page.locator('.account')).toBeVisible({ timeout: 10000 });
  });
});