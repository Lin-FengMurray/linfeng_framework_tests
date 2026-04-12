// components/CartModal.js

export class CartModal {
  constructor(page) {
    this.page        = page;
    this.root        = page.locator('#cartModal');
    this.continueBtn = page.locator('button:has-text("Continue Shopping")');
    this.viewCartBtn = page.locator('u:has-text("View Cart")');
  }

  async continueShopping() {
    await this.continueBtn.click();
  }

  async viewCart() {
    await this.viewCartBtn.click();
  }
}
