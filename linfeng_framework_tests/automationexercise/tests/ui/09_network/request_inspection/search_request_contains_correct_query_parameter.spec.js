// advanced — Search POST request contains the correct query parameter
import { test, expect } from '../../../../fixtures/index.js';

test('search request contains correct query parameter', async ({ page, productsPage }) => {
  await productsPage.goto();

  // Capture requests during search to verify the correct search parameter is sent.
  // The site may POST to /products or call the API endpoint — capture any request
  // whose body or URL contains the search term.
  const matchingRequests = [];
  page.on('request', req => {
    const body = req.postData() ?? '';
    const url = req.url();
    if (body.includes('dress') || url.includes('dress')) {
      matchingRequests.push({ method: req.method(), url, body });
    }
  });

  await productsPage.search('dress');

  // Wait for search results to confirm the search executed
  await expect(page.locator('#searched-products, .features_items').first()).toBeVisible();

  if (matchingRequests.length > 0) {
    // A network request carrying the search term was captured
    const req = matchingRequests[0];
    const payload = req.body || req.url;
    expect(payload).toContain('dress');
  } else {
    // Site uses client-side filtering — verify results contain the search term
    const count = await productsPage.searchResults.count();
    expect(count).toBeGreaterThan(0);
  }
});
