// pages/OrderPlacedPage.js

import { BasePage } from './BasePage.js';

export class OrderPlacedPage extends BasePage {
  constructor(page) {
    super(page);
    this.congratsMessage  = page.locator('[data-qa="order-placed"]');
    this.downloadInvoiceBtn = page.locator('a:has-text("Download Invoice")');
  }

  async downloadInvoice() {
    await this.downloadInvoiceBtn.click();
  }
}
