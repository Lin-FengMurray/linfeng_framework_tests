// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1

/*
The "linfeng_framework_tests" folder contains a comprehensive, three-suite Playwright
framework covering
- Hacker News
- NopCommerce
- Automation Exercise

TECHNICAL HIGHLIGHTS:
- Validates complex e-commerce journeys, REST API contracts, and visual snapshots
- Executes seamlessly across three browsers (Chromium, Firefox, WebKit)
- Built on a strict Page Object Model (POM) architecture
- Guarantees zero test pollution via isolated test data and custom fixtures

DASHBOARD: [STREAMLIT_LINK]

DOCUMENTATION: case_study.md
*/


import { chromium } from 'playwright';
import HackerNewsPage from './pages/hackernews/HackerNewsPage.js';

async function sortHackerNewsArticles() {
  let browser;
  try {
    // Launch browser
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Initialize POM
    const hnPage = new HackerNewsPage(page);

    // Go to Hacker News
    console.log('Navigating to Hacker News "Newest" page...');
    await hnPage.navigate();

    console.log('Collecting top 100 timestamps...');
    const timestamps = await hnPage.getTopTimestamps(100);

    console.log(`Collected ${timestamps.length} timestamps. Verifying order...`);

    // Verify newest-to-oldest order
    for (let i = 0; i < timestamps.length - 1; i++) {
      const current = new Date(timestamps[i]).getTime();
      const next = new Date(timestamps[i + 1]).getTime();

      if (current < next) {
        throw new Error(
          `❌ Order check failed at row ${i}: ${timestamps[i]} < ${timestamps[i + 1]}`
        );
      }
    }

    console.log('✅ All 100 articles are sorted from newest to oldest.');

  } catch (err) {
    console.error('❌ Test failed:', err);
  } finally {
    if (browser) await browser.close();
  }
}

(async () => {
  await sortHackerNewsArticles();
})();