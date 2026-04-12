// TC14 — Place order by registering a new account during checkout
import { test, expect } from '../../../../fixtures/index.js';
import { createUser } from '../../../../utils/testDataFactory.js';
import paymentCards from '../../../../test-data/paymentCards.json' assert { type: 'json' };
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('place order by registering during checkout', async ({
  page, productsPage, cartPage, cartModal, checkoutPage, paymentPage, orderPlacedPage,
  signupPage, accountCreatedPage,
}) => {
  const user = createUser();
  const validCard = paymentCards.find(c => c.label === 'Visa valid');

  // Add product as guest
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  // Go to cart and proceed as guest → register / login
  await cartPage.goto();
  await cartPage.proceedToCheckoutAsGuest();

  // Register inline
  await page.locator('[data-qa="signup-name"]').fill(user.name);
  await page.locator('[data-qa="signup-email"]').fill(user.email);
  await page.locator('[data-qa="signup-button"]').click();
  await signupPage.fillForm(user);
  await signupPage.submit();
  await accountCreatedPage.continue();

  // Complete checkout
  await cartPage.goto();
  await cartPage.proceedToCheckoutAsLoggedIn();
  await checkoutPage.fillComment('Automated test order');
  await checkoutPage.placeOrder();
  await paymentPage.fillCard(validCard);
  await paymentPage.submit();

  await expect(orderPlacedPage.congratsMessage).toBeVisible();

  // Clean up — delete the account created inline
  await page.goto('/delete_account');
});
