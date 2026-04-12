import { BasePage } from './BasePage.js';

// ✅ Extend BasePage for shared helpers
export class GiftCardsPage extends BasePage {
  constructor(page) {
    super(page);

    // Product list
    this.productTitles = page.locator('.product-title a');

    // ✅ Generic gift card fields — works for ANY gift card product
    this.recipientNameInput = page.locator('[id^="giftcard_"][id$="_RecipientName"]');
    this.recipientEmailInput = page.locator('[id^="giftcard_"][id$="_RecipientEmail"]');
    this.senderNameInput = page.locator('[id^="giftcard_"][id$="_SenderName"]');
    this.senderEmailInput = page.locator('[id^="giftcard_"][id$="_SenderEmail"]');
    this.messageInput = page.locator('[id^="giftcard_"][id$="_Message"]');

    // Add to cart (dynamic ID)
    this.addToCartBtn = page.locator('[id^="add-to-cart-button-"]');

    // Notification
    this.successBar = page.locator('.bar-notification.success');
  }

  async openGiftCardsCategory() {
    // ✅ Use goto directly — menu click is flaky due to Cloudflare + new menu structure
    await this.page.goto('https://demo.nopcommerce.com/gift-cards');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectProductByName(name) {
    const link = this.page.locator('.product-title a', { hasText: name });
    await link.waitFor({ state: 'visible', timeout: 10000 });
    await link.click();
  }

  // ✅ Works for BOTH virtual + physical gift cards
  // All fields are optional — only fills if data is provided and field is visible
  async fillGiftCard(data) {
    if (data.recipientName) {
      await this.recipientNameInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.recipientNameInput.fill(data.recipientName);
    }
    if (data.recipientEmail) {
      const visible = await this.recipientEmailInput.isVisible().catch(() => false);
      if (visible) await this.recipientEmailInput.fill(data.recipientEmail);
    }
    if (data.senderName) {
      await this.senderNameInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.senderNameInput.fill(data.senderName);
    }
    if (data.senderEmail) {
      const visible = await this.senderEmailInput.isVisible().catch(() => false);
      if (visible) await this.senderEmailInput.fill(data.senderEmail);
    }
    if (data.message) {
      await this.messageInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.messageInput.fill(data.message);
    }
  }

  async addToCart() {
    await this.addToCartBtn.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.addToCartBtn.first().click();
  }

  // ✅ Returns locator directly — caller can chain waitFor + expect
  getSuccessBar() {
    return this.successBar;
  }
}