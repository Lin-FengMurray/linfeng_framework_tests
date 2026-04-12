// pages/PaymentPage.js

import { BasePage } from './BasePage.js';

export class PaymentPage extends BasePage {
  constructor(page) {
    super(page);
    this.cardName    = page.locator('[data-qa="name-on-card"]');
    this.cardNumber  = page.locator('[data-qa="card-number"]');
    this.cardCvc     = page.locator('[data-qa="cvc"]');
    this.cardExpiry  = page.locator('[data-qa="expiry-month"]');
    this.cardYear    = page.locator('[data-qa="expiry-year"]');
    this.payBtn      = page.locator('[data-qa="pay-button"]');
  }

  async fillCard({ name, number, cvc, expiry }) {
    const [month, year] = expiry.split('/');
    await this.cardName.fill(name);
    await this.cardNumber.fill(number);
    await this.cardCvc.fill(cvc);
    await this.cardExpiry.fill(month);
    await this.cardYear.fill(year);
  }

  async submit() {
    await this.payBtn.click();
  }
}
