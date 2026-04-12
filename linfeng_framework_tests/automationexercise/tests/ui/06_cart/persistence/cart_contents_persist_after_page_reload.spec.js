// edge — Cart contents persist after a full page reload
import { test, expect } from '../../../../fixtures/index.js';
import { clearCart } from '../../../../utils/cartHelpers.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test.beforeEach(async ({ page }) => {
  await clearCart(page);
});

test('cart contents persist after page reload', async ({ page, productsPage, cartPage, cartModal }) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  await cartPage.goto();
  await page.reload();

  const count = await cartPage.cartRows.count();
  expect(count).toBeGreaterThanOrEqual(1);
});
