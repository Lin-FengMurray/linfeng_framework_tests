// components/SubscriptionForm.js

export class SubscriptionForm {
  constructor(page) {
    this.page       = page;
    this.heading    = page.locator('h2:has-text("Subscription")');
    this.emailInput = page.locator('#susbscribe_email');
    this.submitBtn  = page.locator('#subscribe');
    this.successMsg = page.locator('#success-subscribe');
  }

  async subscribe(email) {
    await this.emailInput.fill(email);
    await this.submitBtn.click();
  }
}
