// TC09 — Search returns matching products
import { test, expect } from '../../../../fixtures/index.js';
import productsData from '../../../../test-data/products.json' assert { type: 'json' };

test('search returns matching products', async ({ page, productsPage }) => {
  const { searchTerm } = productsData[0]; // "dress"
  await productsPage.goto();
  await productsPage.search(searchTerm);
  // Wait for at least one product card to be visible after the search
  const anyProduct = page.locator('.product-image-wrapper').first();
  await expect(anyProduct).toBeVisible();
  const count = await page.locator('.product-image-wrapper').count();
  expect(count).toBeGreaterThan(0);
});
