import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../../pages/RegisterPage.js';
import users from '../../../fixtures/users.json' assert { type: 'json' };

test.describe('Registration - Rejects Mismatched Passwords', () => {

  test('register form shows error when passwords do not match', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.open();
    await registerPage.registerUser({
      ...users.validUser,
      email: `linfeng_mismatch_${Date.now()}@example.com`,
      confirmPassword: 'MismatchPassword123!',
    });
    await expect(
      page.getByText('The password and confirmation password do not match.')
    ).toBeVisible({ timeout: 10000 });
  });
});