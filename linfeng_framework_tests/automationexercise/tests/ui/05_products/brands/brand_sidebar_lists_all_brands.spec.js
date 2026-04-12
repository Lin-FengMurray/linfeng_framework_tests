// TC19 — Brand sidebar lists all brands
import { test, expect } from '../../../../fixtures/index.js';

test('brand sidebar lists all brands', async ({ productsPage, brandSidebar }) => {
  await productsPage.goto();
  const brands = await brandSidebar.getBrandNames();
  expect(brands.length).toBeGreaterThan(0);
});
