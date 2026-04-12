import { BasePage } from './BasePage.js';
import { ProductCard } from '../components/ProductCard.js';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);

    // ===== Page Elements =====
    this.pageTitle = page.locator('h1').first();

    // ✅ Scoped to product grid to avoid matching unrelated elements
    this.productItems = page.locator('.product-grid .product-item');
    this.productTitles = page.locator('.product-title a');
    this.productPrices = page.locator('.prices');

    // Sort dropdown
    this.sortDropdown = page.locator('#products-orderby');

    // Filters (left panel)
    this.priceRangeFilter = page.locator('.filter-price-range');
    this.filterOptions = page.locator('.filter-content input[type="checkbox"]');

    // Search
    // Note: #q is the search PAGE input field
    //       #small-searchterms is the HEADER search input — different fields
    this.searchInput = page.locator('#q');
    this.searchButton = page.locator('.search-button');

    // No result message
    this.noResultMessage = page.locator('.no-result');

    // Subcategory items (shown on category landing pages e.g. /computers)
    this.subCategoryItems = page.locator('.sub-category-item');

    // Breadcrumb
    this.breadcrumb = page.locator('.breadcrumb');
  }

  // ===== ProductCard Factory Methods =====

  /**
   * Returns a ProductCard for the item at the given index.
   * Usage: const card = productsPage.getProductCard(0);
   */
  getProductCard(index = 0) {
    return new ProductCard(this.page, this.productItems.nth(index));
  }

  /**
   * Returns a ProductCard scoped to a product item containing the given name.
   * Usage: const card = productsPage.getProductCardByName('Fahrenheit 451 by Ray Bradbury');
   */
  getProductCardByName(name) {
    const container = this.page.locator('.product-item', { hasText: name });
    return new ProductCard(this.page, container);
  }

  // ===== Actions =====
  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async clickProductByIndex(index = 0) {
    await this.productTitles.nth(index).click();
  }

  async clickProductByName(name) {
    await this.page.locator('.product-title a', { hasText: name }).click();
  }

  async getAllProductNames() {
    return await this.productTitles.allTextContents();
  }

  async sortBy(optionText) {
    await this.sortDropdown.selectOption({ label: optionText });
  }

  async searchProduct(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async applyFirstFilter() {
    await this.filterOptions.first().check();
  }

  async isNoResultVisible() {
    return await this.noResultMessage.isVisible();
  }
}