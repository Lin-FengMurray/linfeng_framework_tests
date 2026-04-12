# Case Study: Automation Exercise End-to-End Test Framework

While a targeted set of scripts could have covered only the official TC list, this project goes further by architecting a comprehensive, production-ready Playwright framework. The goal is to demonstrate how a complete testing ecosystem would be structured for a client-facing ecommerce platform in a Managed Service environment — with a focus on stability, cross-layer coverage, test isolation discipline, and actionable failure reporting.

---

## 1. Technical Environment

| Concern | Choice |
|---|---|
| Automation Framework | Playwright Test Runner |
| Language | JavaScript (Node.js, ESM) |
| Browser Matrix | Chromium, Firefox, WebKit (via named projects) |
| Design Pattern | Page Object Model (POM) + Component abstraction + API client layer |
| Fixture Pattern | `test.extend()` with `freshUser` / `authedPage` lifecycle management |
| Reporting | Playwright HTML Reporter + custom long-format CSV for dashboard use |
| Target Application | automationexercise.com (open-source ecommerce practice site) |

---

## 2. Test Strategy

The strategy covers four distinct layers:

- **UI layer** — full customer journey from registration through checkout, covering 26 official test cases (TC01–TC26) plus 40+ edge cases across auth, product discovery, cart, checkout, payment, scroll controls, and network interception.
- **API layer** — all 14 official API test cases (API01–API14) plus schema validation, contract testing, and negative-path coverage against the REST endpoints (`/api/productsList`, `/api/brandsList`, `/api/verifyLogin`, `/api/createAccount`, etc.).
- **E2E layer** — four full user journeys that cross both the UI and API layers, including `api_create_user_then_complete_ui_checkout` which creates an account via REST and then logs in and purchases through the browser.
- **Visual layer** — screenshot comparison for key pages (Homepage, Products, Product Detail) and components (Header, CartModal) to catch unintended CSS regressions.

Cross-browser parity was a first-class concern. All UI and E2E tests run across Chromium, Firefox, and WebKit simultaneously under three named Playwright projects (`automationexercise-chromium`, `automationexercise-firefox`, `automationexercise-webkit`). The API project runs on a single headless context since HTTP responses are browser-independent.

---

## 3. Scope & Test Coverage

**UI — Smoke (01_smoke):**
- Homepage loads and all core navigation links resolve without 404.

**UI — Authentication (02_auth):**
- Registration: valid data (TC01), existing email rejection (TC05), whitespace trimming, missing required fields.
- Login: valid credentials (TC02), wrong password (TC03), unregistered email, case sensitivity, password masking.
- Logout: redirect to login page (TC04), session cleared on browser back navigation.
- Session: persistence after page reload, authenticated user redirected away from login.

**UI — Contact & Navigation (03_contact, 04_navigation):**
- Contact form submission with file upload (TC06).
- Test cases page accessible from nav (TC07), all nav links resolve without 404.

**UI — Products (05_products):**
- Product listing display (TC08), detail page name/price/brand/availability/condition (TC08).
- Search: matching results (TC09), empty term, SQL injection safety.
- Categories (TC18) and Brands (TC19) sidebar filtering.
- Review submission (TC21) and recommended item add-to-cart from homepage (TC22).

**UI — Cart (06_cart):**
- Add single (TC12), multiple (TC12), and custom-quantity (TC13) products.
- Remove product (TC17), empty cart state, quantity aggregation, cart badge count.
- Cart persistence after reload (edge), guest cart merges after login (edge), search → add → verify after login (TC20).
- Subscription footer visibility (TC10, TC11) and invalid email handling.

**UI — Checkout (07_checkout):**
- Place order: register during checkout (TC14), register before (TC15), log in before (TC16).
- Address details match registered user data (TC23), order review table shows correct products and prices.
- Payment: valid card (TC15 extended), empty card name, non-numeric card number, past expiry year.
- Invoice download after successful order (TC24).
- Checkout blocked when cart is empty, comment field XSS sanitisation.

**UI — Scroll & Network (08_scroll, 09_network):**
- Scroll-up via arrow button (TC25) and without arrow (TC26).
- Route interception: product API failure recovery, login 500 handling, stubbed API response rendering.
- Request inspection: login form field verification, search query parameter correctness.

**API:**
- Products list (API01), POST to products returns 405 (API02), brands list (API03), PUT to brands returns 405 (API04).
- Product search: results (API05), missing param returns 400 (API06).
- Verify login: valid (API07), missing email (API08), DELETE returns 405 (API09), invalid credentials (API10).
- Create (API11), delete (API12), update (API13) account. Get user by email (API14), unknown email 404.
- Schema validation for all response shapes, contract tests comparing API and UI data.

