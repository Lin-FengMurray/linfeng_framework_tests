import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../../pages/ProductDetailPage.js';
import { CartPage } from '../../../pages/CartPage.js';
import { Header } from '../../../components/Header.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/** SKIPPED: Cloudflare blocks POST to /addproducttocart/. Fix: local instance. */
test.describe('Add to Cart - Custom Quantity', () => {
  test.skip(true, 'Cloudflare blocks add-to-cart POST — run against local instance');

  test('add computer with quantity 2 updates cart count to 2', async ({ page }) => {
    const header = new Header(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);
    await page.goto(`${BASE_URL}${products.computers.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.productName.waitFor({ state: 'visible', timeout: 10000 });
    await productDetailPage.addToCart(2);
    await productDetailPage.successNotification.waitFor({ state: 'visible', timeout: 10000 });
    await expect(header.cartQuantity).toContainText('(2)');
    await page.goto(`${BASE_URL}/cart`);
    await cartPage.cartPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cartPage.quantityInputs.first()).toHaveValue('2');
  });
});