import { test, expect } from '@playwright/test';

test.describe('Ask Page - Author Click Navigates to Profile', () => {

  test('clicking the author name navigates to the author profile page', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/ask');

    const authors = page.locator('.hnuser');
    const firstAuthor = authors.first();
    const authorName = await firstAuthor.innerText();

    await firstAuthor.click();
    await expect(page).toHaveURL(/user\?id=/);
    await expect(page.locator('body')).toContainText(authorName);
  });
});
