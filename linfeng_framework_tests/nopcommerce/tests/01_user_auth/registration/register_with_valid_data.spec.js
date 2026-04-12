import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../../pages/RegisterPage.js';
import users from '../../../fixtures/users.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/**
 * SKIPPED: Cloudflare blocks POST to /register on demo.nopcommerce.com.
 * Fix: run against a local nopCommerce instance.
 */
test.describe('Registration - Valid Data', () => {
  test.skip(true, 'Cloudflare blocks register POST — run against local instance');

  test('register with valid data completes successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.open();
    await registerPage.registerUser({
      ...users.validUser,
      email: `linfeng_${Date.now()}@example.com`,
    });
    await expect(registerPage.registrationResult).toHaveText(/your registration completed/i);
  });
});