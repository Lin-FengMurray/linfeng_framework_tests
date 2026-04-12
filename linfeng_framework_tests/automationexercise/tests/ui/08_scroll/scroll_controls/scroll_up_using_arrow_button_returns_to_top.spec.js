// TC25 — Scroll up using the arrow button returns the page to the top
import { test, expect } from '../../../../fixtures/index.js';

test('scroll up using arrow button returns to top', async ({ page, homePage }) => {
  await homePage.goto();

  // Scroll to the bottom of the page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Arrow button should become visible after scrolling down
  const scrollUpBtn = page.locator('#scrollUp');
  await expect(scrollUpBtn).toBeVisible({ timeout: 5000 });

  // Click the arrow
  await scrollUpBtn.click();

  // Wait for scroll animation to complete, then assert near the top
  await page.waitForFunction(() => window.scrollY < 200, { timeout: 10000 });
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeLessThan(200);
});
