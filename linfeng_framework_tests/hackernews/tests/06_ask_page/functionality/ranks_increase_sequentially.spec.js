import { test, expect } from '@playwright/test';

test.describe('Ask Page - Ranks Increase Sequentially', () => {

  test('rank numbers on the ask page increase sequentially', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/ask');

    const ranks = page.locator('.rank');
    const rankTexts = await ranks.allTextContents();
    expect(rankTexts.length).toBeGreaterThan(1);

    for (let i = 1; i < rankTexts.length; i++) {
      const prev = parseInt(rankTexts[i - 1]);
      const current = parseInt(rankTexts[i]);
      expect(current).toBe(prev + 1);
    }
  });
});
