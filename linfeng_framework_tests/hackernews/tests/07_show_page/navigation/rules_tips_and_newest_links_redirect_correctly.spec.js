import { test, expect } from '@playwright/test';

test.describe('Show Page - Rules, Tips, and Newest Links Redirect Correctly', () => {

  test('"rules", "tips", and "newest Show HN" links redirect to the correct pages', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/show');

    const rulesText = page.locator('text=Please read the Show HN rules and tips before posting');
    await expect(rulesText).toBeVisible();

    const rulesLink = page.locator('a', { hasText: 'rules' });
    await expect(rulesLink).toBeVisible();
    await rulesLink.click();
    await expect(page).toHaveURL(/showhn\.html/);
    await page.goBack();

    const tipsLink = page.locator('a', { hasText: 'tips' });
    await expect(tipsLink).toBeVisible();
    await tipsLink.click();
    await expect(page).not.toHaveURL(/show/);
    await page.goBack();

    const newestLink = page.locator('a[href="shownew"]');
    await expect(newestLink).toBeVisible();
    await newestLink.click();
    await expect(page).toHaveURL(/shownew/);
  });
});
