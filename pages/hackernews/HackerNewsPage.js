// pages/HackerNewsPage.js
// Page Object Model for Hacker News "Newest" page
class HackerNewsPage {
  constructor(page) {
    // Define Locators
    this.page = page;
    this.moreBtn = page.getByRole('link', { name: 'More', exact: true });
    this.articleRows = page.locator('.athing');
    this.ageLinks = page.locator('.age a');
    this.firstRank = page.locator('.rank').first();
  }

  // Navigate to the "Newest" page and wait until articles load
  async navigate() {
    await this.page.goto('https://news.ycombinator.com/newest', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    await this.articleRows.first().waitFor({ state: 'visible' });
  }

  // Collect timestamps from articles until reaching the specified limit
  async getTopTimestamps(limit) {
    let allTimes = [];
    while (allTimes.length < limit) {
      // 1. Wait for articles and age elements to be visible
      await this.ageLinks.first().waitFor({ state: 'visible' });

      // 2. Scrape the current page
      const pageTimes = await this.ageLinks.evaluateAll(links =>
        links.map(el => el.getAttribute('title'))
      );
      allTimes.push(...pageTimes);
      console.log(`Progress: ${allTimes.length}/${limit}`);

      if (allTimes.length < limit) {
        // ✅ CHANGED: Guard against missing "More" button before clicking
        const moreBtnVisible = await this.moreBtn.isVisible();
        if (!moreBtnVisible) {
          console.warn(`⚠️ "More" button not found — stopping early at ${allTimes.length} articles`);
          break;
        }

        // 3. Wait for the action to complete
        await this.moreBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.articleRows.first().waitFor({ state: 'visible' });
      }
    }
    return allTimes.slice(0, limit);
  }

  // Get numeric rank of the first story
  async getFirstRankNumber() {
    const text = await this.firstRank.innerText();
    return parseInt(text.replace('.', ''));
  }

  // Click "More" and wait until the first rank changes
  async clickMore() {
    const currentRank = await this.getFirstRankNumber();
    await this.moreBtn.click();
    // ✅ CHANGED: Pass currentRank as integer directly; reconstruct "31." inside the fn
    await this.page.waitForFunction(
      (oldRank) => document.querySelector('.rank')?.innerText !== `${oldRank}.`,
      currentRank
    );
  }
}

export default HackerNewsPage;