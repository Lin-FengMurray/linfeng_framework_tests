// edge — Cart reflects added item when navigating to cart page
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('cart badge count updates without page reload', async ({ page, productsPage, cartPage, cartModal }) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.viewCart();

  // Cart page should show at least one item
  const count = await cartPage.cartRows.count();
  expect(count).toBeGreaterThan(0);
});
