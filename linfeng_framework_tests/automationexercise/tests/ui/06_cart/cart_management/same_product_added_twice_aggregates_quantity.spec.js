// edge — Adding the same product twice aggregates the quantity
import { test, expect } from '../../../../fixtures/index.js';
import { clearCart } from '../../../../utils/cartHelpers.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test.beforeEach(async ({ page }) => {
  await clearCart(page);
});

test('same product added twice aggregates quantity', async ({ page, productsPage, cartPage, cartModal }) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);

  // Add the same product twice
  await grid.card(0).hoverAndAddToCart();
  await cartModal.continueShopping();
  await grid.card(0).hoverAndAddToCart();
  await cartModal.viewCart();

  const qty = await cartPage.getQuantityForRow(0);
  expect(qty).toBe(2);
});
