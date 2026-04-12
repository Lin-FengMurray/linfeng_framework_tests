// TC12 — Add a single product to cart from the listing page
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('add single product from listing', async ({ page, productsPage, cartPage, cartModal }) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();
  await cartPage.goto();
  const count = await cartPage.cartRows.count();
  expect(count).toBeGreaterThanOrEqual(1);
});
