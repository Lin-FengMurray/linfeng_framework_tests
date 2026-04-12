import { test, expect } from '@playwright/test';

test.describe('Show Page - Article Title Redirects Outside HN', () => {

  test('clicking the article title redirects to an external site outside Hacker News', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/show');

    const stories = page.locator('.athing');
    const titles = stories.locator('.titleline a');

    await titles.first().click();
    await expect(page).not.toHaveURL(/news\.ycombinator\.com\/show/);
  });
});
