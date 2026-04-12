import { test, expect } from '@playwright/test';

test.describe('Show Page - More Button Loads Next Page', () => {

  test('clicking the "More" button navigates to the next page of show stories', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/show');

    const stories = page.locator('.athing');
    const titles = stories.locator('.titleline a');
    const moreBtn = page.getByRole('link', { name: 'More', exact: true });

    const firstTitleBefore = await titles.first().innerText();
    await moreBtn.click();
    await expect(page).toHaveURL(/show\?p=/);

    const firstTitleAfter = await titles.first().innerText();
    expect(firstTitleAfter).not.toEqual(firstTitleBefore);
  });
});
