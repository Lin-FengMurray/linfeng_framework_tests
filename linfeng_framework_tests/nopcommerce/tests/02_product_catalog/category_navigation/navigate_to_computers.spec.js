import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../../pages/ProductsPage.js';

test.describe('Category Navigation - Computers', () => {

  test('navigate to computers shows subcategory cards', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await page.goto('https://demo.nopcommerce.com/computers');
    await page.waitForLoadState('domcontentloaded');
    await productsPage.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(productsPage.pageTitle).toContainText('Computers');
    await productsPage.subCategoryItems.first().waitFor({ state: 'visible', timeout: 10000 });
    const count = await productsPage.subCategoryItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('navigate to desktops shows product grid', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await page.goto('https://demo.nopcommerce.com/desktops');
    await page.waitForLoadState('domcontentloaded');
    await productsPage.productItems.first().waitFor({ state: 'visible', timeout: 10000 });
    await expect(productsPage.productItems.first()).toBeVisible();
  });
});