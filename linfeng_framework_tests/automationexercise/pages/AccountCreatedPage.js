// pages/AccountCreatedPage.js

import { BasePage } from './BasePage.js';

export class AccountCreatedPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading        = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async continue() {
    await this.continueButton.click();
  }
}
