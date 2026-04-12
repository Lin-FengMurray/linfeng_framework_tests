// visual — Homepage visual snapshot
import { test, expect } from '../../../fixtures/index.js';

test('homepage visual snapshot', async ({ page, homePage }) => {
  await homePage.goto();
  // Mask dynamic content: ad elements and the hero carousel (slide changes between runs).
  await expect(page).toHaveScreenshot('homepage.png', {
    mask: [page.locator('ins'), page.locator('#slider-carousel')],
    // Ad-heavy page: allow up to 15% pixel variance for layout shifts caused
    // by ads loading at different sizes and carousel state across runs.
    maxDiffPixelRatio: 0.15,
  });
});
