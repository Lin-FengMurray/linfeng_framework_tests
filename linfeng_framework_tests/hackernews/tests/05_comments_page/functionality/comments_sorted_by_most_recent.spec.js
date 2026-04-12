import { test, expect } from '@playwright/test';

test.describe('Comments Page - Comments Sorted by Most Recent', () => {

  test('comments are sorted from most recent to oldest', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newcomments');

    const timestamps = page.locator('.age a');
    await expect(timestamps.first()).toBeVisible();

    const timestampsTexts = await timestamps.allTextContents();
    expect(timestampsTexts.length).toBeGreaterThan(1);

    function extractTimeInMinutes(text) {
      const match = text.match(/(\d+)\s+(minute|minutes|hour|hours|day|days)/);
      if (!match) return 0;
      const value = parseInt(match[1], 10);
      const unit = match[2];
      if (unit.includes('minute')) return value;
      if (unit.includes('hour')) return value * 60;
      if (unit.includes('day')) return value * 1440;
      return 0;
    }

    const timesInMinutes = timestampsTexts.map(extractTimeInMinutes);

    for (let i = 1; i < timesInMinutes.length; i++) {
      expect(timesInMinutes[i]).toBeGreaterThanOrEqual(timesInMinutes[i - 1]);
    }
  });
});
