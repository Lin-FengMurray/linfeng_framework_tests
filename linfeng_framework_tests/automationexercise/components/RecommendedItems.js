// components/RecommendedItems.js

export class RecommendedItems {
  constructor(page) {
    this.page  = page;
    this.root  = page.locator('.recommended_items');
    this.items = page.locator('.recommended_items .product-image-wrapper');
  }

  async addFirstItemToCart() {
    // Use class selector to avoid strict-mode violation from two "Add to cart" links per card
    await this.items.first().locator('a.add-to-cart').first().click();
  }
}
