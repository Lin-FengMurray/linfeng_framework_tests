import { test, expect } from '../../../fixtures/index.js';

test('search count matches between API and UI', async ({ api, page }) => {
  const term = 'top';
  const { body } = await api.searchProduct(term);
  const apiCount = body.products.length;

  await page.goto('/products');
  await page.locator('#search_product').fill(term);
  await page.locator('#submit_search').click();
  const uiProducts = page.locator('.productinfo');
  await expect(uiProducts.first()).toBeVisible();
  const uiCount = await uiProducts.count();

  expect(uiCount).toBe(apiCount);
});