// pages/CartPage.js

import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartRows          = page.locator('#cart_info_table tbody tr');
    this.proceedToCheckout = page.locator('a:has-text("Proceed To Checkout")');
    this.emptyCartMessage  = page.locator('#empty_cart');
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  async proceedToCheckoutAsGuest() {
    await this.proceedToCheckout.click();
    await this.page.locator('u:has-text("Register / Login")').click();
  }

  async proceedToCheckoutAsLoggedIn() {
    await this.page.goto('/checkout');
  }

  async removeItem(productName) {
    const row = this.page.locator(`#cart_info_table tbody tr`).filter({ hasText: productName });
    await row.locator('a.cart_quantity_delete').click();
  }

  async getCartCount() {
    return await this.cartRows.count();
  }

  async getQuantityForRow(index = 0) {
    const qty = await this.cartRows.nth(index).locator('.cart_quantity button').textContent();
    return parseInt(qty.trim(), 10);
  }
}
