import { test, expect } from '@playwright/test';
import { GiftCardsPage } from '../../../pages/GiftCardsPage.js';
import { CartPage } from '../../../pages/CartPage.js';
import products from '../../../fixtures/products.json' assert { type: 'json' };

const BASE_URL = 'https://demo.nopcommerce.com';

/** SKIPPED: Cloudflare blocks add-to-cart POST. Fix: local instance. */
test.describe('Virtual Gift Card - Add to Cart', () => {
  test.skip(true, 'Cloudflare blocks add-to-cart POST — run against local instance');

  test('fill virtual gift card details and add to cart successfully', async ({ page }) => {
    const gift = new GiftCardsPage(page);
    const cart = new CartPage(page);
    await page.goto(`${BASE_URL}${products.giftCard.url}`);
    await page.waitForLoadState('domcontentloaded');
    await gift.fillGiftCard({
      recipientName: products.giftCard.recipientName,
      recipientEmail: products.giftCard.recipientEmail,
      senderName: products.giftCard.senderName,
      senderEmail: products.giftCard.senderEmail,
      message: products.giftCard.message,
    });
    await gift.addToCart();
    await gift.getSuccessBar().waitFor({ state: 'visible', timeout: 10000 });
    await expect(gift.getSuccessBar()).toContainText('The product has been added');
    await page.goto(`${BASE_URL}/cart`);
    await cart.cartPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cart.productLinks.first()).toContainText(products.giftCard.productName);
  });
});