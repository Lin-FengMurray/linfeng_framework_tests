// TC01 — Register with valid new user data
import { test, expect } from '../../../../fixtures/index.js';
import { createUser } from '../../../../utils/testDataFactory.js';

test('register with valid new user data @TC01', async ({ page, loginPage, signupPage, accountCreatedPage, api }) => {
  const user = createUser();

  await loginPage.goto();
  await loginPage.signupName.fill(user.name);
  await loginPage.signupEmail.fill(user.email);
  await loginPage.signupButton.click();

  await expect(page).toHaveURL(/signup/);
  await signupPage.fillForm(user);
  await signupPage.submit();

  await expect(accountCreatedPage.heading).toBeVisible();
  await accountCreatedPage.continue();
  await expect(page.locator(`a:has-text("Logged in as ${user.name}")`)).toBeVisible();

  // cleanup — delete account created during this test
  await api.deleteAccount(user.email, user.password);
});
