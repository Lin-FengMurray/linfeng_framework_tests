// TC08 — Product detail page shows availability and condition
import { test, expect } from '../../../../fixtures/index.js';

test('product detail shows availability and condition', async ({ page, productDetailPage }) => {
  await page.goto('/product_details/1');
  await expect(productDetailPage.availability).toBeVisible();
  await expect(productDetailPage.condition).toBeVisible();
});
