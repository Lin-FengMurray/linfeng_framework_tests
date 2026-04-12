import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../pages/ProductDetailPage.js';
import { WishlistPage } from '../../pages/WishlistPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import { Header } from '../../components/Header.js';
import products from '../../fixtures/products.json' assert { type: 'json' };
import users from '../../fixtures/users.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/** SKIPPED: All steps involve Cloudflare-blocked POSTs. Fix: local instance. */
test.describe('E2E - Wishlist to Cart Checkout', () => {
  test.skip(true, 'Cloudflare blocks all POST requests in this flow — run against local instance');

  test('user adds to wishlist moves to cart and completes checkout', async ({ page }) => {
    const header = new Header(page);
    const productDetailPage = new ProductDetailPage(page);
    const wishlist = new WishlistPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    await page.goto(`${BASE_URL}${products.books.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.addToWishlist();
    await productDetailPage.successNotification.waitFor({ state: 'visible', timeout: 10000 });
    await header.goToWishlist();
    await wishlist.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await wishlist.selectAddToCartByIndex(0);
    await wishlist.clickAddToCart();
    await page.goto(`${BASE_URL}/cart`);
    await cart.cartPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await cart.acceptTermsOfService();
    await cart.clickCheckout();
    await checkout.checkoutAsGuest();
    await checkout.fillBillingAddress({
      firstName: users.validUser.firstName,
      lastName: users.validUser.lastName,
      email: `linfeng_${Date.now()}@test.com`,
      country: 'United States',
      city: 'Ann Arbor',
      address1: '123 Test St',
      zip: '48103',
      phone: '1234567890',
    });
    await checkout.continueBilling();
    await checkout.continueShippingMethod();
    await checkout.continuePaymentMethod();
    await checkout.continuePaymentInfo();
    await checkout.confirmOrder();
    await checkout.getSuccessMessage().waitFor({ state: 'visible', timeout: 15000 });
    await expect(checkout.getSuccessMessage()).toContainText('successfully processed');
  });
});