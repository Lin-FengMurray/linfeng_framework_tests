// edge — Searching with an empty term does not crash the page
import { test, expect } from '../../../../fixtures/index.js';

test('search with empty term shows all or message', async ({ page, productsPage }) => {
  await productsPage.goto();
  await productsPage.search('');
  // Page should still be functional — body has content and no server error
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('h2.title')).toBeVisible();
});
