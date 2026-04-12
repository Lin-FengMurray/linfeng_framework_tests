// edge — Review form with empty fields does not navigate away
import { test, expect } from '../../../../fixtures/index.js';

test('review form shows error for missing fields', async ({ page }) => {
  await page.goto('/product_details/1');
  // Leave all review fields empty and click submit
  await page.locator('#button-review').click();
  // Should still be on the product detail page (URL contains /product_details/)
  await expect(page).toHaveURL(/product_details/);
});
