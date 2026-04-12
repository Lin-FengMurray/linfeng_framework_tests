// edge — Submitting signup name step with empty fields stays on login page
import { test, expect } from '../../../../fixtures/index.js';

test('register with empty name shows no navigation', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.signupName.fill('');
  await loginPage.signupEmail.fill('noname@example.com');
  await loginPage.signupButton.click();

  // Browser required-field validation prevents navigation
  await expect(page).toHaveURL(/login/);
});

test('register with empty email shows no navigation', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.signupName.fill('Some Name');
  await loginPage.signupEmail.fill('');
  await loginPage.signupButton.click();

  await expect(page).toHaveURL(/login/);
});
