// visual — Products page visual snapshot
import { test, expect } from '../../../fixtures/index.js';

test('products page visual snapshot', async ({ page, productsPage }) => {
  await productsPage.goto();
  // Mask dynamic ad elements (ins placeholders, ad iframes) that change between runs.
  await expect(page).toHaveScreenshot('products-page.png', {
    mask: [page.locator('ins')],
    // Ad-heavy page: allow up to 12% pixel variance for layout shifts caused
    // by ads that load at different sizes across browsers and parallel runs.
    maxDiffPixelRatio: 0.12,
  });
});
