import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage.js';

/**
 * SKIPPED: Cloudflare blocks POST to /login on demo.nopcommerce.com.
 * Fix: run against a local nopCommerce instance.
 */
test.describe('Login - Wrong Password', () => {
  test.skip(true, 'Cloudflare blocks login POST — run against local instance');

  test('login with wrong password shows unsuccessful login error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login({ email: 'fake@test.com', password: 'WrongPassword!' });
    await page.locator('.message-error').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.locator('.message-error')).toContainText('Login was unsuccessful');
  });
});