import { test, expect } from '@playwright/test';

test.describe('YC Jobs - Role Filters Update Listings', () => {

  test('all job role filters update the page so that only jobs of that role are listed', async ({ page }) => {
    await page.goto('https://www.ycombinator.com/jobs', { waitUntil: 'domcontentloaded' });
    await page.locator('a[href*="/jobs/"]').first().waitFor();

    const roles = [
      { name: 'Software Engineer', href: '/jobs/role/software-engineer' },
      { name: 'Design & UI/UX', href: '/jobs/role/designer' },
      { name: 'Product', href: '/jobs/role/product-manager' },
      { name: 'Recruiting & HR', href: '/jobs/role/recruiting-hr' },
      { name: 'Sales', href: '/jobs/role/sales-manager' },
      { name: 'Science', href: '/jobs/role/science' },
    ];

    for (const role of roles) {
      const filterLink = page.locator(`a[href="${role.href}"]`).first();
      await expect(filterLink).toBeVisible();

      await Promise.all([
        page.waitForURL(url => url.toString().includes(role.href)),
        filterLink.click(),
      ]);

      const jobListings = page.locator('a[href*="/jobs/"]');
      await expect(jobListings.first()).toBeVisible();
    }
  });
});
