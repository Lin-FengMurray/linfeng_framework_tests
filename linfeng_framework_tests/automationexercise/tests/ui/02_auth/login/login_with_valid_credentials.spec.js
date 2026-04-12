// TC02 — Login with valid credentials
import { test, expect } from '../../../../fixtures/index.js';

test('login with valid credentials @TC02', async ({ freshUser, loginPage, page }) => {
  await loginPage.goto();
  await loginPage.loginAs(freshUser.email, freshUser.password);

  await expect(page.locator(`a:has-text("Logged in as ${freshUser.name}")`)).toBeVisible();
});
