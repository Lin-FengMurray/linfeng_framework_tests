// TC15 — Place order by registering before checkout (uses freshUser pre-created via API)
import { test, expect } from '../../../../fixtures/index.js';
import paymentCards from '../../../../test-data/paymentCards.json' assert { type: 'json' };
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('place order by registering before checkout', async ({
  page, freshUser, loginPage, productsPage, cartPage, cartModal,
  checkoutPage, paymentPage, orderPlacedPage,
}) => {
  const validCard = paymentCards.find(c => c.label === 'Visa valid');

  // Log in with the pre-registered user
  await loginPage.goto();
  await loginPage.loginAs(freshUser.email, freshUser.password);

  // Add product to cart
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  // Checkout
  await cartPage.goto();
  await cartPage.proceedToCheckoutAsLoggedIn();
  await checkoutPage.fillComment('Automated test order');
  await checkoutPage.placeOrder();
  await paymentPage.fillCard(validCard);
  await paymentPage.submit();

  await expect(orderPlacedPage.congratsMessage).toBeVisible();
});
