// edge — Checkout is blocked / no order summary when cart is empty
import { test, expect } from '../../../../fixtures/index.js';
import { clearCart } from '../../../../utils/cartHelpers.js';

test('checkout blocked when cart is empty', async ({ authedPage, page, cartPage }) => {
  await clearCart(page);
  await cartPage.goto();

  // The Proceed To Checkout button should either be absent or clicking it
  // should not show a checkout summary with products.
  const proceedBtn = cartPage.proceedToCheckout;
  const isVisible = await proceedBtn.isVisible();
  if (isVisible) {
    await proceedBtn.click();
    // Should not reach a page with an order table
    await expect(page.locator('#cart_info_table')).not.toBeVisible();
  } else {
    // Button is hidden — that's also acceptable
    await expect(proceedBtn).not.toBeVisible();
  }
});
