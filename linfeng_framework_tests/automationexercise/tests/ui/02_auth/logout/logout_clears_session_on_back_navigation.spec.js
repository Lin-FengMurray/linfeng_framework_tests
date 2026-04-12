// edge — After logout, navigating directly to a protected page does not restore the session
import { test, expect } from '../../../../fixtures/index.js';

test('logout clears session on direct navigation', async ({ authedPage, page }) => {
  await authedPage.locator('a:has-text("Logout")').click();
  await expect(page).toHaveURL(/login/);

  // Navigate directly to home — should not be logged in
  await page.goto('/');
  await expect(page.locator('a:has-text("Logout")')).not.toBeVisible();
  await expect(page.locator('a:has-text("Login")')).toBeVisible();
});
