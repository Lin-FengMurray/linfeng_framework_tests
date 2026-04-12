import { test, expect } from '@playwright/test';

test.describe('Show Page - Ranks Increase Sequentially', () => {

  test('rank numbers on the show page increase sequentially', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/show');

    const ranks = page.locator('.rank');
    const rankTexts = await ranks.allTextContents();
    const numbers = rankTexts.map(text => Number(text.replace('.', '').trim()));

    for (let i = 1; i < numbers.length; i++) {
      expect(numbers[i]).toBe(numbers[i - 1] + 1);
    }
  });
});
