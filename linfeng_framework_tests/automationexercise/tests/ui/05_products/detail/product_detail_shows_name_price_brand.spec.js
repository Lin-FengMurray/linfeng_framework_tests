// TC08 — Product detail page shows name, price, and brand
import { test, expect } from '../../../../fixtures/index.js';

test('product detail shows name price and brand', async ({ page, productDetailPage }) => {
  // Navigate directly to avoid ad vignette interrupting product list clicks
  await page.goto('/product_details/1');
  await expect(productDetailPage.productName).toBeVisible();
  await expect(productDetailPage.price).toBeVisible();
  await expect(productDetailPage.brand).toBeVisible();
});
