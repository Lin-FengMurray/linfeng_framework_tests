import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage.js';


test.describe('Login - Forgot Password Link Navigates to Recovery', () => {

  test('clicking forgot password link opens password recovery page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.forgotPasswordLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/passwordrecovery/i, { timeout: 10000 });
  });
});