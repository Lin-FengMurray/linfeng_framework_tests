import { test, expect } from '@playwright/test';

test.describe('Security Access Control - Redirect Unauthenticated to Login', () => {

  test('accessing customer info page redirects to login', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/customer/info');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/login/, { timeout: 10000 });
    await expect(page.locator('body')).toContainText('Welcome, Please Sign In!');
  });

  test('accessing order history redirects to login', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/order/history');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/login/, { timeout: 10000 });
  });

  test('accessing account addresses redirects to login', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/customer/addresses');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/login/, { timeout: 10000 });
  });
});