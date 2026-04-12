import { test, expect } from '@playwright/test';

/** SKIPPED: Cloudflare blocks register POST. Fix: local instance. */
test.describe('Security Form Validation - Register Rejects Invalid Email', () => {
  test.skip(true, 'Cloudflare blocks register POST — run against local instance');

  test('register form shows email error for invalid email format', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/register');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#FirstName').fill('LinFeng');
    await page.locator('#LastName').fill('QA');
    await page.locator('#Email').fill('invalid-email');
    await page.locator('#Password').fill('Password123!');
    await page.locator('#ConfirmPassword').fill('Password123!');
    await page.locator('#register-button').click();
    await page.locator('#Email-error').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.locator('#Email-error')).toBeVisible();
  });
});