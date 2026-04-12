import { BasePage } from './BasePage.js';

export class WishlistPage extends BasePage {
  constructor(page) {
    super(page);

    this.pageTitle = page.locator('.page-title h1');
    this.wishlistContent = page.locator('.wishlist-content');
    this.wishlistRows = page.locator('.wishlist-content .cart-item-row');
    this.productLinks = page.locator('.wishlist-content .product-name a');
    this.quantityInputs = page.locator('.wishlist-content .qty-input');
    this.removeCheckboxes = page.locator('.wishlist-content input[name^="removefromcart"]');
    this.addToCartCheckboxes = page.locator('.wishlist-content input[name^="addtocart"]');
    this.updateWishlistButton = page.locator('#updatecart');
    this.addToCartButton = page.locator('button[name="addtocartbutton"]');
    this.emptyWishlistMessage = page.locator('.wishlist-content');
    this.shareLink = page.locator('.share-info a');
  }

  async getWishlistItemCount() {
    return await this.wishlistRows.count();
  }

  async getProductNames() {
    return await this.productLinks.allTextContents();
  }

  async updateQuantityByIndex(index, quantity) {
    await this.quantityInputs.nth(index).fill(String(quantity));
  }

  async updateWishlist() {
    await this.updateWishlistButton.click();
  }

  async removeItemByIndex(index = 0) {
    await this.removeCheckboxes.nth(index).check();
  }

  async selectAddToCartByIndex(index = 0) {
    await this.addToCartCheckboxes.nth(index).check();
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async getQuantityByIndex(index = 0) {
    return await this.quantityInputs.nth(index).inputValue();
  }
}