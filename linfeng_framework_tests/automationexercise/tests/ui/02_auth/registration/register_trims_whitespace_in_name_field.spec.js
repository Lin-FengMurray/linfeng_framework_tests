// edge — Name field with leading/trailing whitespace still registers successfully
import { test, expect } from '../../../../fixtures/index.js';
import { createUser } from '../../../../utils/testDataFactory.js';

test('register trims whitespace in name field', async ({ page, loginPage, signupPage, accountCreatedPage, api }) => {
  const user = createUser();
  const paddedName = `  ${user.name}  `;

  await loginPage.goto();
  await loginPage.signupName.fill(paddedName);
  await loginPage.signupEmail.fill(user.email);
  await loginPage.signupButton.click();

  await expect(page).toHaveURL(/signup/);
  await signupPage.fillForm(user);
  await signupPage.submit();

  await expect(accountCreatedPage.heading).toBeVisible();
  await accountCreatedPage.continue();
  // Site trims the name — logged-in label shows trimmed version
  await expect(page.locator(`a:has-text("Logged in as ${user.name}")`)).toBeVisible();

  await api.deleteAccount(user.email, user.password);
});
