import { test, expect } from '@playwright/test';

test.describe('Jobs Page - First Job Listing Works Correctly', () => {

  test('first job listing opens company profile and job page correctly', async ({ page }) => {
    await page.goto('https://www.ycombinator.com/jobs');

    const jobCards = page.locator('a[href*="/companies/"]');
    const firstJobCard = page.locator('[href*="/companies/"]').first().locator('..');

    await expect(page).toHaveTitle(/Jobs/i);
    await expect(jobCards.first()).toBeVisible();

    const companyLink = firstJobCard.locator('a[href*="/companies/"]').first();
    const [companyPage] = await Promise.all([
      page.waitForEvent('popup'),
      companyLink.click(),
    ]);
    await companyPage.waitForLoadState();
    await expect(companyPage).toHaveURL(/ycombinator.com\/companies/);
    await companyPage.close();

    const companyIcon = firstJobCard.locator('img').first();
    const [iconPage] = await Promise.all([
      page.waitForEvent('popup'),
      companyIcon.click(),
    ]);
    await iconPage.waitForLoadState();
    await expect(iconPage).toHaveURL(/ycombinator.com\/companies/);
    await iconPage.close();

    const jobTitle = firstJobCard.locator('a[target="_blank"]').first();
    const [jobPage] = await Promise.all([
      page.waitForEvent('popup'),
      jobTitle.click(),
    ]);
    await jobPage.waitForLoadState();
    await expect(jobPage).toHaveURL(/ycombinator\.com/);
    await jobPage.close();

    const applyButton = page.getByRole('button', { name: 'Apply' });
    expect(applyButton.first()).toBeVisible;
  });
});
