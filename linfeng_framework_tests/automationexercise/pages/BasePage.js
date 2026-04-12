// pages/BasePage.js
// Base class for all page objects. Holds the page reference and shared helpers.

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}
