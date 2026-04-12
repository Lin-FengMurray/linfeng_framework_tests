import { test, expect } from '@playwright/test';

test.describe('Ask Page - Scores Formatted Correctly', () => {

  test('story scores on the ask page are numeric and formatted correctly', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/ask');

    const scores = page.locator('.score');
    const scoreTexts = await scores.allTextContents();

    for (const score of scoreTexts.slice(0, 5)) {
      expect(score).toMatch(/\d+\s+points?/);
    }
  });
});
