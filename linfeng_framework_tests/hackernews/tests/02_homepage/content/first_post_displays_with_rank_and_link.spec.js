import { test, expect } from '@playwright/test';

test.describe('Homepage - First Post Displays With Rank and Link', () => {

  test('first post is displayed with a rank and a link', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/news');

    const posts = page.locator('.athing');
    const firstPost = posts.first();

    await expect(firstPost).toBeVisible();
    const count = await posts.count();
    expect(count).toBeGreaterThan(0);

    await expect(firstPost.locator('.rank')).toBeVisible();
    const firstPostLink = firstPost.locator('a').first();
    await expect(firstPostLink).toBeVisible();
  });
});