**E2E:**
- Guest browse and complete full purchase.
- Register → login → search → buy product.
- Returning user reorders from existing account.
- API create user → UI login → complete checkout.

---

## 4. Page Object Model Architecture

DOM locators and interaction logic are kept strictly separate from test assertions. The inheritance chain is:

```
BasePage
  ├── HomePage
  ├── LoginPage
  ├── SignupPage
  ├── AccountCreatedPage
  ├── AccountDeletedPage
  ├── ContactUsPage
  ├── TestCasesPage
  ├── ProductsPage
  ├── ProductDetailPage
  ├── CartPage
  ├── CheckoutPage
  ├── PaymentPage
  └── OrderPlacedPage
```

- **`BasePage.js`** — Shared `goto()` pattern and `waitForLoadState` utilities. All page objects extend this class.
- **`ProductsPage.js`** — Encapsulates the `/products` listing page: search input, submit button, and the `search()` method that coordinates form fill, network idle wait, and container readiness. See Debugging Report §1 for why the container target is `.features_items` rather than `#searched-products`.
- **`CartPage.js`** — Cart row locators, `cartRows`, `emptyCartMessage`, `proceedToCheckoutAsLoggedIn()`. See Debugging Report §3 for the `waitForLoadState('networkidle')` requirement before interacting with the delete button.
- **`CheckoutPage.js`** — Multi-step checkout form, delivery address block, and comment textarea.
- **`PaymentPage.js`** — Card detail fields, pay button, and order confirmation routing.

**Component classes** extract shared UI fragments that appear on multiple pages:

- **`ProductGrid.js`** — Configurable root selector (defaults to `.features_items`). Used by both the product listing page and the post-search result state. Critical design decision: the grid root cannot be `#searched-products` — see Debugging Report §1.
- **`CartModal.js`** — The modal that appears after "Add to cart": `viewCart()` and `continueShopping()` actions.
- **`CategorySidebar.js`** / **`BrandSidebar.js`** — Left-rail filter navigation.
- **`SubscriptionForm.js`** / **`RecommendedItems.js`** — Footer and homepage fragments.

If the automationexercise UI changes a locator, only the relevant Page Object or Component needs updating. Spec files remain untouched — they act solely as the source of truth for business logic assertions.

---

## 5. Fixture & Test Data Architecture

### `fixtures/index.js` — `test.extend()` only

All fixtures are pure Playwright fixture extensions. No static data lives here.

- **`freshUser`** — Calls `testDataFactory.createUser()` before the test, registers the account via `AutomationExerciseApiClient`, yields the user object to the test, then deletes the account via API after the test completes (pass or fail). This guarantees a clean server-side state for every auth test run.
- **`authedPage`** — Extends `freshUser`. Navigates to `/login`, fills credentials, and waits for the post-login redirect before yielding. Tests receive a fully authenticated page context without repeating login steps.
- **POM fixtures** — `productsPage`, `cartPage`, `checkoutPage`, `paymentPage`, `cartModal`, etc. are injected automatically from the fixture layer so spec files never instantiate page objects directly.

### `test-data/` — Static JSON

| File | Purpose |
|---|---|
| `users.json` | Pre-registered test account for auth tests that don't need cleanup |
| `products.json` | Expected product names and prices for assertion fixtures |
| `paymentCards.json` | Valid and invalid card data for payment tests |
| `reviews.json` | Review text strings for the product review submission tests |
| `upload-sample.txt` | File used by the contact form upload test (TC06) |

### `utils/testDataFactory.js`

Generates `test_<uuid>@example.com` email addresses. Every test that touches user creation or subscription forms calls `createUser()` — never a hardcoded email. This is the primary defence against test pollution across runs.

---

## 6. Test Pollution Awareness

Test pollution is the class of failure where one test's side effects cause a different test to fail — either in the same run or in a subsequent run against shared server state. automationexercise.com is a shared public server, making this a real and recurring risk.

### Identified pollution vectors and mitigations

**Subscription email reuse (TC10, TC11)**

The subscription endpoint rejects duplicate emails with `"Already Subscribed!"`. Any hardcoded email will pass once and fail on every subsequent run against the same server.

*Mitigation:* `testDataFactory.createUser()` is called inside the test body. The UUID email is used only once, per run, per test.

---

**TC05 — register with an existing email**

This test requires an account that already exists on the server. Relying on TC01 having run first introduces an ordering dependency — forbidden in a parallel test suite.

*Mitigation:* The `freshUser` fixture pre-creates the account via API before TC05's `test()` body starts. The test can unconditionally use `freshUser.email` as the "already exists" email. The fixture deletes the account after the test, leaving no orphan.

---

**Quantity-sensitive cart tests**

