// edge — Guest cart persists after logging in
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('guest cart persists after logging in', async ({ page, freshUser, productsPage, cartPage, cartModal, loginPage }) => {
  // Add product as guest
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  // Log in
  await loginPage.goto();
  await loginPage.loginAs(freshUser.email, freshUser.password);

  // Cart should still have the item
  await cartPage.goto();
  const count = await cartPage.cartRows.count();
  expect(count).toBeGreaterThanOrEqual(1);
});
