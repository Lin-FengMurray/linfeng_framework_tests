import { test, expect } from '@playwright/test';
import HackerNewsSearchPage from '../../pages/HackerNewsSearchPage.js';

test.describe('Search - Sorting Updates URL and Results', () => {

  test('changing sort option updates the URL and results remain visible', async ({ page }) => {
    const searchPage = new HackerNewsSearchPage(page);
    await searchPage.navigate();
    await searchPage.search('JavaScript');

    await searchPage.selectSortOption('date');
    await expect(page).toHaveURL(/sort=byDate/, { timeout: 10000 });

    const sortParam = searchPage.getQueryParam('sort');
    expect(sortParam).toBe('byDate');

    const count = await searchPage.getResultsCount();
    expect(count).toBeGreaterThan(0);
  });
});
