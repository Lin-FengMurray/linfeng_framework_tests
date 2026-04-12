import { test, expect } from '@playwright/test';
import { NewsletterPage } from '../../../pages/NewsletterPage.js';

/** SKIPPED: Cloudflare terminates browser session on repeated automated requests. */
test.describe('News Browsing - View News List', () => {
  test.skip(true, 'Cloudflare terminates session on repeated automated requests — run against local instance');

  test('news page displays list of news items', async ({ page }) => {
    const newsPage = new NewsletterPage(page);
    await newsPage.goToNewsPage();
    await expect(page).toHaveURL(/\/news$/);
    await newsPage.newsItems.first().waitFor({ state: 'visible', timeout: 10000 });
    expect(await newsPage.getNewsItemsCount()).toBeGreaterThan(0);
  });
});