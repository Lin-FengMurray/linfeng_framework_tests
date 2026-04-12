import { test, expect } from '@playwright/test';

test.describe('Comments Page - Author Name Navigates to Profile', () => {

  test('clicking the author name navigates to the author profile page', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newcomments');

    const firstAuthor = page.locator('.hnuser').first();
    const name = await firstAuthor.textContent();

    await firstAuthor.click();
    await expect(page).toHaveURL(/user\?id=/);
    await expect(page.locator('body')).toContainText(name);
  });
});
