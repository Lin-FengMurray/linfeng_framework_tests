import { test, expect } from '@playwright/test';

test.describe('Basic Authentication - Valid Login', () => {

  test('valid credentials grant access to the basic auth protected page', async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: { username: 'admin', password: 'admin' },
    });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await expect(page.locator('.example')).toContainText('Congratulations! You must have the proper credentials.');
    await context.close();
  });
});
