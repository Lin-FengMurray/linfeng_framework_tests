import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage.js';
import { ProductDetailPage } from '../../../pages/ProductDetailPage.js';
import { CartPage } from '../../../pages/CartPage.js';
import { CheckoutPage } from '../../../pages/CheckoutPage.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };
import users from '../../../fixtures/users.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/** SKIPPED: Cloudflare blocks login, cart and checkout POSTs. Fix: local instance. */
test.describe('Registered Checkout - Complete Order', () => {
  test.skip(true, 'Cloudflare blocks login + cart + checkout POST — run against local instance');

  test('registered user completes checkout without guest step', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    await loginPage.open();
    await loginPage.login(users.validUser);
    await page.waitForURL(`${BASE_URL}/`, { timeout: 15000 });
    await page.goto(`${BASE_URL}${products.books.url}`);
    await page.waitForLoadState('domcontentloaded');
    await productDetailPage.addToCart();
    await productDetailPage.successNotification.waitFor({ state: 'visible', timeout: 10000 });
    await page.goto(`${BASE_URL}/cart`);
    await cart.acceptTermsOfService();
    await cart.clickCheckout();
    await checkout.continueBilling();
    await checkout.continueShippingMethod();
    await checkout.continuePaymentMethod();
    await checkout.continuePaymentInfo();
    await checkout.confirmOrder();
    await checkout.getSuccessMessage().waitFor({ state: 'visible', timeout: 15000 });
    await expect(checkout.getSuccessMessage()).toContainText('successfully processed');
  });
});