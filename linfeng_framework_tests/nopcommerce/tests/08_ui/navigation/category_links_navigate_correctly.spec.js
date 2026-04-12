import { test, expect } from '@playwright/test';

test.describe('UI Navigation - Category Links Navigate Correctly', () => {

  test('books URL loads books category page', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/books');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/books/);
    await expect(page.locator('.page-title')).toContainText('Books', { timeout: 10000 });
  });

  test('electronics URL loads electronics category page', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/electronics');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/electronics/);
    await expect(page.locator('.page-title')).toContainText('Electronics', { timeout: 10000 });
  });
});