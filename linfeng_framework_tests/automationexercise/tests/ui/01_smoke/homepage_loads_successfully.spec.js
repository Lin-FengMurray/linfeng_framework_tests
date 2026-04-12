// UI-01 — Homepage loads successfully
import { test, expect } from '../../../fixtures/index.js';

test('homepage loads successfully', async ({ homePage, page }) => {
  await homePage.goto();
  await expect(page).toHaveTitle(/Automation Exercise/i);
  await expect(homePage.slider).toBeVisible();
  await expect(homePage.featuredItems).toBeVisible();
});
