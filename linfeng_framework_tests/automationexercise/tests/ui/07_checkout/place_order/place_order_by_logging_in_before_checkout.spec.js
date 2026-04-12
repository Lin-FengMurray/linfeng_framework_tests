// TC16 — Place order by logging in before checkout (session already active via authedPage)
import { test, expect } from '../../../../fixtures/index.js';
import paymentCards from '../../../../test-data/paymentCards.json' assert { type: 'json' };
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('place order by logging in before checkout', async ({
  authedPage, page, productsPage, cartPage, cartModal,
  checkoutPage, paymentPage, orderPlacedPage,
}) => {
  const validCard = paymentCards.find(c => c.label === 'Visa valid');

  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  await cartPage.goto();
  await cartPage.proceedToCheckoutAsLoggedIn();
  await checkoutPage.fillComment('Automated test order');
  await checkoutPage.placeOrder();
  await paymentPage.fillCard(validCard);
  await paymentPage.submit();

  await expect(orderPlacedPage.congratsMessage).toBeVisible();
});
