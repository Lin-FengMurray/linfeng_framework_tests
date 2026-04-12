import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.cartPageTitle = page.locator('.page-title h1');
    this.cartRows = page.locator('.cart-item-row');
    this.productLinks = page.locator('.product-name a');
    this.quantityInputs = page.locator('.qty-input');
    this.removeCheckboxes = page.locator('input[name^="removefromcart"]');
    this.updateCartButton = page.locator('#updatecart');
    this.emptyCartMessage = page.locator('.order-summary-content');
    this.termsOfServiceCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async getCartItemCount() {
    return await this.cartRows.count();
  }

  async getProductNames() {
    return await this.productLinks.allTextContents();
  }

  async updateQuantityByIndex(index, quantity) {
    await this.quantityInputs.nth(index).fill(String(quantity));
  }

  async updateCart() {
    await this.updateCartButton.click();
  }

  async removeItemByIndex(index = 0) {
    await this.removeCheckboxes.nth(index).check();
  }

  async getQuantityByIndex(index = 0) {
    return await this.quantityInputs.nth(index).inputValue();
  }

  async acceptTermsOfService() {
    await this.termsOfServiceCheckbox.check();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}