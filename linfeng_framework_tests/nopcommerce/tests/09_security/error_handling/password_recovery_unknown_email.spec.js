import { test, expect } from '@playwright/test';

/** SKIPPED: Cloudflare blocks password recovery POST. Fix: local instance. */
test.describe('Security Error Handling - Password Recovery Unknown Email', () => {
  test.skip(true, 'Cloudflare blocks password recovery POST — run against local instance');

  test('password recovery with unknown email shows safe generic response', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/passwordrecovery');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#Email').fill(`unknown_${Date.now()}@test.com`);
    await page.locator('button[name="send-email"]').click();
    await expect(page.locator('.result, .bar-notification')).toBeVisible({ timeout: 10000 });
  });
});