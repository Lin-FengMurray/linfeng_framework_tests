import { test, expect } from '@playwright/test';
import HackerNewsSearchPage from '../../pages/HackerNewsSearchPage.js';

test.describe('Search - Search Results Load Within Threshold', () => {

  test('search results load within 2 seconds', async ({ page }) => {
    const searchPage = new HackerNewsSearchPage(page);
    await searchPage.navigate();

    const startTime = Date.now();
    await searchPage.search('performance');
    await expect(searchPage.results.first()).toBeVisible();

    const duration = Date.now() - startTime;
    console.log(`Search completed in ${duration}ms`);
    expect(duration).toBeLessThan(2000);
  });
});
