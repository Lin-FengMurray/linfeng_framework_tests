import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../../pages/ProductsPage.js';

test.describe('Product Listing - Sort', () => {

  test('sort books by price low to high keeps products visible', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await page.goto('https://demo.nopcommerce.com/books');
    await page.waitForLoadState('domcontentloaded');
    await productsPage.productItems.first().waitFor({ state: 'visible', timeout: 10000 });
    await productsPage.sortBy('Price: Low to High');
    await productsPage.productItems.first().waitFor({ state: 'visible', timeout: 10000 });
    await expect(productsPage.productItems.first()).toBeVisible();
  });

  test('sort books by name a to z keeps products visible', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await page.goto('https://demo.nopcommerce.com/books');
    await page.waitForLoadState('domcontentloaded');
    await productsPage.productItems.first().waitFor({ state: 'visible', timeout: 10000 });
    await productsPage.sortBy('Name: A to Z');
    await productsPage.productItems.first().waitFor({ state: 'visible', timeout: 10000 });
    await expect(productsPage.productItems.first()).toBeVisible();
  });
});