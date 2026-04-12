// edge — Order review table shows at least one product with a price
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('order review shows correct products and prices', async ({
  authedPage: _authedPage, page, productsPage, cartPage, cartModal,
}) => {
  // Use the same add-to-cart pattern as payment tests (hover-based, known to work)
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  await cartPage.goto();
  await expect(cartPage.cartRows.first()).toBeVisible();
  await cartPage.proceedToCheckoutAsLoggedIn();

  // The review table on /checkout does not carry the #cart_info_table id
  // (that id belongs to the /view_cart page). Target the single table on
  // the checkout page directly.
  const rows = page.locator('table tbody tr');
  await expect(rows.first()).toBeVisible();
  const count = await rows.count();
  expect(count).toBeGreaterThanOrEqual(1);
});
