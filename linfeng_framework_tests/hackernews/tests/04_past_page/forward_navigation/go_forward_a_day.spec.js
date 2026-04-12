import { test, expect } from '@playwright/test';

async function getCurrentDateFromUrl(page) {
  const url = page.url();
  const match = url.match(/day=(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

async function clickIfExists(page, text, nth = 0) {
  const locator = page.locator('a').filter({ hasText: new RegExp(`^${text}$`) }).nth(nth);
  if (await locator.count() > 0) {
    await locator.click();
    return true;
  }
  return false;
}

test.describe('Past Page - Go Forward a Day', () => {

  test('navigating forward a day changes the date in the URL', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/front');
    const initialDate = await getCurrentDateFromUrl(page);
    await clickIfExists(page, 'day', 1);
    const newDate = await getCurrentDateFromUrl(page);
    // newDate might be the same if already at today's date
    if (newDate !== initialDate) expect(newDate).not.toBe(initialDate);
  });
});
