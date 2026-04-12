// pages/HackerNewsSearchPage.js
// Page Object Model for Hacker News Algolia Search page

class HackerNewsSearchPage {
constructor(page) {
this.page = page;

// Use role-based locators for accessibility and stability
// Main search input field
this.searchInput = page.getByRole('searchbox');
// Individual search result items
this.results = page.locator('a[href*="item?id="]');
// Specific dropdowns (accessible names from your error log)
this.typeDropdown = page.getByRole('combobox', { name: 'Stories' });
this.sortDropdown = page.getByRole('combobox', { name: 'Popularity' });
this.timeRangeDropdown = page.getByRole('combobox', { name: 'All time' });
this.firstResultLink = page.locator('.ais-Hits-item a').first(); // First result link
this.noResultsMessage = page.getByText('No results'); // Empty state indicator
}

// Navigate directly to the Algolia search page
async navigate() {
await this.page.goto('https://hn.algolia.com', {
waitUntil: 'domcontentloaded'
});
}

// Perform a search using the search box
async search(keyword) {
await this.searchInput.fill(keyword);
await this.searchInput.press('Enter');
}

// Return total number of search results currently displayed
async getResultsCount() {
return await this.results.count();
}

// Change sorting option (e.g., "date", "popularity")
async selectSortOption(optionText) {
await this.sortDropdown.click();
await this.page.getByRole('option', { name: optionText }).click();
}

async selectTimeRange(optionText) {
await this.timeRangeDropdown.click();
await this.page.getByRole('option', { name: optionText }).click();
}

// Click the first search result
async clickFirstResult() {
await this.firstResultLink.click();
}

// Helper method to retrieve URL query parameters
// Used for validating search state reflected in URL
getQueryParam(param) {
const url = new URL(this.page.url());
return url.searchParams.get(param);
}
}
export default HackerNewsSearchPage;

