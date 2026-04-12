import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../../pages/ProductsPage.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };

/**
 * SKIPPED: Cloudflare blocks search form POST on demo.nopcommerce.com.
 * Fix: run against a local nopCommerce instance.
 */
test.describe('Search - Returns Matching Results', () => {
  test.skip(true, 'Cloudflare blocks search form POST — run against local instance');

  test('search for book returns matching product', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await page.goto('https://demo.nopcommerce.com/search');
    await page.waitForLoadState('domcontentloaded');
    await productsPage.searchProduct(products.books.productName);
    await productsPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
    await expect(productsPage.productTitles.first()).toContainText(products.books.productName);
  });

  test('search for computer returns matching product', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await page.goto('https://demo.nopcommerce.com/search');
    await page.waitForLoadState('domcontentloaded');
    await productsPage.searchProduct(products.computers.searchKeyword);
    await productsPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
    const names = await productsPage.productTitles.allTextContents();
    expect(names.some(n => n.toLowerCase().includes('computer'))).toBeTruthy();
  });
});