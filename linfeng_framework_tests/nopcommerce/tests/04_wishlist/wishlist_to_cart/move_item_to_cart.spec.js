import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../../pages/ProductDetailPage.js';
import { WishlistPage } from '../../../pages/WishlistPage.js';
import { CartPage } from '../../../pages/CartPage.js';
import { Header } from '../../../components/Header.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/** SKIPPED: Cloudflare blocks wishlist and cart POSTs. Fix: local instance. */
test.describe('Wishlist to Cart - Move Item', () => {
  test.skip(true, 'Cloudflare blocks wishlist + cart POST — run against local instance');

  test('move wishlist item to cart shows item in shopping cart', async ({ page }) => {
    const header = new Header(page);
    const productDetailPage = new ProductDetailPage(page);
    const wishlistPage = new WishlistPage(page);
    const cartPage = new CartPage(page);
    await page.goto(`${BASE_URL}${products.books.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.addToWishlist();
    await productDetailPage.successNotification.waitFor({ state: 'visible', timeout: 10000 });
    await header.goToWishlist();
    await wishlistPage.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await wishlistPage.selectAddToCartByIndex(0);
    await wishlistPage.clickAddToCart();
    await cartPage.cartPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cartPage.cartRows).toHaveCount(1);
    await expect(cartPage.productLinks.first()).toContainText(products.books.productName);
  });
});