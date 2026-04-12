import { BasePage } from '../pages/BasePage.js';

export class ProductCard extends BasePage {
  constructor(page, container) {
    super(page);
    this.container = container;

    // ===== Product Card Elements =====
    this.title = container.locator('.product-title a');
    this.price = container.locator('.price.actual-price');
    this.image = container.locator('.picture img');
    this.addToCartButton = container.locator('.add-to-cart-button');
    this.addToWishlistButton = container.locator('.add-to-wishlist-button');
    this.addToCompareButton = container.locator('.add-to-compare-list-button');
    this.rating = container.locator('.rating');
  }

  // ===== Getters =====
  async getName() {
    return (await this.title.textContent())?.trim();
  }

  async getPrice() {
    return (await this.price.textContent())?.trim();
  }

  // ===== Actions =====
  async clickTitle() {
    await this.title.waitFor({ state: 'visible' });
    await this.title.click();
  }

  async addToCart() {
    await this.addToCartButton.waitFor({ state: 'visible' });
    await this.addToCartButton.click();
  }

  async addToWishlist() {
    await this.addToWishlistButton.waitFor({ state: 'visible' });
    await this.addToWishlistButton.click();
  }

  async addToCompare() {
    await this.addToCompareButton.waitFor({ state: 'visible' });
    await this.addToCompareButton.click();
  }

  // ===== State Checks =====
  async isVisible() {
    return await this.container.isVisible();
  }

  async getPriceAsNumber() {
    const text = await this.getPrice();
    // Strips currency symbol and commas e.g. "$1,200.00" → 1200.00
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}