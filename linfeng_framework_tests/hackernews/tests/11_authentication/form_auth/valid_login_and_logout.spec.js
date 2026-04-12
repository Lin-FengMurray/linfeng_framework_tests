//***************************************************************************
// Hacker News does not allow automated sign-up or login testing, as it
// requires a real account and may trigger security blocks or CAPTCHAs.
// The tests below use a practice website to demonstrate authentication flows.
//***************************************************************************

import { test, expect } from '@playwright/test';

test.describe('Form Authentication - Valid Login and Logout', () => {

  test('valid login shows secure area confirmation and logout shows sign-out confirmation', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
  });
});
