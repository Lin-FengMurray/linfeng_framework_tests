// e2e — Register, login, search for a product, add to cart, complete checkout
import { test, expect } from '../../fixtures/index.js';
import productsData from '../../test-data/products.json' assert { type: 'json' };
import paymentCards from '../../test-data/paymentCards.json' assert { type: 'json' };
import { ProductGrid } from '../../components/ProductGrid.js';
import { completeCheckout } from '../../utils/checkoutHelpers.js';

test('register login search and buy product', async ({
  page, freshUser, loginPage, productsPage, cartPage, cartModal, orderPlacedPage,
}) => {
  // This test logs in, searches, and completes checkout — give it a generous budget.
  test.setTimeout(90_000);
  const { searchTerm } = productsData[0]; // "dress"
  const validCard = paymentCards.find(c => c.label === 'Visa valid');

  // Log in with the pre-created user
  await loginPage.goto();
  await loginPage.loginAs(freshUser.email, freshUser.password);

  // Search for dress and add first result
  await productsPage.goto();
  await productsPage.search(searchTerm);
  // After search, results are rendered into .features_items (the site's
  // standard product grid) — #searched-products only appears much later via
  // a deferred DOM manipulation and is not reliably testable.
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  // Complete checkout
  await cartPage.goto();
  await completeCheckout(page, { paymentCard: validCard });

  await expect(orderPlacedPage.congratsMessage).toBeVisible();
});