Tests asserting exact cart quantities (`add_product_with_custom_quantity_from_detail`, `same_product_added_twice_aggregates_quantity`, `cart_is_empty_after_removing_only_item`, `cart_contents_persist_after_page_reload`) will fail if a prior test left items in the cart — especially likely when `freshUser` reuses the same browser session after a test failure mid-checkout.

*Mitigation:* `cartHelpers.clearCart(page)` is called in `beforeEach`. The helper navigates to `/view_cart` and deletes all rows before the test body runs.

---

**TC24 — invoice download**

The invoice download test requires a completed order to exist. Depending on TC14/TC15/TC16 to have run first introduces ordering and state dependencies.

*Mitigation:* TC24 places a fresh order inline using its own `freshUser` and `authedPage`. The full add-to-cart → checkout → payment → confirmation journey is replayed within the test. The fixture cleans up the account after.

---

**API account lifecycle tests**

`create_account_returns_201_user_created`, `update_account_returns_200_user_updated`, and `delete_account_returns_200_account_deleted` call the API directly without the `freshUser` fixture. Each must create, operate on, and delete its own account.

*Mitigation:* Each test calls `testDataFactory.createUser()` for a unique email. A `try/finally` block ensures `api.deleteAccount()` runs even if the assertion fails, preventing orphaned accounts from accumulating on the server.

---

## 7. Debugging Reports

The following issues were discovered and resolved during the development and cross-browser validation phase.

---

### Report 1 — `#searched-products` is never in the DOM at networkidle

**Symptom:** The e2e test `register_login_search_and_buy_product` timed out waiting for `#searched-products` to appear. Timeout was raised from 15 s to 60 s; the element still never appeared.

**Investigation:**
- `waitForFunction(() => !!document.querySelector('#searched-products'))` returned immediately with `false`, confirming the element was absent from the live DOM at networkidle time.
- `page.evaluate()` was used to enumerate all IDs on the page at the time of timeout: nine `.product-image-wrapper` elements were present inside `.features_items`, but `#searched-products` did not exist.
- A Playwright YAML accessibility snapshot confirmed that search results are rendered into `.features_items` immediately after form submission. `#searched-products` is added to the DOM by a deferred JavaScript callback that fires approximately 45 seconds after `networkidle` — far outside any usable timeout.

**Root cause:** `#searched-products` is a deferred decoration element, not the search result container. The site renders results into the standard `.features_items` grid immediately and then adds a secondary `#searched-products` wrapper much later. No timeout value can reliably wait for it.

**Fix:**
1. `ProductsPage.search()` was rewritten to: fill the search input, click submit, `waitForLoadState('networkidle')`, then wait for `.features_items` container `{ state: 'attached' }`.
2. `ProductGrid` constructor root was changed from `'#searched-products'` to the default `'.features_items'` in all spec files that use post-search grids.

---

### Report 2 — `a.cart_quantity_delete` is 0×0 pixels at click time

**Symptom:** `remove_product_from_cart` (TC17) consistently failed. The `a.cart_quantity_delete` click had no effect and the cart row never detached. Multiple wait strategies were attempted: `waitForResponse`, `waitForURL`, extended `waitFor({ state: 'detached' })` — all failed.

**Investigation:**
- `page.evaluate(() => el.getBoundingClientRect())` on `a.cart_quantity_delete` returned `{ width: 0, height: 0, x: 0, y: 0 }`. A zero-size element cannot receive a Playwright click.
- The `<a>` element contains a Font Awesome `<i class="fa fa-times">` icon. The `<a>` itself has no intrinsic size — its rendered dimensions come entirely from the icon's font glyph.
- The Font Awesome `.woff2` font file had not finished loading at the time of the click attempt. Without the font, the `<i>` element has no glyph, no rendered size, and the parent `<a>` collapses to 0×0.

**Root cause:** The delete button's clickable area depends on Font Awesome font file loading. `networkidle` had not been awaited after `cartModal.viewCart()`, so the font file was still in flight.

**Fix:**
```js
await cartModal.viewCart();
await page.waitForLoadState('networkidle', { timeout: 20000 });
// Font Awesome has now loaded — delete button has non-zero dimensions
await firstRow.locator('a.cart_quantity_delete').click();
await firstRow.waitFor({ state: 'detached', timeout: 25000 });
```
`test.setTimeout(60_000)` was also added to accommodate slow AJAX responses under parallel load on the shared server.

---

### Report 3 — `#cart_info_table` does not exist on the checkout page

**Symptom:** `order_review_shows_correct_products_and_prices` failed with element not found on `#cart_info_table tbody tr`.

