import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage.js';
import users from '../../../fixtures/users.json' assert { type: 'json' };


test.describe('Login - Shows Error for Invalid Email Format', () => {

  test('login with invalid email format shows email validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    // Bypass Chromium's native HTML5 email validation so the server-side error fires
    await page.evaluate(() => document.querySelector('#Email').setAttribute('type', 'text'));
    await loginPage.login(users.invalidEmailUser);
    await expect(loginPage.emailError).toContainText(
      /Wrong email|Please enter a valid email address\./
    );
  });

  test('login with empty form shows required field error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginButton.click();
    await expect(loginPage.emailError).toContainText('Please enter your email');
  });
});