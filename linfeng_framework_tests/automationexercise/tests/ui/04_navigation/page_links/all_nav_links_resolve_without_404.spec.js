// edge — All nav links resolve without HTTP 404
import { test, expect } from '../../../../fixtures/index.js';

test('all nav links resolve without 404', async ({ page, homePage, header }) => {
  await homePage.goto();

  const hrefs = await header.nav.locator('a').evaluateAll(
    anchors => anchors.map(a => a.getAttribute('href')).filter(Boolean)
  );

  for (const href of hrefs) {
    const url = href.startsWith('http') ? href : `https://www.automationexercise.com${href}`;
    const response = await page.request.get(url);
    expect(response.status(), `Expected < 400 for ${url}`).toBeLessThan(400);
  }
});
