// utils/authHelpers.js
// Standalone auth helpers — import page objects directly, do not use fixtures.

import { LoginPage }          from '../pages/LoginPage.js';
import { SignupPage }         from '../pages/SignupPage.js';
import { AccountCreatedPage } from '../pages/AccountCreatedPage.js';

/**
 * Navigate to /login and log in with the given credentials.
 * @param {import('@playwright/test').Page} page
 * @param {string} email
 * @param {string} password
 */
export async function loginAs(page, email, password) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginAs(email, password);
}

/**
 * Go to /login, fill the "New User Signup!" form with name + email,
 * click signup, fill the full registration form on SignupPage,
 * submit, then click Continue on AccountCreatedPage.
 *
 * @param {import('@playwright/test').Page} page
 * @param {Object} user - user object from createUser()
 */
export async function registerAndLogin(page, user) {
  // Step 1: navigate to login page and fill the signup section
  await page.goto('/login');
  await page.locator('[data-qa="signup-name"]').fill(user.name);
  await page.locator('[data-qa="signup-email"]').fill(user.email);
  await page.locator('[data-qa="signup-button"]').click();

  // Step 2: fill the full account creation form
  const signupPage = new SignupPage(page);
  await signupPage.fillForm(user);
  await signupPage.submit();

  // Step 3: confirm account created and continue
  const accountCreatedPage = new AccountCreatedPage(page);
  await accountCreatedPage.continue();
}
