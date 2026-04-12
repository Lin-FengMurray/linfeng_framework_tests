import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../../pages/ProductDetailPage.js';
import { CartPage } from '../../../pages/CartPage.js';
import { Header } from '../../../components/Header.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/** SKIPPED: Cloudflare blocks POST to /addproducttocart/. Fix: local instance. */
test.describe('Add to Cart - Single Product', () => {
  test.skip(true, 'Cloudflare blocks add-to-cart POST — run against local instance');

  test('add book to cart shows success notification and updates cart count', async ({ page }) => {
    const header = new Header(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);
    await page.goto(`${BASE_URL}${products.books.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.productName.waitFor({ state: 'visible', timeout: 10000 });
    await productDetailPage.addToCart();
    await productDetailPage.successNotification.waitFor({ state: 'visible', timeout: 10000 });
    await expect(productDetailPage.successNotification).toBeVisible();
    await expect(header.cartQuantity).toContainText('(1)');
    await page.goto(`${BASE_URL}/cart`);
    await cartPage.cartPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cartPage.cartRows).toHaveCount(1);
    await expect(cartPage.productLinks.first()).toContainText(products.books.productName);
  });
});