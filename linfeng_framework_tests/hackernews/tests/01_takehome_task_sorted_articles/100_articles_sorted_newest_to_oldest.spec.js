import { test, expect } from '@playwright/test';
import HackerNewsPage from '../../pages/HackerNewsPage.js';

test.describe('Sorted Articles - 100 Articles Sorted Newest to Oldest', () => {

  test('100 articles from the newest page are sorted newest to oldest', async ({ page }) => {
    const hnPage = new HackerNewsPage(page);
    test.setTimeout(60000);
    await hnPage.navigate();

    const timestamps = await hnPage.getTopTimestamps(100);
    expect(timestamps.length).toBe(100);

    for (let i = 0; i < timestamps.length - 1; i++) {
      const current = new Date(timestamps[i]).getTime();
      const next = new Date(timestamps[i + 1]).getTime();
      expect(current, `Row ${i} should be newer/equal to Row ${i + 1}`).toBeGreaterThanOrEqual(next);
    }
  });
});
