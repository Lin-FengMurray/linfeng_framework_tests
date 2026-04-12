// TC08 — All Products page displays a product list
import { test, expect } from '../../../../fixtures/index.js';

test('all products page displays product list', async ({ page, productsPage }) => {
  await productsPage.goto();
  await expect(page.locator('.features_items h2.title')).toContainText('All Products');
  const count = await productsPage.productList.count();
  expect(count).toBeGreaterThan(0);
});
