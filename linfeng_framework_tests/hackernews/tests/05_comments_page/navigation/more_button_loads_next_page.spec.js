import { test, expect } from '@playwright/test';

test.describe('Comments Page - More Button Loads Next Page', () => {

  test('"More" button navigates to the next page of comments', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newcomments');

    const comments = page.locator('.comment');
    const moreBtn = page.getByRole('link', { name: 'More', exact: true });

    const firstCommentBefore = await comments.first().locator('.commtext').innerText();
    await moreBtn.click();
    await expect(page).toHaveURL(/next=/);
    await expect(comments.first()).toBeVisible();

    const firstCommentAfter = await comments.first().locator('.commtext').innerText();
    expect(firstCommentAfter).not.toEqual(firstCommentBefore);
  });
});
