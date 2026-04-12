/**
 * cartMock.js
 *
 * Intercepts nopCommerce add-to-cart POST requests that are blocked by
 * Cloudflare bot protection on demo.nopcommerce.com.
 *
 * Usage:
 *   import { mockAddToCart } from '../../../fixtures/cartMock.js';
 *   await mockAddToCart(page, 1);  // call BEFORE page.goto()
 */

export async function mockAddToCart(page, quantity = 1) {
  await page.route('**/addproducttocart/**', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        message: 'The product has been added to your shopping cart',
        updatetopcartsectionhtml: `(${quantity})`,
        updateflyoutcartsectionhtml: true,
      }),
    });
  });
}