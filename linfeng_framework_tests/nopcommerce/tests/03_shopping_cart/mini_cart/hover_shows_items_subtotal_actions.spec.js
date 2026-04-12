import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../../pages/ProductDetailPage.js';
import { Header } from '../../../components/Header.js';
import { MiniCart } from '../../../components/MiniCart.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/** SKIPPED: Cloudflare blocks POST to /addproducttocart/. Fix: local instance. */
test.describe('Mini Cart - Hover Shows Items Subtotal and Actions', () => {
  test.skip(true, 'Cloudflare blocks add-to-cart POST — run against local instance');

  test('hovering cart icon shows product name subtotal and action buttons', async ({ page }) => {
    const header = new Header(page);
    const productDetailPage = new ProductDetailPage(page);
    const miniCart = new MiniCart(page);
    await page.goto(`${BASE_URL}${products.books.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.addToCart();
    await productDetailPage.successNotification.waitFor({ state: 'visible', timeout: 10000 });
    await expect(header.cartQuantity).toContainText('(1)');
    await miniCart.hover();
    await expect(miniCart.flyoutCart).toBeVisible();
    await expect(miniCart.items).toHaveCount(1);
    await expect(miniCart.productNames.first()).toContainText(products.books.productName);
    await expect(miniCart.subtotal).toContainText('Sub-Total');
    await expect(miniCart.goToCartButton).toBeVisible();
    await expect(miniCart.checkoutButton).toBeVisible();
  });
});