// TC15 — Payment succeeds with valid card details
import { test, expect } from '../../../../fixtures/index.js';
import paymentCards from '../../../../test-data/paymentCards.json' assert { type: 'json' };
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('payment succeeds with valid card details', async ({
  authedPage, page, freshUser, productsPage, cartPage, cartModal,
  checkoutPage, paymentPage, orderPlacedPage,
}) => {
  const validCard = paymentCards.find(c => c.label === 'Visa valid');

  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  await cartPage.goto();
  await cartPage.proceedToCheckoutAsLoggedIn();
  await checkoutPage.fillComment('Valid card test');
  await checkoutPage.placeOrder();
  await paymentPage.fillCard({ ...validCard, name: `${freshUser.firstName} ${freshUser.lastName}` });
  await paymentPage.submit();

  await expect(orderPlacedPage.congratsMessage).toBeVisible();
});
