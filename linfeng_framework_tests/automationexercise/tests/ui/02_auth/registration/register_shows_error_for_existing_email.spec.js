// TC05 — Register shows error for existing email
// Uses freshUser fixture so a pre-existing account is guaranteed without depending on TC01
import { test, expect } from '../../../../fixtures/index.js';

test('register shows error for existing email @TC05', async ({ freshUser, loginPage }) => {
  await loginPage.goto();
  await loginPage.signupName.fill('Any Name');
  await loginPage.signupEmail.fill(freshUser.email);
  await loginPage.signupButton.click();

  await expect(loginPage.signupError).toBeVisible();
});
