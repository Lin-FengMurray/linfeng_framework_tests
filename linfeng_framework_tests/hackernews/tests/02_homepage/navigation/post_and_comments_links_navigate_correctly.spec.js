import { test, expect } from '@playwright/test';

test.describe('Homepage - Post and Comments Links Navigate Correctly', () => {

  test('post link navigates to the article and comments link navigates to discussion', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/news');

    const firstPost = page.locator('.athing').first();
    const firstPostLink = firstPost.locator('.titleline > a');

    const postHref = await firstPostLink.getAttribute('href');
    await page.goto(postHref);
    expect(postHref).toMatch(/^https?:\/\//);

    await page.goBack();
    await expect(page).toHaveURL('https://news.ycombinator.com/news');

    const commentsLink = firstPost.locator(
      'xpath=following-sibling::tr[1]//a[contains(text(),"comment")]'
    );
    await commentsLink.click();
    await expect(page).toHaveURL(/item\?id=\d+/);
  });
});
