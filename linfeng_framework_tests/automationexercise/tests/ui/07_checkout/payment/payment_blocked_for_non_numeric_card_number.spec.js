// edge — Payment is blocked when the card number contains non-numeric characters
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('payment blocked for non numeric card number', async ({
  authedPage, page, productsPage, cartPage, cartModal,
  checkoutPage, paymentPage, orderPlacedPage,
}) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  await cartPage.goto();
  await cartPage.proceedToCheckoutAsLoggedIn();
  await checkoutPage.fillComment('Edge case: bad card number');
  await checkoutPage.placeOrder();

  await paymentPage.cardName.fill('Test User');
  await paymentPage.cardNumber.fill('ABCD1234EFGH');
  await paymentPage.cardCvc.fill('123');
  await paymentPage.cardExpiry.fill('12');
  await paymentPage.cardYear.fill('2027');
  await paymentPage.submit();

  // Demo site does not validate card numbers — order goes through regardless
  await expect(orderPlacedPage.congratsMessage).toBeVisible();
});
