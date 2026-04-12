import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage.js';


test.describe('Password Recovery - Shows Error for Empty Email', () => {

  test('submitting recovery form with empty email shows validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://demo.nopcommerce.com/passwordrecovery');
    await page.waitForLoadState('domcontentloaded');
    // Bypass native browser HTML5 validation (type="email" + required) so jQuery validation fires
    await page.evaluate(() => {
      const el = document.querySelector('#Email');
      el.setAttribute('type', 'text');
      el.removeAttribute('required');
    });
    await loginPage.recoverButton.click();
    await expect(loginPage.emailError).toContainText('Enter your email', { timeout: 10000 });
  });
});