import { test, expect } from '@playwright/test';

test.describe('Comments Page - Page Displays Comments', () => {

  test('page loads and displays authors, comments, timestamps, and comment text', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newcomments');

    const authors = page.locator('.hnuser');
    const comments = page.locator('.comment');
    const timestamps = page.locator('.age a');
    const commentText = page.locator('.commtext');

    const elements = [
      { name: 'author', locator: authors },
      { name: 'comments', locator: comments },
      { name: 'timestamps', locator: timestamps },
      { name: 'commentText', locator: commentText },
    ];

    for (const { locator } of elements) {
      await expect(locator.first()).toBeVisible({ timeout: 5000 });
    }
  });
});
