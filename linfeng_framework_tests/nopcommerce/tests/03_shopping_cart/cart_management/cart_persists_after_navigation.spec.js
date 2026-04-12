import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../../pages/ProductDetailPage.js';
import { CartPage } from '../../../pages/CartPage.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/** SKIPPED: Cloudflare blocks POST to /addproducttocart/. Fix: local instance. */
test.describe('Cart Management - Cart Persists After Navigation', () => {
  test.skip(true, 'Cloudflare blocks add-to-cart POST — run against local instance');

  test('cart shows correct product after navigating away and back', async ({ page }) => {
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);
    await page.goto(`${BASE_URL}${products.books.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.addToCart();
    await productDetailPage.successNotification.waitFor({ state: 'visible', timeout: 10000 });
    await page.goto(`${BASE_URL}/cart`);
    await cartPage.cartPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cartPage.cartRows).toHaveCount(1);
    await expect(cartPage.productLinks.first()).toHaveText(products.books.productName);
  });
});