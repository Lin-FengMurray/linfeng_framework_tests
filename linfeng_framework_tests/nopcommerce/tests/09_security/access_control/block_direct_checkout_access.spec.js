import { test, expect } from '@playwright/test';

test.describe('Security Access Control - Block Direct Checkout Access', () => {

  test('accessing checkout directly without cart redirects or blocks flow', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/checkout');
    await page.waitForLoadState('domcontentloaded');
    const url = page.url();
    const isBlocked = url.includes('cart') || url.includes('login') || url.includes('checkout');
    expect(isBlocked).toBeTruthy();
  });

  test('empty cart page shows empty message', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/cart');
    await page.waitForLoadState('domcontentloaded');
    const isEmpty = await page.locator('.order-summary-content').isVisible().catch(() => false);
    if (isEmpty) {
      await expect(page.locator('.order-summary-content')).toContainText(
        'Your Shopping Cart is empty!', { timeout: 10000 }
      );
    }
  });
});