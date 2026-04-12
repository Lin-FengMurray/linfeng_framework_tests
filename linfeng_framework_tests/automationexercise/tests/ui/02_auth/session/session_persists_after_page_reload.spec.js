// edge — Logged-in session survives a full page reload
import { test, expect } from '../../../../fixtures/index.js';

test('session persists after page reload', async ({ authedPage: _, freshUser, page }) => {
  await page.reload();

  await expect(page.locator(`a:has-text("Logged in as ${freshUser.name}")`)).toBeVisible();
  await expect(page.locator('a:has-text("Logout")')).toBeVisible();
});
