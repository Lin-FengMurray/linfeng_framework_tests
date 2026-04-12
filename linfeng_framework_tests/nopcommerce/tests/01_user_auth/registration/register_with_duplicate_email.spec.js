import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../../pages/RegisterPage.js';
import users from '../../../fixtures/users.json' assert { type: 'json' };

/**
 * SKIPPED: Cloudflare blocks POST to /register on demo.nopcommerce.com.
 * Fix: run against a local nopCommerce instance.
 */
test.describe('Registration - Duplicate Email', () => {
  test.skip(true, 'Cloudflare blocks register POST — run against local instance');

  test('register with already used email shows error', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.open();
    await registerPage.registerUser(users.validUser);
    await expect(page.locator('.message-error')).toContainText('already exists');
  });
});