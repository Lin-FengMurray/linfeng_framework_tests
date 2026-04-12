import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../../pages/ProductDetailPage.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };

test.describe('Product Detail - Price and Images', () => {
  test.skip(true, 'Cloudflare blocks product detail page — run against local instance');

  test('product detail page shows price', async ({ page }) => {
    const productDetailPage = new ProductDetailPage(page);
    await page.goto(`https://demo.nopcommerce.com${products.books.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.productPrice.waitFor({ state: 'visible', timeout: 10000 });
    const price = await productDetailPage.getProductPrice();
    expect(price).toContain('$');
  });

  test('product detail page shows add to cart button', async ({ page }) => {
    const productDetailPage = new ProductDetailPage(page);
    await page.goto(`https://demo.nopcommerce.com${products.books.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(productDetailPage.addToCartButton).toBeVisible();
  });
});