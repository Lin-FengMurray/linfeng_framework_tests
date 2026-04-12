import { test, expect } from '@playwright/test';
import { NewsletterPage } from '../../../pages/NewsletterPage.js';

/** SKIPPED: Cloudflare blocks newsletter subscribe POST. */
test.describe('News Interactions - Subscribe to Newsletter', () => {
  test.skip(true, 'Cloudflare blocks newsletter POST + terminates session — run against local instance');

  test('subscribe with valid email shows thank you message', async ({ page }) => {
    const newsPage = new NewsletterPage(page);
    await page.goto('https://demo.nopcommerce.com');
    await page.waitForLoadState('domcontentloaded');
    await newsPage.subscribe(`linfeng_${Date.now()}@test.com`);
    await newsPage.getSubscriptionResult().waitFor({ state: 'visible', timeout: 10000 });
    await expect(newsPage.getSubscriptionResult()).toContainText('Thank you for signing up!');
  });
});