// edge — Login with uppercased email fails (site is case-sensitive)
import { test, expect } from '../../../../fixtures/index.js';

test('login is case sensitive for email', async ({ freshUser, loginPage }) => {
  await loginPage.goto();
  await loginPage.loginAs(freshUser.email.toUpperCase(), freshUser.password);

  await expect(loginPage.loginError).toBeVisible();
});
