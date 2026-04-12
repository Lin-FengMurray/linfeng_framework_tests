// pages/HackerNewsSearchPage.js
// Page Object Model for Hacker News Algolia Search page

class HackerNewsSearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByRole('searchbox');
    this.results = page.locator('a[href*="item?id="]');
    this.typeDropdown = page.getByRole('combobox', { name: 'Stories' });
    this.sortDropdown = page.getByRole('combobox', { name: 'Popularity' });
    this.timeRangeDropdown = page.getByRole('combobox', { name: 'All time' });
    this.firstResultLink = page.locator('.ais-Hits-item a').first();
    this.noResultsMessage = page.getByText('No results');
  }

  async navigate() {
    await this.page.goto('https://hn.algolia.com', {
      waitUntil: 'domcontentloaded'
    });
  }

  async search(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }

  async getResultsCount() {
    return await this.results.count();
  }

  async selectSortOption(optionText) {
    await this.sortDropdown.click();
    await this.page.getByRole('option', { name: optionText }).click();
  }

  async selectTimeRange(optionText) {
    await this.timeRangeDropdown.click();
    await this.page.getByRole('option', { name: optionText }).click();
  }

  async clickFirstResult() {
    await this.firstResultLink.click();
  }

  getQueryParam(param) {
    const url = new URL(this.page.url());
    return url.searchParams.get(param);
  }
}

export default HackerNewsSearchPage;
