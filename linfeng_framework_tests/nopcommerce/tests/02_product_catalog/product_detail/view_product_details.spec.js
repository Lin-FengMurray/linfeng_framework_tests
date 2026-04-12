import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../../pages/ProductDetailPage.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };

test.describe('Product Detail - View Details', () => {

  test('book product detail page shows correct name', async ({ page }) => {
    const productDetailPage = new ProductDetailPage(page);
    await page.goto(`https://demo.nopcommerce.com${products.books.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.productName.waitFor({ state: 'visible', timeout: 10000 });
    await expect(productDetailPage.productName).toHaveText(products.books.productName);
  });

  test('computer product detail page shows correct name', async ({ page }) => {
    const productDetailPage = new ProductDetailPage(page);
    await page.goto(`https://demo.nopcommerce.com${products.computers.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.productName.waitFor({ state: 'visible', timeout: 10000 });
    await expect(productDetailPage.productName).toHaveText(products.computers.productName);
  });
});