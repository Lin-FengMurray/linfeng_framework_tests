// TC13 — Add product with custom quantity from the product detail page
import { test, expect } from '../../../../fixtures/index.js';
import { clearCart } from '../../../../utils/cartHelpers.js';

test.beforeEach(async ({ page }) => {
  await clearCart(page);
});

test('add product with custom quantity from detail', async ({ page, productDetailPage, cartPage, cartModal }) => {
  await page.goto('/product_details/1');

  // Set quantity to 3
  await productDetailPage.quantity.fill('3');
  await productDetailPage.addToCartBtn.click();
  await cartModal.viewCart();

  const qty = await cartPage.getQuantityForRow(0);
  expect(qty).toBe(3);
});
