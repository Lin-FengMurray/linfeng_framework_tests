// visual — Cart modal visual snapshot
import { test, expect } from '../../../fixtures/index.js';
import { ProductGrid } from '../../../components/ProductGrid.js';

test('cart modal visual snapshot', async ({ page, productsPage, cartModal }) => {
  await productsPage.goto();
  const grid = new ProductGrid(page);
  // Trigger the cart modal by adding the first product
  await grid.addFirstToCart();
  await expect(cartModal.root).toBeVisible();
  // Screenshot the modal dialog only (not the full-screen backdrop, which shows
  // dynamic ad content and causes pixel churn between runs).
  await expect(page.locator('#cartModal .modal-content')).toHaveScreenshot('cart-modal.png', {
    // Allow up to 5% for sub-pixel font anti-aliasing differences across browsers.
    maxDiffPixelRatio: 0.05,
  });
});
