// UI-01 — Core navigation links are accessible
import { test, expect } from '../../../fixtures/index.js';

const navLinks = [
  { label: 'Home',     path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Cart',     path: '/view_cart' },
  { label: 'Login',    path: '/login' },
];

for (const { label, path } of navLinks) {
  test(`nav link "${label}" resolves without error`, async ({ page }) => {
    const response = await page.goto(`https://www.automationexercise.com${path}`);
    expect(response.status()).toBeLessThan(400);
    await expect(page).not.toHaveURL(/error|404/i);
  });
}
