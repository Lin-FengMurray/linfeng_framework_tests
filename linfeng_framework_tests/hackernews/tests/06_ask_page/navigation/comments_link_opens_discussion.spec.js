import { test, expect } from '@playwright/test';

test.describe('Ask Page - Comments Link Opens Discussion', () => {

  test('clicking the comments link opens the discussion page', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/ask');

    const commentsLink = page.locator('.subtext a').filter({ hasText: /comment/ }).first();
    await commentsLink.click();
    await expect(page).toHaveURL(/item\?id=/);
  });
});
