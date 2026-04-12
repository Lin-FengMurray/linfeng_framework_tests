// TC18 — Category sidebar filters products correctly
import { test, expect } from '../../../../fixtures/index.js';

test('category sidebar filters products correctly', async ({ page, productsPage, categorySidebar }) => {
  await productsPage.goto();
  // Clicking a top-level category only expands the accordion; click subcategory to navigate
  await categorySidebar.clickSubcategory('Women', 'Dress');
  await expect(page).toHaveURL(/category_products/i);
  await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();
});
