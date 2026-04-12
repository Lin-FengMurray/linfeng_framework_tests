import { test, expect } from '../../../fixtures/index.js';

test('account updated via API reflects in UI session', async ({ api, freshUser, loginPage, page }) => {
  const updated = { ...freshUser, name: 'Updated Contract Name' };
  await api.updateAccount(updated);

  await loginPage.goto();
  await loginPage.loginAs(freshUser.email, freshUser.password);
  await expect(page.locator('a:has-text("Logged in as Updated Contract Name")')).toBeVisible();
});