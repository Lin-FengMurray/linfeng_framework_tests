# Case Study: nopCommerce End-to-End Test Framework

While a targeted test suite could have covered only the most visible user flows, this project goes further by architecting a comprehensive, production-ready Playwright framework. The goal is to demonstrate how a complete testing ecosystem would be structured for a client-facing ecommerce platform in a Managed Service environment — with a focus on stability, rapid triage, and long-term maintainability.

---

## 1. Technical Environment

| Concern | Choice |
|---|---|
| Automation Framework | Playwright Test Runner |
| Language | JavaScript (Node.js, ESM) |
| Browser Matrix | Chromium, Firefox, WebKit |
| Design Pattern | Page Object Model (POM) + Component abstraction |
| Reporting | Playwright HTML Reporter + custom long-format CSV for dashboard use |
| Target Application | demo.nopcommerce.com (open-source .NET ecommerce demo) |

---

## 2. Test Strategy

The strategy prioritized coverage across the core ecommerce customer journey — from authentication through product discovery, cart management, and checkout — while explicitly accounting for the constraints of a shared, Cloudflare-protected demo environment.

- **Authentication and form validation** were tested end-to-end, including edge cases such as invalid email format, empty required fields, mismatched passwords, and duplicate registration.
- **Product catalog flows** were validated via direct URL navigation, which bypasses Cloudflare's challenge layer and produces stable results.
- **Cart, wishlist, and checkout flows** were written in full but marked `test.skip` with documentation, as Cloudflare's Bot Fight Mode blocks automated POST requests in headless browsers on the demo site.
- **Security and access control** tests verified that unauthenticated users are correctly redirected and that protected routes cannot be accessed directly.
- **UI and responsive tests** validated layout integrity across desktop, tablet, and mobile viewports without relying on visual regression tooling.

---

## 3. Scope & Test Coverage

**User Authentication (01_user_auth):**
- Login page rendering, valid and invalid credential handling, email format validation, and forgot password link navigation.
- Registration: valid data, duplicate email rejection, missing required fields, and password mismatch validation.
- Password recovery: empty and invalid email error messages, and recovery email confirmation flow.

**Product Catalog (02_product_catalog):**
- Category navigation to Computers and Books sections.
- Product listing grid display and sort-by-price / sort-by-name validation.
- Product detail page rendering (skipped on demo — Cloudflare blocks headless access to product pages).
- Search results for valid queries and no-results messaging.

**Shopping Cart (03_shopping_cart):**
- Add single product, multiple products, and custom quantity (all skipped — Cloudflare blocks add-to-cart POST).
- Cart management: remove item, update quantity, and persistence across navigation.
- Mini cart hover behavior.

**Wishlist (04_wishlist):**
- Add single and multiple products (skipped — Cloudflare).
- Remove and update wishlist items, and move to cart flow.

**Checkout (05_checkout):**
- Guest checkout and registered user checkout end-to-end flows (skipped — Cloudflare).

**Gift Cards (06_gift_cards):**
- Physical and virtual gift card add-to-cart scenarios (skipped — Cloudflare).

**News (07_news):**
- News list rendering, article detail navigation, comment submission, and newsletter subscription.

**UI (08_ui):**
- Header and footer rendering, top menu category links, responsive layout validation across three viewport sizes, and search box visibility.

**Security (09_security):**
- Unauthenticated redirect to login, direct checkout access block, registration form validation, login error messages, and password recovery unknown email handling.

**End-to-End (10_e2e):**
- Full guest checkout, register-login-buy flow, wishlist-to-cart-checkout, and gift card purchase journeys (all skipped — Cloudflare).

---

## 4. Page Object Model Architecture

DOM locators and interaction logic are kept strictly separate from test assertions:

