// TC23 — Delivery address on checkout matches the registered user's data
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('address details match registered user data', async ({
  authedPage, page, freshUser, productsPage, cartPage, cartModal, checkoutPage,
}) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  await cartPage.goto();
  await cartPage.proceedToCheckoutAsLoggedIn();

  await expect(checkoutPage.addressDelivery).toContainText(freshUser.firstName);
  await expect(checkoutPage.addressDelivery).toContainText(freshUser.lastName);
});
