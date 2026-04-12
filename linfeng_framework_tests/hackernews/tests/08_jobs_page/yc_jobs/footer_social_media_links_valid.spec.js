import { test, expect } from '@playwright/test';

test.describe('YC Jobs - Footer Social Media Links Valid', () => {

  test('footer social media links are visible and point to the correct URLs', async ({ page }) => {
    await page.goto('https://www.ycombinator.com/jobs', { waitUntil: 'domcontentloaded' });

    const socialPlatforms = [
      { name: /twitter|x/i, expectedUrl: 'https://twitter.com/ycombinator' },
      { name: /facebook/i, expectedUrl: 'https://www.facebook.com/YCombinator/' },
      { name: /instagram/i, expectedUrl: 'https://www.instagram.com/ycombinator' },
      { name: /linkedin/i, expectedUrl: 'https://www.linkedin.com/school/y-combinator/' },
      { name: /Youtube/i, expectedUrl: 'https://www.youtube.com/c/ycombinator' },
    ];

    const footer = page.locator('footer');

    for (const platform of socialPlatforms) {
      const link = footer.getByRole('link', { name: platform.name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', platform.expectedUrl);
    }
  });
});
