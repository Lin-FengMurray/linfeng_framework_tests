import { test, expect } from '../../../fixtures/index.js';

test('account created via API is loginable in UI', async ({ freshUser, loginPage, page }) => {
  await loginPage.goto();
  await loginPage.loginAs(freshUser.email, freshUser.password);
  await expect(page.locator(`a:has-text("Logged in as")`)).toBeVisible();
});