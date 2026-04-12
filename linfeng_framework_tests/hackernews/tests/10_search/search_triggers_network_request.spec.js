import { test, expect } from '@playwright/test';
import HackerNewsSearchPage from '../../pages/HackerNewsSearchPage.js';

test.describe('Search - Search Triggers Network Request', () => {

  test('searching triggers a successful Algolia backend network request', async ({ page }) => {
    const searchPage = new HackerNewsSearchPage(page);
    await searchPage.navigate();

    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('algolia') && resp.status() === 200),
      searchPage.search('automation'),
    ]);

    expect(response.status()).toBe(200);
  });
});
