// utils/assertions.js

import { expect } from '../fixtures/index.js';

/**
 * Assert that a product with the given name is visible on the page.
 * @param {import('@playwright/test').Page} page
 * @param {string} productName
 */
export async function assertProductVisible(page, productName) {
  await expect(page.locator(`:has-text("${productName}")`).first()).toBeVisible();
}

/**
 * Assert that the cart has at least `minCount` rows.
 * @param {import('@playwright/test').Page} page
 * @param {number} minCount
 */
export async function assertCartHasItems(page, minCount = 1) {
  const rows = page.locator('#cart_info_table tbody tr');
  const count = await rows.count();
  expect(count).toBeGreaterThanOrEqual(minCount);
}
