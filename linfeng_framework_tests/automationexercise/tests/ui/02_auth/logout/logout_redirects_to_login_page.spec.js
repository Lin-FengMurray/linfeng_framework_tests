// TC04 — Logout redirects to login page
import { test, expect } from '../../../../fixtures/index.js';

test('logout redirects to login page @TC04', async ({ authedPage, page }) => {
  await authedPage.locator('a:has-text("Logout")').click();

  await expect(page).toHaveURL(/login/);
});
