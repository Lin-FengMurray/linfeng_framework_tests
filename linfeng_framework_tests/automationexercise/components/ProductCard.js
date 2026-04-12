// components/ProductCard.js

export class ProductCard {
  constructor(locator) {
    this.root      = locator;
    this.name      = locator.locator('.productinfo p');
    this.price     = locator.locator('.productinfo h2');
    this.addToCart = locator.locator('.overlay-content a.add-to-cart');
  }

  async hoverAndAddToCart() {
    await this.root.hover();
    await this.addToCart.click();
  }
}
