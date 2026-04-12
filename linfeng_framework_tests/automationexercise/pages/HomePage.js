// pages/HomePage.js

import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.slider      = page.locator('#slider');
    this.featuredItems = page.locator('.features_items');
  }

  async goto() {
    await this.page.goto('/');
  }
}
