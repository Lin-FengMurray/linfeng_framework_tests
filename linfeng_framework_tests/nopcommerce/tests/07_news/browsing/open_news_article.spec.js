import { test, expect } from '@playwright/test';
import { NewsletterPage } from '../../../pages/NewsletterPage.js';

/** SKIPPED: Cloudflare terminates browser session on repeated automated requests. */
test.describe('News Browsing - Open News Article', () => {
  test.skip(true, 'Cloudflare terminates session on repeated automated requests — run against local instance');

  test('clicking news title opens article detail page with content', async ({ page }) => {
    const newsPage = new NewsletterPage(page);
    await newsPage.goToNewsPage();
    await newsPage.openFirstNewsItem();
    await expect(page).toHaveURL(/\/news\//);
    await expect(page.locator('.news-item-page')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.news-title')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.news-body')).toBeVisible({ timeout: 10000 });
  });
});