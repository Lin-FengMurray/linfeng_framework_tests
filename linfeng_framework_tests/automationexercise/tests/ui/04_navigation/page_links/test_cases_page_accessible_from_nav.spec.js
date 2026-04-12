// TC07 — Test Cases page is accessible from the nav header
import { test, expect } from '../../../../fixtures/index.js';

test('test cases page accessible from nav', async ({ page, homePage, testCasesPage, header }) => {
  await homePage.goto();
  await header.clickLink('Test Cases');
  await expect(page).toHaveURL(/test_cases/);
  await expect(testCasesPage.heading).toBeVisible();
});
