// edge — Search with SQL injection string does not crash the server
import { test, expect } from '../../../../fixtures/index.js';

test('search with sql injection does not crash', async ({ page, productsPage }) => {
  await productsPage.goto();
  await productsPage.search("' OR 1=1 --");
  // Page should render normally without a 500 or blank screen
  await expect(page.locator('body')).toBeVisible();
  // Should not show a raw server error
  await expect(page.locator('body')).not.toContainText('Internal Server Error');
});
