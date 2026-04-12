import { test, expect } from '@playwright/test';

test.describe('Homepage - Header Navigation Links Visible', () => {

  test('all header navigation links are visible', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/news');

    const navLinks = ['new', 'past', 'comments', 'ask', 'show', 'jobs', 'submit', 'login'];
    for (const link of navLinks) {
      await expect(page.getByRole('link', { name: link, exact: true })).toBeVisible();
    }
  });
});
