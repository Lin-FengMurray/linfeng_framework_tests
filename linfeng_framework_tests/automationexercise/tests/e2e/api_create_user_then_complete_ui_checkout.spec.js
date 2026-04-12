// e2e — Create user via API, log in via UI, complete checkout, delete via API
import { test, expect } from '../../fixtures/index.js';
import { createUser } from '../../utils/testDataFactory.js';
import paymentCards from '../../test-data/paymentCards.json' assert { type: 'json' };
import { ProductGrid } from '../../components/ProductGrid.js';
import { completeCheckout } from '../../utils/checkoutHelpers.js';

test('api create user then complete ui checkout', async ({
  page, api, loginPage, productsPage, cartPage, cartModal, orderPlacedPage,
}) => {
  const user = createUser();
  const validCard = paymentCards.find(c => c.label === 'Visa valid');

  // Create account via API
  await api.createAccount(user);

  try {
    // Log in via UI
    await loginPage.goto();
    await loginPage.loginAs(user.email, user.password);

    // Add product and complete checkout
    await productsPage.goto();
    const grid = new ProductGrid(page);
    await grid.addFirstToCart();
    await cartModal.continueShopping();
    await cartPage.goto();
    await completeCheckout(page, { paymentCard: validCard });

    await expect(orderPlacedPage.congratsMessage).toBeVisible();
  } finally {
    // Always delete the account via API
    await api.deleteAccount(user.email, user.password);
  }
});
