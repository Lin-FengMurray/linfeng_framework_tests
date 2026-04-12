//***************************************************************************
// Hacker News does not allow automated sign-up or login testing, as it
// requires a real account and may trigger security blocks or CAPTCHAs.
// The tests below use a practice website to demonstrate authentication flows.
//***************************************************************************

import { test, expect } from '@playwright/test';

test.describe('Form Authentication - Invalid Login Attempts', () => {

  test('empty form, wrong username, and wrong password each show the correct error', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');

    await page.getByLabel('Username').fill('wrong');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');

    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('wrong');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });
});
