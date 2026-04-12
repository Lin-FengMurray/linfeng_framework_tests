import { test, expect } from '@playwright/test';

test.describe('Show Page - Comments Link Navigates to Discussion', () => {

  test('clicking the comments link navigates to the article discussion page', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/show');

    const commentsLink = page.locator('.subtext a')
      .filter({ hasText: /comment|discuss/ })
      .first();

    await commentsLink.click();
    await expect(page).toHaveURL(/item\?id=/);
  });
});
