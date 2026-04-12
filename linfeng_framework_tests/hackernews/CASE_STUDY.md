# Case Study: Hacker News & YC Jobs End-to-End Test Framework

While the primary requirement was a single validation script, this project goes further by architecting a comprehensive, production-ready Playwright test framework. The goal was to demonstrate how a complete testing ecosystem would be approached for a client in a Managed Service environment, with a focus on stability, rapid triage, and long-term maintainability.

---

## 1. Technical Environment

The framework is configured to run seamlessly on any machine or CI/CD pipeline:

| Concern | Choice |
|---|---|
| Automation Framework | Playwright Test Runner |
| Language | JavaScript (Node.js) |
| Browser Matrix | Chromium, Firefox, WebKit |
| Reporting | Playwright HTML Reporter (screenshots, stack traces, and trace viewers on failure) |

---

## 2. Test Strategy

The strategy focused on end-to-end validation of core workflows across both Hacker News and YC Jobs:

- Page navigation, dynamic content display, search integrations, and complex pagination were prioritized.
- Cross-UI testing scenarios were implemented to target edge cases where external links and Algolia search redirects behave unpredictably across browsers.
- The Page Object Model (POM) design pattern was strictly followed to keep tests stable, readable, and reusable.

---

## 3. Scope & Test Coverage

**Hacker News Suite:**
- **Homepage & Sorting Integrity** — Layout validation, chronological algorithmic sorting, rank sequence, and header navigation links.
- **Pagination** — "More" button behavior across multiple pages with rank increase verification.
- **Past Page Navigation** — Back and forward navigation by day, month, and year via URL date parameters.
- **Search Integration** — Algolia redirect validation, URL query parameter updates, network request success, performance thresholds, sort option changes, and empty result handling.
- **Community Pages** — Rendering and navigation of Comments, Ask HN, and Show HN — including sequential ranks, score formatting, author profile routing, and discussion page links.
- **Footer** — Presence and href validity of all footer links, including the mailto contact link.

**YC Jobs Suite:**
- **Dynamic Display** — Job listing validation and dynamic role category filter behavior.
- **Media Assets** — Video carousel loading and slide navigation to the YC Library.
- **External Handoffs** — Social media footer links and company profile/job page popups across browser contexts.

**Authentication Suite:**
- **Form Auth** — Valid login/logout and invalid credential scenarios (empty, wrong username, wrong password) tested against a public practice site, as Hacker News blocks automated login.
- **Basic Auth** — Valid credentials, wrong password, wrong username, and empty credentials — verifying both 200 and 401 HTTP responses.

---

## 4. Page Object Model Architecture

DOM locators and interaction logic are kept separate from test assertions:

- **`HackerNewsPage.js`** — Encapsulates the "Newest" page: navigation, timestamp collection, rank reading, and "More" button click with rank-change detection.
- **`HackerNewsSearchPage.js`** — Encapsulates the Algolia search page: search input, result locators, sort/filter dropdowns, and URL query parameter helpers.

If the Hacker News UI changes, only the relevant Page Object needs updating. The `.spec.js` files remain untouched — they act solely as the source of truth for business logic assertions.

---

## 5. Triage & Error Handling

The suite is engineered to fail gracefully and surface actionable feedback quickly. Key issues encountered and resolved during development:

- **Strict Mode Violations** — Ambiguous locators (e.g., `locator('a[href^="https://hn.algolia.com/"]')`) were replaced with Playwright's role-based selectors (e.g., `page.getByRole('link', { name: /search/i })`), which are more stable and semantically correct.
- **Data Parsing Resilience** — Null-reference crashes during date parsing (`Cannot read properties of null`) were resolved by adding strict input validation and type-checking before processing DOM strings.
- **Cross-Browser Discrepancies** — Some external social media links behaved differently across Chromium, Firefox, and WebKit. Browser-agnostic assertions using URL pattern matching were used instead of brittle visual or layout checks.

---

## 6. Strategic Trade-offs & Scope Boundaries

| Decision | Rationale |
|---|---|
| Live data flakiness | Playwright's auto-waiting and pattern-based assertions are used instead of hardcoded values to reduce failures caused by constantly changing production data. |
| External link validation | Algolia and social media links are validated via URL pattern matching rather than full page loads, preventing third-party outages from breaking the suite. |
| Authentication scope | Hacker News blocks automated login and requires real accounts. Authentication patterns are demonstrated using `the-internet.herokuapp.com` to show coverage without touching production credentials. |
| Visual regression | Functional DOM and algorithmic validation is the focus. CSS/snapshot testing is out of scope for this iteration. |
