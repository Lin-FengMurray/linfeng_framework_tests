// advanced — Product listing renders without crash when API returns an empty list
import { test, expect } from '../../../../fixtures/index.js';

test('product listing renders with stubbed api response', async ({ page, productsPage }) => {
  // Stub the products list endpoint with an empty products array
  await page.route('**/productsList', route =>
    route.fulfill({
      status:      200,
      contentType: 'application/json',
      body:        JSON.stringify({ products: [] }),
    })
  );

  await productsPage.goto();

  // Page should load without crashing
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('#header')).toBeVisible();
});
