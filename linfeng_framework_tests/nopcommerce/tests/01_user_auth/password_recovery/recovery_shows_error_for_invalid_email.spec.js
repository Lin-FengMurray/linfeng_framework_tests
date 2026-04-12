import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage.js';
import users from '../../../fixtures/users.json' assert { type: 'json' };


test.describe('Password Recovery - Shows Error for Invalid Email Format', () => {

  test('submitting recovery form with invalid email format shows validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://demo.nopcommerce.com/passwordrecovery');
    await page.waitForLoadState('domcontentloaded');
    // Bypass Chromium's native HTML5 email validation so the server-side error fires
    await page.evaluate(() => document.querySelector('#Email').setAttribute('type', 'text'));
    await loginPage.recoveryEmailInput.fill(users.invalidEmailUser.email);
    await loginPage.recoverButton.click();
    await expect(loginPage.emailError).toContainText(
      /Wrong email|Please enter a valid email address\./,
      { timeout: 10000 }
    );
  });
});