import { test, expect } from '@playwright/test';

/**
 * SKIPPED: Cloudflare blocks POST to /passwordrecovery on demo.nopcommerce.com.
 * Fix: run against a local nopCommerce instance.
 */
test.describe('Password Recovery - Email Sent Confirmation', () => {
  test.skip(true, 'Cloudflare blocks password recovery POST — run against local instance');

  test('password recovery with unknown email shows safe generic message', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/passwordrecovery');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#Email').fill(`unknown_${Date.now()}@test.com`);
    await page.locator('button[name="send-email"]').click();
    await expect(page.locator('.result, .bar-notification')).toBeVisible({ timeout: 10000 });
  });

  test('password recovery page renders correctly', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/passwordrecovery');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#Email')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button[name="send-email"]')).toBeVisible({ timeout: 10000 });
  });
});