import { test, expect } from '@playwright/test';
import { NewsletterPage } from '../../../pages/NewsletterPage.js';

/** SKIPPED: Cloudflare blocks comment submit POST. */
test.describe('News Interactions - Submit Comment on Article', () => {
  test.skip(true, 'Cloudflare blocks comment POST + terminates session — run against local instance');

  test('submit comment on news article shows success message', async ({ page }) => {
    const newsPage = new NewsletterPage(page);
    await newsPage.goToNewsPage();
    await newsPage.openFirstNewsItem();
    await newsPage.addComment({ title: 'Great article', comment: 'Test comment from automation.' });
    await newsPage.getCommentSuccessResult().waitFor({ state: 'visible', timeout: 10000 });
    await expect(newsPage.getCommentSuccessResult()).toContainText('News comment is successfully added.');
  });
});