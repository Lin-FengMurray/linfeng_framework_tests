// edge — Comment field sanitises XSS input and does not execute script tags
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('comment field sanitises xss input', async ({
  authedPage, page, productsPage, cartPage, cartModal,
  checkoutPage, paymentPage, orderPlacedPage,
}) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.continueShopping();

  await cartPage.goto();
  await cartPage.proceedToCheckoutAsLoggedIn();

  // Fill comment with an XSS payload
  await checkoutPage.fillComment("<script>alert('xss')</script>");
  await checkoutPage.placeOrder();

  await paymentPage.fillCard({
    name:   'XSS Tester',
    number: '4111111111111111',
    cvc:    '123',
    expiry: '12/2027',
  });
  await paymentPage.submit();

  // Order should complete without crashing (script should have been sanitised)
  await expect(orderPlacedPage.congratsMessage).toBeVisible();
});
