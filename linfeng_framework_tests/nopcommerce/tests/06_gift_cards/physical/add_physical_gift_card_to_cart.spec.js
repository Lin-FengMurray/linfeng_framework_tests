import { test, expect } from '@playwright/test';
import { GiftCardsPage } from '../../../pages/GiftCardsPage.js';
import { CartPage } from '../../../pages/CartPage.js';

const BASE_URL = 'https://demo.nopcommerce.com';
const physicalGiftCard = {
  productName: '$50 Physical Gift Card',
  url: '/50-physical-gift-card',
  recipientName: 'John Doe',
  senderName: 'LinFeng',
  message: 'Happy Birthday!',
};

/** SKIPPED: Cloudflare blocks add-to-cart POST. Fix: local instance. */
test.describe('Physical Gift Card - Add to Cart', () => {
  test.skip(true, 'Cloudflare blocks add-to-cart POST — run against local instance');

  test('fill physical gift card details and add to cart successfully', async ({ page }) => {
    const gift = new GiftCardsPage(page);
    const cart = new CartPage(page);
    await page.goto(`${BASE_URL}${physicalGiftCard.url}`);
    await page.waitForLoadState('domcontentloaded');
    await gift.fillGiftCard({
      recipientName: physicalGiftCard.recipientName,
      senderName: physicalGiftCard.senderName,
      message: physicalGiftCard.message,
    });
    await gift.addToCart();
    await gift.getSuccessBar().waitFor({ state: 'visible', timeout: 10000 });
    await expect(gift.getSuccessBar()).toContainText('The product has been added');
    await page.goto(`${BASE_URL}/cart`);
    await cart.cartPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(cart.productLinks.first()).toContainText(physicalGiftCard.productName);
  });
});