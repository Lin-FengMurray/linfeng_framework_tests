// advanced — Login UI handles a server 500 response without crashing
import { test, expect } from '../../../../fixtures/index.js';

test('login ui handles server 500 without crash', async ({ page, loginPage }) => {
  // Intercept POST to /login and return a 500
  await page.route('**/login', async route => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 500, body: 'Internal Server Error' });
    } else {
      await route.continue();
    }
  });

  await loginPage.goto();
  await loginPage.loginAs('test@example.com', 'password123');

  // Page should still render something — not a blank white screen
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('body')).not.toBeEmpty();
});
