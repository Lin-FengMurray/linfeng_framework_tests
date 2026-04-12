// TC18 — Subcategory shows the correct product subset
import { test, expect } from '../../../../fixtures/index.js';

test('subcategory shows correct product subset', async ({ page, productsPage, categorySidebar }) => {
  await productsPage.goto();
  await categorySidebar.clickSubcategory('Women', 'Dress');
  // Heading should reference Women > Dress
  await expect(page.locator('h2.title').first()).toContainText(/dress/i);
});
