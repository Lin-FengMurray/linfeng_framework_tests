// components/Footer.js

export class Footer {
  constructor(page) {
    this.page = page;
    this.root           = page.locator('#footer');
    this.subscribeEmail = page.locator('#susbscribe_email');
    this.subscribeBtn   = page.locator('#subscribe');
    this.successMsg     = page.locator('#success-subscribe');
  }

  async subscribe(email) {
    await this.subscribeEmail.fill(email);
    await this.subscribeBtn.click();
  }
}
