import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductDetailPage } from '../../pages/ProductDetailPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import products from '../../fixtures/products.json' assert { type: 'json' };
import users from '../../fixtures/users.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/** SKIPPED: All steps involve Cloudflare-blocked POSTs. Fix: local instance. */
test.describe('E2E - Register Login and Buy Book', () => {
  test.skip(true, 'Cloudflare blocks all POST requests in this flow — run against local instance');

  test('user registers logs in and completes a book purchase', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const email = `linfeng_${Date.now()}@test.com`;
    await page.goto(`${BASE_URL}/register`);
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#FirstName').fill(users.validUser.firstName);
    await page.locator('#LastName').fill(users.validUser.lastName);
    await page.locator('#Email').fill(email);
    await page.locator('#Password').fill(users.validUser.password);
    await page.locator('#ConfirmPassword').fill(users.validUser.password);
    await page.locator('#register-button').click();
    await page.locator('.result').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.locator('.result')).toContainText('Your registration completed');
    await loginPage.open();
    await loginPage.login({ email, password: users.validUser.password });
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