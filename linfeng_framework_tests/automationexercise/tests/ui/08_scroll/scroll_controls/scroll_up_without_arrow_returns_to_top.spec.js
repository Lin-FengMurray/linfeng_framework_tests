// TC26 — Scroll up without the arrow button returns the page to the top
import { test, expect } from '../../../../fixtures/index.js';

test('scroll up without arrow returns to top', async ({ page, homePage }) => {
  await homePage.goto();

  // Scroll to the bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Use keyboard/programmatic scroll instead of the arrow button
  await page.evaluate(() => window.scrollTo(0, 0));

  // Hero / slider should be visible again
  await expect(homePage.slider).toBeVisible();

  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBe(0);
});
