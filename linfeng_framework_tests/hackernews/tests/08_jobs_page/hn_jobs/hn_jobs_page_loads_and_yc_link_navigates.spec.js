import { test, expect } from '@playwright/test';

test.describe('Jobs Page - HN Jobs Page Loads', () => {

  test('HN Jobs page loads and the YC Jobs link is visible and navigates correctly', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/jobs');

    const ycJobsLink = page.getByRole('link', { name: 'ycombinator.com/jobs' });
    await expect(ycJobsLink).toBeVisible();

    await ycJobsLink.click();
    await expect(page).toHaveURL(/ycombinator.com\/jobs/);
  });
});
