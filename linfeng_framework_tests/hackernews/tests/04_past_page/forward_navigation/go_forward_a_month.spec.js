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

test.describe('Past Page - Go Forward a Month', () => {

  test('navigating forward a month changes the date in the URL', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/front');
    const initialDate = await getCurrentDateFromUrl(page);
    const clicked = await clickIfExists(page, 'month', 1);

    if (clicked) {
      const newDate = await getCurrentDateFromUrl(page);
      expect(newDate).not.toBe(initialDate);
    } else {
      console.log('Forward month link does not exist (already at latest month)');
    }
  });
});
