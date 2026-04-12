import { test, expect } from '@playwright/test';

test.describe('Pagination - More Link Loads Next Page', () => {

  test('"More" link loads additional posts with higher rank numbers', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/news');

    const moreLink = page.getByRole('link', { name: 'More', exact: true });
    const firstPost = page.locator('.athing').first();
    const firstPostLink = firstPost.locator('.titleline > a');

    const rankText1 = await page.locator('.rank').first().innerText();
    const firstRankPage1 = parseInt(rankText1);

    await moreLink.click();
    await expect(firstPostLink).toBeVisible();

    const rankText2 = await page.locator('.rank').first().innerText();
    const firstRankPage2 = parseInt(rankText2);

    expect(firstRankPage2).toBeGreaterThan(firstRankPage1);
  });
});
