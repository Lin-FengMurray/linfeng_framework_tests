// TC22 — Add a recommended item to cart from the homepage
import { test, expect } from '../../../../fixtures/index.js';

test('add recommended item to cart from homepage', async ({
  authedPage, page, cartPage, cartModal,
}) => {
  // Recommended items carousel appears at the bottom of the home page
  await page.goto('/');
  await expect(page.locator('.recommended_items')).toBeVisible();
  // Add first recommended item using the class selector to avoid strict-mode with two links
  await page.locator('.recommended_items .product-image-wrapper').first().locator('a.add-to-cart').first().click();
  await cartModal.viewCart();
  const count = await cartPage.cartRows.count();
  expect(count).toBeGreaterThan(0);
});
