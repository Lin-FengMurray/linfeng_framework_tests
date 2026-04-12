// edge — Already logged-in user visiting /login is redirected away (not shown the login form)
import { test, expect } from '../../../../fixtures/index.js';

test('authenticated user redirected away from login', async ({ authedPage: _, page }) => {
  await page.goto('/login');

  // Site redirects logged-in users — login form should not be visible
  await expect(page.locator('[data-qa="login-button"]')).not.toBeVisible();
});
