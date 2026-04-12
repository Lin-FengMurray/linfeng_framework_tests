// TC03 — Login shows error for wrong password
import { test, expect } from '../../../../fixtures/index.js';

test('login shows error for wrong password @TC03', async ({ freshUser, loginPage }) => {
  await loginPage.goto();
  await loginPage.loginAs(freshUser.email, 'WrongPassword!99');

  await expect(loginPage.loginError).toBeVisible();
});
