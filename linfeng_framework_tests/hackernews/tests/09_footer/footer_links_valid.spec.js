import { test, expect } from '@playwright/test';

test.describe('Footer - Footer Links Valid', () => {

  test('all footer links are visible and point to the correct URLs', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/news');
    await page.waitForLoadState('domcontentloaded');

    const links = [
      { name: 'Guidelines', url: /newsguidelines/ },
      { name: 'FAQ', url: /faq/ },
      { name: 'Lists', url: /lists/ },
      { name: 'API', url: 'https://github.com/HackerNews/API' },
      { name: 'Security', url: /security/ },
      { name: 'Legal', url: /legal/ },
      { name: 'Apply to YC', url: /ycombinator/ },
    ];

    for (const { name, url } of links) {
      const link = page.getByRole('link', { name, exact: true });
      await expect(link).toBeVisible();
      const href = await link.getAttribute('href');
      expect(href).toMatch(url);
    }

    const contactLink = page.locator('a[href^="mailto:"]');
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute('href', 'mailto:hn@ycombinator.com');
  });
});
