import { test, expect } from '@playwright/test';
import HackerNewsSearchPage from '../../pages/HackerNewsSearchPage.js';

test.describe('Search - Search Updates URL Query Params', () => {

  test('searching updates the URL query parameters correctly', async ({ page }) => {
    const searchPage = new HackerNewsSearchPage(page);
    await searchPage.navigate();
    await searchPage.search('Playwright');

    await expect(page).toHaveURL(/query=Playwright/);
    const queryParam = searchPage.getQueryParam('query');
    expect(queryParam).toBe('Playwright');
  });
});
