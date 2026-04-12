import { test, expect } from '@playwright/test';
import HackerNewsSearchPage from '../../pages/HackerNewsSearchPage.js';

test.describe('Search - Search Returns No Results for Nonsense Query', () => {

  test('searching a nonsense string returns zero results', async ({ page }) => {
    const searchPage = new HackerNewsSearchPage(page);
    await searchPage.navigate();
    await searchPage.search('asdlkfjasldkfjqwoeir');

    const count = await searchPage.getResultsCount();
    expect(count).toBe(0);
  });
});
