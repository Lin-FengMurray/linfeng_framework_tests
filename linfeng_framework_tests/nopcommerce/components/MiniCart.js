import { BasePage } from '../pages/BasePage.js';

export class MiniCart extends BasePage {
  constructor(page) {
    super(page);
    this.cartIcon = page.locator('.cart-label');
    this.flyoutCart = page.locator('#flyout-cart');
    this.items = this.flyoutCart.locator('.mini-shopping-cart .item');
    this.productNames = this.flyoutCart.locator('.mini-shopping-cart .name');
    this.subtotal = this.flyoutCart.locator('.mini-shopping-cart .totals');

    // ✅ More resilient — matches <a> or <button>
    this.goToCartButton = this.flyoutCart.locator('a, button').filter({ hasText: 'Go to cart' });
    this.checkoutButton = this.flyoutCart.locator('a, button').filter({ hasText: 'Checkout' });

    // ✅ Correct empty state selector
    this.emptyMessage = this.flyoutCart.locator('.mini-shopping-cart .no-items');
  }

  // ✅ Hover to trigger flyout — essential for mini cart tests
  async hover() {
    await this.cartIcon.hover();
    await this.flyoutCart.waitFor({ state: 'visible', timeout: 5000 });
  }

  async waitForVisible() {
    await this.flyoutCart.waitFor({ state: 'visible' });
  }

  async getItemCount() {
    return await this.items.count();
  }

  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  async getSubtotalText() {
    return await this.subtotal.textContent();
  }

  async clickGoToCart() {
    await this.goToCartButton.click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async isVisible() {
    return await this.flyoutCart.isVisible();
  }
}