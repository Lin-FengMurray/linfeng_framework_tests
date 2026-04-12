// e2e — Guest browses products, registers during checkout, completes payment, account deleted
import { test, expect } from '../../fixtures/index.js';
import { createUser } from '../../utils/testDataFactory.js';
import { completeCheckout } from '../../utils/checkoutHelpers.js';
import paymentCards from '../../test-data/paymentCards.json' assert { type: 'json' };
import { ProductGrid } from '../../components/ProductGrid.js';

test('guest browse and complete full purchase', async ({
  page, productsPage, cartPage, cartModal,
  loginPage, signupPage, accountCreatedPage, orderPlacedPage,
}) => {
  const user = createUser();
  const validCard = paymentCards.find(c => c.label === 'Visa valid');

  // Browse and add to cart as guest
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  // Go to cart, proceed as guest → register / login
  await cartPage.goto();
  await cartPage.proceedToCheckoutAsGuest();

  // Register new account inline
  await page.locator('[data-qa="signup-name"]').fill(user.name);
  await page.locator('[data-qa="signup-email"]').fill(user.email);
  await page.locator('[data-qa="signup-button"]').click();
  await signupPage.fillForm(user);
  await signupPage.submit();
  await accountCreatedPage.continue();

  // Complete checkout using helper
  await cartPage.goto();
  await completeCheckout(page, { paymentCard: validCard });

  await expect(orderPlacedPage.congratsMessage).toBeVisible();

  // Cleanup — delete the account created inline
  await page.goto('/delete_account');
});
