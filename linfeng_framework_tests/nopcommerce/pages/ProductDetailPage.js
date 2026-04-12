import { BasePage } from './BasePage.js';

export class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.productName = page.locator('.product-name h1').first();
    this.productPrice = page.locator('.price-value');
    this.addToCartButton = page.locator('[id^="add-to-cart-button-"]');
    this.addToWishlistButton = page.locator('[id^="add-to-wishlist-button-"]');

    // Note: quantity input doesn't exist on all product pages
    this.quantityInput = page.locator('[id^="product_enteredQuantity_"]');
    this.successNotification = page.locator('.bar-notification.success');
  }

  async getProductName() {
    return await this.productName.textContent();
  }

  async getProductPrice() {
    return await this.productPrice.textContent();
  }

  // ✅ Conditional quantity fill — not all products have a qty input
  async addToCart(quantity = 1) {
    const hasQtyInput = await this.quantityInput.isVisible().catch(() => false);
    if (hasQtyInput && quantity !== 1) {
      await this.quantityInput.fill(quantity.toString());
    }
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addToCartButton.click();
  }

  // ✅ Conditional quantity fill — not all products have a qty input
  async addToWishlist(quantity = 1) {
    const hasQtyInput = await this.quantityInput.isVisible().catch(() => false);
    if (hasQtyInput && quantity !== 1) {
      await this.quantityInput.fill(quantity.toString());
    }
    await this.addToWishlistButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addToWishlistButton.click();
  }

  async isSuccessNotificationVisible() {
    return await this.successNotification.isVisible();
  }
}