import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../../pages/ProductsPage.js';

test.describe('Category Navigation - Books', () => {

  test('navigate to books shows product grid', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await page.goto('https://demo.nopcommerce.com/books');
    await page.waitForLoadState('domcontentloaded');
    await productsPage.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(productsPage.pageTitle).toContainText('Books');
    await productsPage.productItems.first().waitFor({ state: 'visible', timeout: 10000 });
    await expect(productsPage.productItems.first()).toBeVisible();
  });
});