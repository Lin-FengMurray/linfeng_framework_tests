# Automation Exercise — Playwright Test Framework

A production-ready end-to-end test suite for [automationexercise.com](https://automationexercise.com), built with Playwright Test Runner, the Page Object Model (POM) design pattern, and a layered API client. The framework covers UI flows, REST API validation, contract testing, end-to-end journeys, and visual snapshots — all running across three browser engines.

---

## Requirements

- Node.js v18+
- npm

```bash
# Run once from the linfeng_framework_tests/ root
npm install
npx playwright install
```

---

## How to Run

**Full suite across all browsers:**
```bash
npx playwright test --config=automationexercise/playwright.config.js
```

**Single browser:**
```bash
npx playwright test --config=automationexercise/playwright.config.js --project=automationexercise-chromium
npx playwright test --config=automationexercise/playwright.config.js --project=automationexercise-firefox
npx playwright test --config=automationexercise/playwright.config.js --project=automationexercise-webkit
```

**By test layer:**
```bash
npx playwright test --config=automationexercise/playwright.config.js tests/ui/
npx playwright test --config=automationexercise/playwright.config.js tests/api/
npx playwright test --config=automationexercise/playwright.config.js tests/e2e/
npx playwright test --config=automationexercise/playwright.config.js tests/visual/
```

**By TC tag:**
```bash
npx playwright test --config=automationexercise/playwright.config.js --grep "TC14"
```

**View HTML report after a run:**
```bash
npx playwright show-report
```

**Generate CSV report (long format, appends each run):**
```bash
npx playwright test --config=automationexercise/playwright.config.js --reporter=json 2>/dev/null \
  | node automationexercise/scripts/generate_csv_report.js
```

---

## Folder Structure

```
automationexercise/
├── pages/
│   ├── BasePage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── SignupPage.js
│   ├── AccountCreatedPage.js
│   ├── AccountDeletedPage.js
│   ├── ContactUsPage.js
│   ├── TestCasesPage.js
│   ├── ProductsPage.js
│   ├── ProductDetailPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── PaymentPage.js
│   └── OrderPlacedPage.js
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── ProductCard.js
│   ├── ProductGrid.js
│   ├── CategorySidebar.js
│   ├── BrandSidebar.js
│   ├── CartModal.js
│   ├── SubscriptionForm.js
│   └── RecommendedItems.js
├── fixtures/
│   └── index.js                        ← test.extend() only — no static data here
├── test-data/
│   ├── users.json
│   ├── products.json
│   ├── paymentCards.json
│   ├── reviews.json
│   └── upload-sample.txt
├── utils/
│   ├── testDataFactory.js              ← UUID email generator + auto cleanup
│   ├── authHelpers.js
│   ├── cartHelpers.js
│   ├── checkoutHelpers.js
│   ├── fileHelpers.js
│   ├── assertions.js
│   └── apiAssertions.js
├── api/
│   ├── clients/
│   │   └── AutomationExerciseApiClient.js
│   ├── schemas/
│   │   ├── products.schema.js
│   │   ├── brands.schema.js
│   │   └── user.schema.js
│   └── helpers/
│       └── apiAssertions.js
├── scripts/
│   └── generate_csv_report.js
└── tests/
    ├── ui/
    │   ├── 01_smoke/
    │   ├── 02_auth/
    │   │   ├── registration/
    │   │   ├── login/
    │   │   ├── logout/
    │   │   └── session/
    │   ├── 03_contact/
    │   ├── 04_navigation/
    │   ├── 05_products/
    │   │   ├── listing/
    │   │   ├── detail/
    │   │   ├── search/
    │   │   ├── categories/
    │   │   ├── brands/
    │   │   ├── reviews/
    │   │   └── recommended/
    │   ├── 06_cart/
    │   │   ├── add_to_cart/
    │   │   ├── cart_management/
    │   │   ├── persistence/
    │   │   └── subscription/
    │   ├── 07_checkout/
    │   │   ├── place_order/
    │   │   ├── address_and_review/
    │   │   ├── payment/
    │   │   ├── invoice/
    │   │   └── validation/
    │   ├── 08_scroll/
    │   └── 09_network/
    │       ├── route_interception/
    │       └── request_inspection/
    ├── api/
    │   ├── 01_smoke/
    │   ├── 02_products/
    │   ├── 03_brands/
    │   ├── 04_auth/
    │   │   ├── verify_login/
    │   │   ├── account_lifecycle/
    │   │   └── get_user/
    │   ├── 05_schema/
    │   ├── 06_contract/
    │   └── 07_negative/
    ├── e2e/
    │   ├── guest_browse_and_complete_full_purchase.spec.js
    │   ├── register_login_search_and_buy_product.spec.js
    │   ├── returning_user_reorders_from_existing_account.spec.js
    │   └── api_create_user_then_complete_ui_checkout.spec.js
    └── visual/
        ├── pages/
        └── components/
```

---

## Design Conventions

- **One test per file** — each `.spec.js` contains one `test()`. The filename is the description.
- **Self-contained tests** — each test owns its own setup and navigation. No shared `beforeEach` across files.
- **Page Objects in `pages/`** — locators and interaction logic live here. Spec files contain assertions only.
- **Components in `components/`** — shared UI fragments (CartModal, ProductGrid, CategorySidebar, etc.) that appear across multiple pages are extracted into component classes.
- **Fixtures in `fixtures/index.js`** — `test.extend()` only. Auto-injects page objects and manages the `freshUser` / `authedPage` lifecycle. Never used for static data.
- **Static data in `test-data/`** — JSON files only. Never mixed into fixtures.
- **API client in `api/clients/`** — wraps Playwright's native `request` context. Uses `form:` key for `application/x-www-form-urlencoded` payloads. No axios or node-fetch.
- **All imports from `fixtures/index.js`** — spec files never import directly from `@playwright/test`.

---

## Test Pollution Awareness

Several test categories have side effects that cause cascading failures or false positives across runs. The following guards are required:

| Scenario | Risk | Guard |
|---|---|---|
| Subscription tests (TC10, TC11) | Hardcoded email fails on second run ("already subscribed") | `testDataFactory.createUser()` generates a unique email per run |
| TC05 — register with existing email | Depends on a pre-existing account; cannot rely on TC01 having run first | `freshUser` fixture pre-creates the account via API before the test |
| Quantity-sensitive cart tests | Stale cart items from a prior failed run corrupt quantity assertions | `clearCart()` in `beforeEach` via `cartHelpers.js` |
| TC24 — download invoice | Requires a completed order; cannot rely on TC15/TC16 | Full order is placed inline using `freshUser` + `authedPage` within the same test |
| API account lifecycle tests | Create/delete operations leave orphaned accounts if cleanup is skipped | Each test creates its own user via `testDataFactory` and deletes it in a `finally` block |

---

## Known Limitations

- **Live server variability** — automationexercise.com is a shared public demo. Under parallel browser load, AJAX operations (cart delete, payment confirmation) occasionally time out on the first attempt and succeed on retry. Three tests are marked flaky with `retries: 1` in the config.
- **Visual snapshot baseline** — Visual tests use Playwright's built-in screenshot comparison. Baselines must be regenerated if the site's CSS changes or a new browser version renders fonts differently.

---

> See [CASE_STUDY.md](./CASE_STUDY.md) for architecture decisions, debugging reports, test pollution analysis, and trade-off rationale.
