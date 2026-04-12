// e2e — Returning user places a second order from the same account
import { test, expect } from '../../fixtures/index.js';
import paymentCards from '../../test-data/paymentCards.json' assert { type: 'json' };
import { ProductGrid } from '../../components/ProductGrid.js';
import { completeCheckout } from '../../utils/checkoutHelpers.js';

test('returning user reorders from existing account', async ({
  authedPage, page, productsPage, cartPage, cartModal, orderPlacedPage,
}) => {
  const validCard = paymentCards.find(c => c.label === 'Visa valid');

  // First order
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();
  await cartPage.goto();
  await completeCheckout(page, { paymentCard: validCard });
  await expect(orderPlacedPage.congratsMessage).toBeVisible();

  // Second order — same account
  await productsPage.goto();
  await grid.addFirstToCart();
  await cartModal.continueShopping();
  await cartPage.goto();
  await completeCheckout(page, { paymentCard: validCard });
  await expect(orderPlacedPage.congratsMessage).toBeVisible();
});
