// pages/HackerNewsPage.js
// Page Object Model for Hacker News "Newest" page
class HackerNewsPage {
  constructor(page) {
    this.page = page;
    this.moreBtn = page.getByRole('link', { name: 'More', exact: true });
    this.articleRows = page.locator('.athing');
    this.ageLinks = page.locator('.age a');
    this.firstRank = page.locator('.rank').first();
  }

  async navigate() {
    await this.page.goto('https://news.ycombinator.com/newest', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    await this.articleRows.first().waitFor({ state: 'visible' });
  }

  async getTopTimestamps(limit) {
    let allTimes = [];
    while (allTimes.length < limit) {
      await this.ageLinks.first().waitFor({ state: 'visible' });

      const pageTimes = await this.ageLinks.evaluateAll(links =>
        links.map(el => el.getAttribute('title'))
      );
      allTimes.push(...pageTimes);
      console.log(`Progress: ${allTimes.length}/${limit}`);

      if (allTimes.length < limit) {
        const moreBtnVisible = await this.moreBtn.isVisible();
        if (!moreBtnVisible) {
          console.warn(`⚠️ "More" button not found — stopping early at ${allTimes.length} articles`);
          break;
        }
        await this.moreBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.articleRows.first().waitFor({ state: 'visible' });
      }
    }
    return allTimes.slice(0, limit);
  }

  async getFirstRankNumber() {
    const text = await this.firstRank.innerText();
    return parseInt(text.replace('.', ''));
  }

  async clickMore() {
    const currentRank = await this.getFirstRankNumber();
    await this.moreBtn.click();
    await this.page.waitForFunction(
      (oldRank) => document.querySelector('.rank')?.innerText !== `${oldRank}.`,
      currentRank
    );
  }
}

export default HackerNewsPage;
