import { test, expect } from '@playwright/test';

test.describe('YC Jobs - Video Carousel Loads', () => {

  test('the YC Jobs video carousel loads with slides and clicking a slide navigates to the library', async ({ page }) => {
    await page.goto('https://www.ycombinator.com/jobs', { waitUntil: 'domcontentloaded' });

    const carousel = page.locator('#library-carousel');
    await expect(carousel).toBeVisible();

    const slides = carousel.locator('div[role="option"][aria-label="slide"]');
    const slideCount = await slides.count();
    expect(slideCount).toBeGreaterThan(0);

    const firstSlide = slides.first();
    await expect(firstSlide).toBeVisible();

    const firstTitle = await firstSlide.locator('.pr-3').textContent();
    expect(firstTitle).not.toBeNull();

    await slides.first().click();
    await page.waitForLoadState();
    await expect(page).toHaveURL(/library/);
  });
});
