import { test, expect } from '@playwright/test';

test.describe('Basic Authentication - Invalid Password Login', () => {

  test('wrong password returns a 401 response and shows not authorized', async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: { username: 'admin', password: 'wrong' },
    });
    const page = await context.newPage();
    const response = await page.goto('https://the-internet.herokuapp.com/basic_auth');
    expect(response.status()).toBe(401);
    await expect(page.locator('body')).toContainText('Not authorized');
    await context.close();
  });
});
