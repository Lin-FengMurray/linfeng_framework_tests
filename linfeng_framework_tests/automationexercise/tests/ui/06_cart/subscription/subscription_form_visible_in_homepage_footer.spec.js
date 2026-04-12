// TC10 — Subscription form visible and functional in the homepage footer
import { test, expect } from '../../../../fixtures/index.js';
import { createUser } from '../../../../utils/testDataFactory.js';

test('subscription form visible in homepage footer', async ({ page, homePage, subscriptionForm }) => {
  const { email } = createUser(); // unique email every run — avoids "already subscribed" failure
  await homePage.goto();
  await expect(subscriptionForm.heading).toBeVisible();
  await subscriptionForm.subscribe(email);
  await expect(subscriptionForm.successMsg).toContainText('You have been successfully subscribed!');
});
