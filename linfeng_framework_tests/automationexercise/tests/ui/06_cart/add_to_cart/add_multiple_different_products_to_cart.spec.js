// TC12 — Add multiple different products to cart
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('add multiple different products to cart', async ({ page, productsPage, cartPage, cartModal }) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);

  // Add first product
  await grid.card(0).hoverAndAddToCart();
  await cartModal.continueShopping();

  // Add second product
  await grid.card(1).hoverAndAddToCart();
  await cartModal.continueShopping();

  await cartPage.goto();
  const count = await cartPage.cartRows.count();
  expect(count).toBeGreaterThanOrEqual(2);
});
