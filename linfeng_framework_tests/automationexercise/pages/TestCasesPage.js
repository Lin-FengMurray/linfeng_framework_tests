// pages/TestCasesPage.js

import { BasePage } from './BasePage.js';

export class TestCasesPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.locator('h2.title b');
  }

  async goto() {
    await this.page.goto('/test_cases');
  }
}
