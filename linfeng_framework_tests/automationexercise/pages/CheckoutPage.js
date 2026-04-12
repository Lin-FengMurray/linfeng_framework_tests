// pages/CheckoutPage.js

import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.addressDelivery = page.locator('#address_delivery');
    this.addressInvoice  = page.locator('#address_invoice');
    this.commentBox      = page.locator('textarea[name="message"]');
    this.placeOrderBtn   = page.locator('a:has-text("Place Order")');
  }

  async fillComment(text) {
    await this.commentBox.fill(text);
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
  }
}
