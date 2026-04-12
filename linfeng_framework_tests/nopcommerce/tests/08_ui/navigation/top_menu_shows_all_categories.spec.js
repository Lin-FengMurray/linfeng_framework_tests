import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage.js';

test.describe('UI Navigation - Top Menu Shows All Categories', () => {

  test('top menu contains all 7 main product categories', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    const menu = page.getByRole('menu', { name: 'Categories' });
    await menu.waitFor({ state: 'visible', timeout: 10000 });
    const categories = ['Computers', 'Electronics', 'Apparel', 'Digital downloads', 'Books', 'Jewelry', 'Gift Cards'];
    for (const category of categories) {
      await expect(
        menu.locator('.menu__link').getByText(category, { exact: true }).first()
      ).toBeVisible({ timeout: 10000 });
    }
  });
});