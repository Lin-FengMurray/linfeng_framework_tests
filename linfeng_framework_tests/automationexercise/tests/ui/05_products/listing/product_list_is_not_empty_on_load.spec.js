// edge — Product list is not empty on load (uses ProductGrid component)
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('product list is not empty on load', async ({ page, productsPage }) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);
  const count = await grid.getCount();
  expect(count).toBeGreaterThan(0);
});
