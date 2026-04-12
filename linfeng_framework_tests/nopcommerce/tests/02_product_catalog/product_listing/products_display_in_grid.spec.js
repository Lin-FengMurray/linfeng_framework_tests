import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../../pages/ProductsPage.js';

test.describe('Product Listing - Grid Display', () => {

  test('books category displays multiple products in grid', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await page.goto('https://demo.nopcommerce.com/books');
    await page.waitForLoadState('domcontentloaded');
    await productsPage.productItems.first().waitFor({ state: 'visible', timeout: 10000 });
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('product titles are visible in grid', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await page.goto('https://demo.nopcommerce.com/books');
    await page.waitForLoadState('domcontentloaded');
    await productsPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
    const names = await productsPage.getAllProductNames();
    expect(names.length).toBeGreaterThan(0);
  });
});