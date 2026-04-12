import { test, expect } from '@playwright/test';
import HackerNewsSearchPage from '../../pages/HackerNewsSearchPage.js';

test.describe('Search - Search Input Has Correct ARIA Role', () => {

  test('the search input has the correct ARIA type attribute for accessibility', async ({ page }) => {
    const searchPage = new HackerNewsSearchPage(page);
    await searchPage.navigate();
    await expect(searchPage.searchInput).toHaveAttribute('type', 'search');
  });
});
