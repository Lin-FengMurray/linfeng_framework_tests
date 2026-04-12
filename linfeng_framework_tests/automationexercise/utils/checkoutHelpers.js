// utils/checkoutHelpers.js
// Assumes the caller is already logged in and the cart has at least one item.

import { PaymentPage } from '../pages/PaymentPage.js';

/**
 * Complete the checkout flow from the cart page.
 *
 * Preconditions:
 *   - User is logged in
 *   - At least one item is in the cart
 *   - The browser is currently on the cart page (or will navigate there)
 *
 * @param {import('@playwright/test').Page} page
 * @param {{ paymentCard: { name: string, number: string, cvc: string, expiry: string } }} options
 */
export async function completeCheckout(page, { paymentCard }) {
  // Proceed to checkout
  await page.locator('a:has-text("Proceed To Checkout")').click();

  // Fill order comment and place order
  await page.locator('textarea[name="message"]').fill('Automated test order');
  await page.locator('a:has-text("Place Order")').click();

  // Fill payment details and submit
  const paymentPage = new PaymentPage(page);
  await paymentPage.fillCard(paymentCard);
  await paymentPage.submit();
}
