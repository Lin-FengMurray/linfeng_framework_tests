import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../../pages/ProductDetailPage.js';
import { WishlistPage } from '../../../pages/WishlistPage.js';
import { Header } from '../../../components/Header.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/** SKIPPED: Cloudflare blocks POST to /addproducttowishlist/. Fix: local instance. */
test.describe('Add to Wishlist - Multiple Products', () => {
  test.skip(true, 'Cloudflare blocks wishlist POST — run against local instance');

  test('add two products to wishlist results in 2 wishlist rows', async ({ page }) => {
    const header = new Header(page);
    const productDetailPage = new ProductDetailPage(page);
    const wishlistPage = new WishlistPage(page);
    await page.goto(`${BASE_URL}${products.books.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.addToWishlist();
    await productDetailPage.successNotification.waitFor({ state: 'visible', timeout: 10000 });
    await page.goto(`${BASE_URL}${products.computers.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.addToWishlist();
    await productDetailPage.successNotification.waitFor({ state: 'visible', timeout: 10000 });
    await expect(header.wishlistQuantity).toContainText('(2)');
    await header.goToWishlist();
    await wishlistPage.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(wishlistPage.wishlistRows).toHaveCount(2);
  });
});