// visual — Product detail page visual snapshot
import { test, expect } from '../../../fixtures/index.js';

test('product detail visual snapshot', async ({ page, productsPage }) => {
  await productsPage.goto();
  await productsPage.productList.first().locator('a[href*="/product_details/"]').click();
  await page.waitForURL(/\/product_details\//);
  // Screenshot only the product info block — this section is fully stable and
  // never covered by ad overlays, unlike the full-page which is polluted by
  // unpredictable video/modal ad units that appear at different times per run.
  await expect(page.locator('.product-information')).toHaveScreenshot('product-detail.png', {
    maxDiffPixelRatio: 0.03,
  });
});