**Investigation:**
- A Playwright YAML accessibility snapshot was taken of the `/checkout` page. The order review table was confirmed to be present in the DOM and populated with the expected product. However, it had no `id` attribute.
- A separate snapshot of `/view_cart` confirmed that `#cart_info_table` is the id used on the cart page only — it does not exist on the checkout page.

**Root cause:** Selector was written against the wrong page's DOM. The checkout order review table is structurally identical to the cart table but carries a different (absent) id.

**Fix:**
```js
// Changed from:
const rows = page.locator('#cart_info_table tbody tr');
// To:
const rows = page.locator('table tbody tr');
```
The fixture parameter `authedPage` was also renamed to `authedPage: _authedPage` to suppress the unused-variable lint hint, since the authenticated state is the side effect — the variable itself is not referenced in the test body.

---

### Report 4 — CSV `suite` column showing "unknown" for nopcommerce

**Symptom:** After generating `test_results.csv`, the `suite` column in nopcommerce rows showed `"unknown"` instead of `"nopcommerce"`.

**Investigation:**
- `generate_csv_report.js` detects the suite name from the `spec.file` path using the regex `linfeng_framework_tests\/([^/]+)\/tests\/`.
- The Playwright JSON reporter emits file paths **relative to `testDir`**, not absolute. For nopcommerce, the path was `nopcommerce/tests/01_user_auth/...` — the `linfeng_framework_tests/` prefix was absent.

**Root cause:** The regex required the full absolute path prefix. Relative paths from `testDir` skipped the leading segment and never matched.

**Fix:** A fallback regex was added to `detectSuite()`:
```js
const m2 = filePath.match(/^([^/]+)\/tests\//);
if (m2) return m2[1];
```
This matches the relative path variant and correctly extracts the suite folder name.

---

### Report 5 — Dashboard showing "nan" and "automationexercise" in browser column

**Symptom:** The Streamlit dashboard bar chart showed unexpected browser values: `"nan"` and `"automationexercise"` alongside `"chromium"`, `"firefox"`, `"webkit"`.

**Investigation:**
- `pandas.read_csv()` without `on_bad_lines='skip'` was used to load the nopcommerce CSV.
- The nopcommerce CSV contained multi-line error messages. Some were not correctly re-quoted during CSV generation, producing rows with more columns than the header. Pandas misaligned these rows, shifting the suite name (`"nopcommerce"`) into column 10 (the `browser` column). This produced the spurious `"automationexercise"` value — it was actually a suite name from an adjacent row's data.
- The `"nan"` values came from API-only test rows in nopcommerce where `projectName` was `null` (API tests have no browser context), producing an empty `browser` field that pandas read as `NaN`.
- The `normalize_browser()` function converted `float('nan')` to the string `"nan"` via `str(raw)` before any NaN check.

**Root cause:** Two separate issues — CSV row misalignment from unescaped multi-line errors, and NaN not being checked before string conversion.

**Fix:**
1. `pd.read_csv(path, on_bad_lines="skip")` drops malformed rows.
2. `normalize_browser()` now checks `isinstance(raw, float) and math.isnan(raw)` before calling `str()`.

---

## 8. Strategic Trade-offs & Scope Boundaries

| Decision | Rationale |
|---|---|
| `freshUser` fixture over shared test accounts | A shared account accumulates state across tests and across runs. Per-test account creation via API is the only way to guarantee a clean starting state on a shared live server. |
| `ProductGrid` root is `.features_items`, not `#searched-products` | `#searched-products` is a deferred decoration that arrives 45 s after networkidle — not a usable selector for any timeout. `.features_items` is populated immediately and is the correct container. |
| `waitForLoadState('networkidle')` before delete button click | The Font Awesome font file must finish loading before `a.cart_quantity_delete` has a non-zero rendered size. Without this, Playwright cannot click a 0×0 element regardless of how long it waits. |
| `form:` key for API client payloads | The automationexercise API requires `application/x-www-form-urlencoded`. Playwright's `request.post({ form: {...} })` sends the correct Content-Type header automatically. Using `data:` or `json:` produces 200 responses with error codes in the body. |
| Long-format CSV with `run_timestamp` | Results are appended rather than overwritten, enabling historical trend analysis and dashboard use across multiple runs without losing prior data. |
| `test.skip` over deletion for unsupported visual baselines | Skipped visual tests appear in the HTML report with their skip reason, keeping the intended visual coverage scope visible to reviewers. |
| `retries: 1` for flaky live-server tests | Three tests (cart delete AJAX, payment confirmation, order review) are affected by server response latency under parallel browser load. One retry is the correct response — it surfaces whether the failure is consistent or transient without masking genuine bugs. |
| Visual regression via Playwright screenshots | Functional DOM validation is the primary focus. A dedicated visual testing tool (Percy, Applitools) would be appropriate for production visual regression at scale. |
