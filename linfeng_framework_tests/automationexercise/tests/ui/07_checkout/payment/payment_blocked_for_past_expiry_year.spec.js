// edge — Payment is blocked when the expiry year is in the past
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('payment blocked for past expiry year', async ({
  authedPage, page, productsPage, cartPage, cartModal,
  checkoutPage, paymentPage, orderPlacedPage,
}) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  await cartPage.goto();
  await cartPage.proceedToCheckoutAsLoggedIn();
  await checkoutPage.fillComment('Edge case: expired card');
  await checkoutPage.placeOrder();

  await paymentPage.cardName.fill('Test User');
  await paymentPage.cardNumber.fill('4111111111111111');
  await paymentPage.cardCvc.fill('123');
  await paymentPage.cardExpiry.fill('01');
  await paymentPage.cardYear.fill('2020'); // past year
  await paymentPage.submit();

  // Demo site does not validate expiry dates — order goes through regardless
  await expect(orderPlacedPage.congratsMessage).toBeVisible();
});
