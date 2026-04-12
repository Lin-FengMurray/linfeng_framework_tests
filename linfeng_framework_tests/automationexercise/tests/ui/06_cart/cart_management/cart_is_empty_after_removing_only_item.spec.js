// edge — Cart is empty after removing the only item
import { test, expect } from '../../../../fixtures/index.js';
import { clearCart } from '../../../../utils/cartHelpers.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test.beforeEach(async ({ page }) => {
  await clearCart(page);
});

test('cart is empty after removing only item', async ({ page, productsPage, cartPage, cartModal }) => {
  // Add exactly one product
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.viewCart();

  // Remove it
  const deletedRow = cartPage.cartRows.first();
  await deletedRow.locator('a.cart_quantity_delete').click();

  // Wait for the row to be removed from the DOM before checking empty state.
  // Chrome's AJAX handler settles later than Firefox/WebKit, so polling
  // toBeVisible() alone times out before the display:none toggle fires.
  await expect(deletedRow).toBeHidden();

  // Cart should show empty state
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
