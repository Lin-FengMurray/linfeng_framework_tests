import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../../pages/ProductDetailPage.js';
import { WishlistPage } from '../../../pages/WishlistPage.js';
import { Header } from '../../../components/Header.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/** SKIPPED: Cloudflare blocks POST to /addproducttowishlist/. Fix: local instance. */
test.describe('Wishlist Management - Remove Product', () => {
  test.skip(true, 'Cloudflare blocks wishlist POST — run against local instance');

  test('remove product from wishlist shows empty wishlist message', async ({ page }) => {
    const header = new Header(page);
    const productDetailPage = new ProductDetailPage(page);
    const wishlistPage = new WishlistPage(page);
    await page.goto(`${BASE_URL}${products.books.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.addToWishlist();
    await productDetailPage.successNotification.waitFor({ state: 'visible', timeout: 10000 });
    await header.goToWishlist();
    await wishlistPage.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await wishlistPage.removeItemByIndex(0);
    await wishlistPage.updateWishlist();
    await wishlistPage.emptyWishlistMessage.waitFor({ state: 'visible', timeout: 10000 });
    await expect(wishlistPage.emptyWishlistMessage).toContainText('The wishlist is empty!');
  });
});