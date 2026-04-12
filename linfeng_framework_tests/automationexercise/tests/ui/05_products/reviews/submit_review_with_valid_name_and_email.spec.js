// TC21 — Submit a review with valid name and email
import { test, expect } from '../../../../fixtures/index.js';
import reviewsData from '../../../../test-data/reviews.json' assert { type: 'json' };

test('submit review with valid name and email', async ({ page, productDetailPage }) => {
  const review = reviewsData[0];
  await page.goto('/product_details/1');
  await productDetailPage.reviewName.fill(review.name);
  await productDetailPage.reviewEmail.fill(review.email);
  await productDetailPage.reviewText.fill(review.text);
  await productDetailPage.reviewSubmit.click();
  await expect(productDetailPage.reviewSuccess).toBeVisible();
});
