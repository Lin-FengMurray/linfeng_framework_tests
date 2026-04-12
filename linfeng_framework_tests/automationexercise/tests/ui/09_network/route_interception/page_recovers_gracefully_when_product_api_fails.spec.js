// advanced — Page recovers gracefully when the product API is aborted
import { test, expect } from '../../../../fixtures/index.js';

test('page recovers gracefully when product api fails', async ({ page, productsPage }) => {
  // Intercept the products API and abort it
  await page.route('**/api/productsList', route => route.abort());

  await productsPage.goto();

  // Page body should still render — no JS crash / white screen
  await expect(page.locator('body')).toBeVisible();
  // The site structure should still be present
  await expect(page.locator('#header')).toBeVisible();
});
