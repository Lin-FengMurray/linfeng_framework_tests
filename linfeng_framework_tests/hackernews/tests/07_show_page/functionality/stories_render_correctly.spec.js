import { test, expect } from '@playwright/test';

test.describe('Show Page - Stories Render Correctly', () => {

  test('show page stories render with title, rank, score, and author visible', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/show');

    const stories = page.locator('.athing');
    const titles = stories.locator('.titleline a');
    const ranks = page.locator('.rank');
    const scores = page.locator('.score');
    const authors = page.locator('.hnuser');

    const elements = [
      { name: 'story', locator: stories },
      { name: 'title', locator: titles },
      { name: 'rank', locator: ranks },
      { name: 'score', locator: scores },
      { name: 'author', locator: authors },
    ];

    for (const { locator } of elements) {
      await expect(locator.first()).toBeVisible({ timeout: 5000 });
    }
  });
});
