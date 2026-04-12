// TC19 — Clicking a brand filters products by that brand
import { test, expect } from '../../../../fixtures/index.js';

test('clicking brand filters products by brand', async ({ page, productsPage, brandSidebar }) => {
  await productsPage.goto();
  await brandSidebar.clickBrand('Polo');
  await expect(page).toHaveURL(/brand_products/i);
  await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();
});
