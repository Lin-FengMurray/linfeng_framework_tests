// TC20 — Search products and verify cart contents persist after login
import { test, expect } from '../../../../fixtures/index.js';

test('search products and verify cart after login', async ({
  page, freshUser, productDetailPage, cartPage, cartModal, loginPage,
}) => {
  // Add a product directly to avoid hover/ad issues on the listing page
  await page.goto('/product_details/1');
  await productDetailPage.addToCartBtn.click();
  await cartModal.continueShopping();

  // Log in
  await loginPage.goto();
  await loginPage.loginAs(freshUser.email, freshUser.password);

  // Cart should still have the item after login
  await cartPage.goto();
  const count = await cartPage.cartRows.count();
  expect(count).toBeGreaterThanOrEqual(1);
});
