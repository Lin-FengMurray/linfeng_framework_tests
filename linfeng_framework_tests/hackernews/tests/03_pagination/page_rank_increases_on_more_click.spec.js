import { test, expect } from '@playwright/test';
import HackerNewsPage from '../../pages/HackerNewsPage.js';

const MAX_PAGES_TO_CHECK = 5;

test.describe('Pagination - Page Rank Increases on More Click', () => {

  test('page rank increases with each click of the "More" button', async ({ page }) => {
    const hn = new HackerNewsPage(page);
    await hn.navigate();

    for (let i = 1; i <= MAX_PAGES_TO_CHECK; i++) {
      const rankBefore = await hn.getFirstRankNumber();
      await hn.clickMore();
      const rankAfter = await hn.getFirstRankNumber();

      expect(rankAfter).toBeGreaterThan(rankBefore);
      console.log(`Step ${i}: Rank increased from ${rankBefore} to ${rankAfter}`);
    }
  });
});
