import { test, expect } from '@playwright/test';

test.describe('Search - Search Redirects to Algolia', () => {

  test('the search tool at the bottom of the page redirects to Algolia with the query in the URL', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/');

    const searchInput = page.locator('input[name="q"]');
    await searchInput.fill('Test');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/hn\.algolia\.com/);
    await expect(page).toHaveURL(/q=Test/);
  });
});
