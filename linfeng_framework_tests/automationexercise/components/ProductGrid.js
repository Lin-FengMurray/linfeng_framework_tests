// components/ProductGrid.js

import { ProductCard } from './ProductCard.js';

export class ProductGrid {
  constructor(page, rootSelector = '.features_items') {
    this.page      = page;
    this.cardItems = page.locator(`${rootSelector} .product-image-wrapper`);
  }

  async getCount() {
    return this.cardItems.count();
  }

  card(index = 0) {
    return new ProductCard(this.cardItems.nth(index));
  }

  async addFirstToCart() {
    await this.card(0).hoverAndAddToCart();
  }
}
