// pages/AccountDeletedPage.js

import { BasePage } from './BasePage.js';

export class AccountDeletedPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading        = page.locator('[data-qa="account-deleted"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async continue() {
    await this.continueButton.click();
  }
}
