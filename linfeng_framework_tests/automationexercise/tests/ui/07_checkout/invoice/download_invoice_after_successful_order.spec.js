// TC24 — Download invoice after a successful order
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('download invoice after successful order', async ({
  authedPage, page, freshUser, productsPage, cartPage, cartModal,
  checkoutPage, paymentPage, orderPlacedPage,
}) => {
  // Step 1: place a fresh order using this test's own isolated user
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  await cartPage.goto();
  await cartPage.proceedToCheckoutAsLoggedIn();
  await checkoutPage.fillComment('Invoice download test');
  await checkoutPage.placeOrder();
  await paymentPage.fillCard({
    name:   `${freshUser.firstName} ${freshUser.lastName}`,
    number: '4111111111111111',
    cvc:    '123',
    expiry: '12/2027',
  });
  await paymentPage.submit();

  // Step 2: verify order placed, then download invoice
  await expect(orderPlacedPage.congratsMessage).toBeVisible();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    orderPlacedPage.downloadInvoice(),
  ]);
  expect(download.suggestedFilename()).toMatch(/invoice/i);
});
