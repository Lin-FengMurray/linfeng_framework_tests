import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage.js';

test.describe('UI Search - Search Box Visible on Homepage', () => {

  test('search input and button are visible in header', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await expect(page.locator('#small-searchterms')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button.search-box-button')).toBeVisible({ timeout: 10000 });
  });
});