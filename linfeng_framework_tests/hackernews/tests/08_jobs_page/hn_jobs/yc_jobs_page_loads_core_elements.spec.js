import { test, expect } from '@playwright/test';

test.describe('Jobs Page - YC Jobs Page Loads Core Elements', () => {

  test('YC Jobs page loads with the correct title and a "Find a job" button', async ({ page }) => {
    await page.goto('https://ycombinator.com/jobs');

    await expect(page).toHaveTitle(/Startup Jobs/i);
    expect(page.getByRole('button', { name: 'Find a job ' })).toBeVisible;
  });
});
