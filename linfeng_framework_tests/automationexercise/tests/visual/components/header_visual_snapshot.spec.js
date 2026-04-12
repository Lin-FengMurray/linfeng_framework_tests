// visual — Header nav visual snapshot
import { test, expect } from '../../../fixtures/index.js';

test('header visual snapshot', async ({ homePage, header }) => {
  await homePage.goto();
  // Small tolerance for sub-pixel text anti-aliasing differences between runs.
  await expect(header.nav).toHaveScreenshot('header-nav.png', { maxDiffPixels: 1500 });
});