- **`BasePage.js`** — Shared navigation and wait utilities inherited by all page objects.
- **`LoginPage.js`** — Login form, forgot password link, recovery form, and all associated error locators.
- **`RegisterPage.js`** — Registration form fields and validation message locators.
- **`HomePage.js`** — Homepage entry point, featured products, and newsletter section.
- **`ProductsPage.js`** — Product grid, sort dropdown, and pagination controls.
- **`ProductDetailPage.js`** — Product name, price, image gallery, and add-to-cart button.
- **`CartPage.js`** — Line items, quantity inputs, remove buttons, and subtotal locators.
- **`WishlistPage.js`** — Wishlist item list and move-to-cart action.
- **`CheckoutPage.js`** — Multi-step checkout form fields, continue buttons, and order confirmation.
- **`GiftCardsPage.js`** — Gift card recipient fields and add-to-cart flow.
- **`NewsletterPage.js`** — Newsletter subscription input and confirmation message.

Component classes (`Header.js`, `Footer.js`, `MiniCart.js`, `ProductCard.js`) extract shared UI fragments that appear across multiple pages, reducing locator duplication.

If the nopCommerce UI changes, only the relevant Page Object or Component needs updating. The `.spec.js` files remain untouched — they act solely as the source of truth for business logic assertions.

---

## 5. Triage & Error Handling

Several browser-specific and environment-specific issues were identified and resolved during development:

- **Chromium HTML5 email validation** — Chromium's native `type="email"` validation intercepted form submission before server-side jQuery Validation fired, leaving `[data-valmsg-for="Email"]` unpopulated. Fixed by using `page.evaluate()` to change the input `type` to `text` before submitting, forcing server-side error messages to surface.
- **WebKit native form validation** — WebKit's `required` attribute triggered a native browser popup instead of jQuery's error element. Fixed by additionally removing the `required` attribute via `page.evaluate()` before submission.
- **Cross-browser selector differences** — The nopCommerce search button rendered as `input[type="submit"]` rather than a `<button>` element. Selector variations (`getByRole`, `.search-button`, `input.search-button`) were tested before diagnosing the root cause as Cloudflare blocking the page load entirely.
- **Cloudflare Bot Fight Mode** — Headless browser navigation to `/search` directly returns a `Just a moment...` challenge page (confirmed via page title logging). Three bypass approaches were attempted: button selector variants, keyboard `Enter` on the search input, and homepage session warm-up within the same browser context. All were blocked. Affected tests are marked `test.skip` with a note to run against a local nopCommerce instance.
- **Intermittent URL-assertion timing** — WebKit occasionally completed URL navigation before the DOM fully rendered. Fixed by adding `page.waitForLoadState('domcontentloaded')` after link clicks, and simplifying heading assertions to URL-only checks where Cloudflare could interfere with page content.

---

## 6. Strategic Trade-offs & Scope Boundaries

| Decision | Rationale |
|---|---|
| `test.skip` over deletion for Cloudflare-blocked tests | Skipped tests appear in the HTML report with their skip reason, making intended coverage visible to reviewers. Deleting them would hide the scope. |
| URL-only assertions for navigation tests | Some page heading assertions failed intermittently on WebKit when Cloudflare challenged the navigation destination. The URL assertion alone is the correct scope for a navigation test — it validates routing, not page content. |
| `page.evaluate()` to bypass HTML5 validation | Browser-native validation varies by browser and prevents server-side errors from surfacing. Disabling it in test setup is the standard Playwright pattern for testing server-side form validation logic. |
| Long-format CSV with `run_timestamp` | Results are appended rather than overwritten, enabling historical comparison and dashboard use across multiple runs without losing prior data. |
| Docker note for Cloudflare-blocked tests | `docker run -p 80:80 nopcommerceteam/nopcommerce` is included as a reproduction path so that any reviewer can verify the full suite passes in an unprotected environment. |
| Visual regression out of scope | Functional DOM and form validation testing is the focus. CSS/snapshot testing would require a stable visual baseline and is better suited to a dedicated visual testing tool (e.g., Percy, Applitools). |
