// TC17 — Remove a product from the cart
import { test, expect } from '../../../../fixtures/index.js';
import { ProductGrid } from '../../../../components/ProductGrid.js';

test('remove product from cart', async ({ page, productsPage, cartPage, cartModal }) => {
  // The delete-from-cart AJAX can be slow on the live server under parallel load.
  test.setTimeout(60_000);

  // ── Setup: add one product to cart ────────────────────────────────────────
  await productsPage.goto();
  const grid = new ProductGrid(page);
  await grid.addFirstToCart();
  await cartModal.viewCart();
  // Wait for fonts/icons to load — the delete button (a.cart_quantity_delete) gets
  // its visual dimensions from the Font Awesome icon inside it; without networkidle
  // the element is 0×0 and Playwright cannot click it.
  await page.waitForLoadState('networkidle', { timeout: 20000 });

  // ── Assert cart has at least one item before we start ─────────────────────
  const countBefore = await cartPage.cartRows.count();
  expect(countBefore).toBeGreaterThanOrEqual(1);

  // ── Remove the first item ─────────────────────────────────────────────────
  const firstRow = cartPage.cartRows.first();
  await firstRow.locator('a.cart_quantity_delete').click();
  // Wait for the delete AJAX to remove the row from the DOM.
  await firstRow.waitFor({ state: 'detached', timeout: 25000 });

  if (countBefore === 1) {
    // Removed the only item — row is already gone; check empty state
    await expect(cartPage.cartRows).toHaveCount(0);
    await expect(cartPage.emptyCartMessage).toBeVisible();
  } else {
    // Still items remaining — verify count decreased by 1
    await expect(cartPage.cartRows).toHaveCount(countBefore - 1);
  }

});