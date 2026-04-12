// edge — Payment is blocked when the card name field is left empty
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('payment blocked for empty card name', async ({
  authedPage, page, productsPage, cartPage, cartModal,
  checkoutPage, paymentPage, orderPlacedPage,
}) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  await cartPage.goto();
  await cartPage.proceedToCheckoutAsLoggedIn();
  await checkoutPage.fillComment('Edge case: empty name');
  await checkoutPage.placeOrder();

  // Fill all fields except name
  await paymentPage.cardNumber.fill('4111111111111111');
  await paymentPage.cardCvc.fill('123');
  await paymentPage.cardExpiry.fill('12');
  await paymentPage.cardYear.fill('2027');
  await paymentPage.submit();

  // Should remain on the payment page — order placed message should NOT appear
  await expect(orderPlacedPage.congratsMessage).not.toBeVisible();
});
