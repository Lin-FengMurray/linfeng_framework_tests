// pages/ProductsPage.js

import { BasePage } from './BasePage.js';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productList   = page.locator('.features_items .product-image-wrapper');
    this.searchInput   = page.locator('#search_product');
    this.searchButton  = page.locator('#submit_search');
    this.searchResults = page.locator('#searched-products .product-image-wrapper');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async search(term) {
    // Navigate to products page, then submit the search form.
    await this.page.goto('/products');
    await this.searchInput.fill(term);
    // Wait for network to fully settle after clicking — ensures the search
    // response has been received and JS has had time to render the results.
    await Promise.all([
      this.page.waitForLoadState('networkidle', { timeout: 30000 }),
      this.searchButton.click(),
    ]);
    // Wait for the main product container to be present — it exists even when
    // a search returns 0 results (e.g. SQL-injection strings), so we check
    // for the container itself rather than a product card inside it.
    await this.page.locator('.features_items').waitFor({ state: 'attached', timeout: 20000 });
  }

  async addFirstProductToCart() {
    await this.productList.first().locator('a[data-product-id]').hover();
    await this.productList.first().locator('a:has-text("Add to cart")').click();
  }
}
