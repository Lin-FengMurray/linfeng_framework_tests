import { test, expect } from '../../../fixtures/index.js';

test('brand list from API matches UI sidebar', async ({ api, page }) => {
  const { body } = await api.getBrands();
  const apiBrands = body.brands.map(b => b.brand.toLowerCase());

  await page.goto('/products');
  const sidebarBrands = await page.locator('.brands-name .nav li a').allInnerTexts();
  // Sidebar text is "(count)\nbrand name" — extract just the brand name after the newline.
  const uiBrands = sidebarBrands.map(b => {
    return b
      .trim()
      .replace(/^\(\d+\)/, '')   // handles "(6)polo" from WebKit
      .replace(/\(\d+\)/, '')    // handles "polo\n(6)" from Chromium/Firefox
      .trim()
      .toLowerCase();
  });

  for (const brand of apiBrands) {
    expect(uiBrands).toContain(brand);
  }
});