// TC11 — Subscription form visible and functional in the cart page footer
import { test, expect } from '../../../../fixtures/index.js';
import { createUser } from '../../../../utils/testDataFactory.js';

test('subscription form visible in cart page footer', async ({ page, cartPage, subscriptionForm }) => {
  const { email } = createUser(); // separate unique email from TC10
  await cartPage.goto();
  await expect(subscriptionForm.heading).toBeVisible();
  await subscriptionForm.subscribe(email);
  await expect(subscriptionForm.successMsg).toContainText('You have been successfully subscribed!');
});
