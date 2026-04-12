// edge — Subscription form does not succeed with an invalid email address
import { test, expect } from '../../../../fixtures/index.js';

test('subscription shows error for invalid email', async ({ page, homePage, subscriptionForm }) => {
  await homePage.goto();
  await subscriptionForm.subscribe('not-an-email');
  // Success message should NOT appear
  await expect(subscriptionForm.successMsg).not.toBeVisible();
});
