# nopCommerce — Playwright Test Framework

A production-ready end-to-end test suite for [demo.nopcommerce.com](https://demo.nopcommerce.com), built with Playwright Test Runner and the Page Object Model (POM) design pattern.

---

## Requirements

- Node.js v18+
- npm

```bash
npm install
npx playwright install
```

---

## Setup

### 1. Register a test account
Create a free account at https://demo.nopcommerce.com/register and update `fixtures/users.json` with your credentials:

```json
{
  "validUser": { "email": "your@email.com", "password": "YourPassword" },
  "invalidEmailUser": { "email": "not-an-email", "password": "anything" }
}
```

### 2. Generate auth state (optional — for authenticated test projects)
```bash
node fixtures/saveAuthState.js
```
A browser window will open — log in manually when prompted. This saves `fixtures/authState.json` for the authenticated project.

---

## How to Run

**Full suite across all browsers:**
```bash
npx playwright test linfeng_framework_tests/nopcommerce
```

**Single browser:**
```bash
npx playwright test linfeng_framework_tests/nopcommerce --project=chromium
npx playwright test linfeng_framework_tests/nopcommerce --project=firefox
npx playwright test linfeng_framework_tests/nopcommerce --project=webkit
```

**Specific section:**
```bash
npx playwright test linfeng_framework_tests/nopcommerce/tests/01_user_auth/
npx playwright test linfeng_framework_tests/nopcommerce/tests/09_security/
```

**View HTML report after a run:**
```bash
npx playwright show-report
```

**Generate CSV report (long format, appends each run):**
```bash
npx playwright test linfeng_framework_tests/nopcommerce --reporter=json 2>/dev/null \
  | node linfeng_framework_tests/nopcommerce/scripts/generate_csv_report.js
```

---

## Folder Structure

```
nopcommerce/
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── HomePage.js
│   ├── ProductsPage.js
│   ├── ProductDetailPage.js
│   ├── CartPage.js
│   ├── WishlistPage.js
│   ├── CheckoutPage.js
│   ├── GiftCardsPage.js
│   └── NewsletterPage.js
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── MiniCart.js
│   └── ProductCard.js
├── fixtures/
│   ├── users.json
│   ├── products.json
│   ├── cartMock.js
│   └── saveAuthState.js
├── utils/
│   ├── helpers.js
│   └── validation.js
├── scripts/
│   └── generate_csv_report.js
├── tests/
│   ├── 01_user_auth/
│   │   ├── login/
│   │   │   ├── login_page_renders_correctly.spec.js
│   │   │   ├── login_with_valid_credentials.spec.js
│   │   │   ├── login_with_wrong_password.spec.js
│   │   │   ├── login_shows_error_for_invalid_email_format.spec.js
│   │   │   └── forgot_password_link_navigates_to_recovery.spec.js
│   │   ├── registration/
│   │   │   ├── register_with_valid_data.spec.js
│   │   │   ├── register_with_duplicate_email.spec.js
│   │   │   ├── register_with_missing_fields.spec.js
│   │   │   └── register_rejects_mismatched_passwords.spec.js
│   │   └── password_recovery/
│   │       ├── recovery_shows_error_for_empty_email.spec.js
│   │       ├── recovery_shows_error_for_invalid_email.spec.js
│   │       └── recovery_email_sent_confirmation.spec.js
│   ├── 02_product_catalog/
│   │   ├── category_navigation/
│   │   │   ├── navigate_to_computers.spec.js
│   │   │   └── navigate_to_books.spec.js
│   │   ├── product_listing/
│   │   │   ├── products_display_in_grid.spec.js
│   │   │   └── sort_by_price_and_name.spec.js
│   │   ├── product_detail/
│   │   │   ├── view_product_details.spec.js
│   │   │   └── product_price_and_images_visible.spec.js
│   │   └── search/
│   │       ├── search_returns_matching_results.spec.js
│   │       └── search_shows_no_results_message.spec.js
│   ├── 03_shopping_cart/
│   │   ├── add_to_cart/
│   │   │   ├── add_single_product.spec.js
│   │   │   ├── add_multiple_products.spec.js
│   │   │   └── add_with_custom_quantity.spec.js
│   │   ├── cart_management/
│   │   │   ├── remove_product.spec.js
│   │   │   ├── update_product_quantity.spec.js
│   │   │   └── cart_persists_after_navigation.spec.js
│   │   └── mini_cart/
│   │       └── hover_shows_items_subtotal_actions.spec.js
│   ├── 04_wishlist/
│   │   ├── add_to_wishlist/
│   │   │   ├── add_single_product.spec.js
│   │   │   └── add_multiple_products.spec.js
│   │   ├── wishlist_management/
│   │   │   ├── remove_product.spec.js
│   │   │   └── update_quantity.spec.js
│   │   └── wishlist_to_cart/
│   │       └── move_item_to_cart.spec.js
│   ├── 05_checkout/
│   │   ├── guest_checkout/
│   │   │   └── complete_order_as_guest.spec.js
│   │   └── registered_checkout/
│   │       └── complete_order_as_registered_user.spec.js
│   ├── 06_gift_cards/
│   │   ├── physical/
│   │   │   └── add_physical_gift_card_to_cart.spec.js
│   │   └── virtual/
│   │       └── add_virtual_gift_card_to_cart.spec.js
│   ├── 07_news/
│   │   ├── browsing/
│   │   │   ├── view_news_list.spec.js
│   │   │   └── open_news_article.spec.js
│   │   └── interactions/
│   │       ├── submit_comment_on_article.spec.js
│   │       └── subscribe_to_newsletter.spec.js
│   ├── 08_ui/
│   │   ├── header_footer/
│   │   │   ├── header_renders_correctly.spec.js
│   │   │   └── footer_renders_correctly.spec.js
│   │   ├── navigation/
│   │   │   ├── top_menu_shows_all_categories.spec.js
│   │   │   └── category_links_navigate_correctly.spec.js
│   │   ├── responsive/
│   │   │   ├── homepage_renders_on_desktop.spec.js
│   │   │   ├── homepage_renders_on_tablet.spec.js
│   │   │   └── homepage_renders_on_mobile.spec.js
│   │   └── search/
│   │       ├── search_box_visible_on_homepage.spec.js
│   │       └── empty_search_shows_warning.spec.js
│   ├── 09_security/
│   │   ├── access_control/
│   │   │   ├── redirect_unauthenticated_to_login.spec.js
│   │   │   └── block_direct_checkout_access.spec.js
│   │   ├── form_validation/
│   │   │   ├── register_rejects_invalid_email.spec.js
│   │   │   └── register_rejects_mismatched_passwords.spec.js
│   │   └── error_handling/
│   │       ├── login_error_for_wrong_credentials.spec.js
│   │       └── password_recovery_unknown_email.spec.js
│   └── 10_e2e/
│       ├── guest_checkout_end_to_end.spec.js
│       ├── register_login_buy_book.spec.js
│       ├── wishlist_to_cart_checkout.spec.js
│       └── gift_card_purchase_end_to_end.spec.js
└── test_results.csv
```

---

## Design Conventions

- **One test per file** — each `.spec.js` contains one `test.describe` block with one `test()`. The filename is the description.
- **Self-contained tests** — each test handles its own navigation inline. No shared `beforeEach` state between files.
- **Page Objects in `pages/`** — locators and reusable actions are kept separate from assertions.
- **Components in `components/`** — shared UI fragments (Header, Footer, MiniCart, ProductCard) are extracted into component classes.
- **Utilities in `utils/`** — stateless helper functions (`generateRandomEmail`, `generateRandomString`, form validators) available for test data generation.

---

## Known Limitations

Tests that require form submission through demo.nopcommerce.com (cart add, checkout, wishlist actions) are skipped due to Cloudflare Bot Fight Mode blocking automated POST requests in headless mode. The test logic is complete — all skipped tests pass against a local instance:

```bash
docker run -p 80:80 nopcommerceteam/nopcommerce
```

Tests are marked `test.skip(true, 'Cloudflare blocks...')` rather than deleted, so the intended coverage is visible in the HTML report.

---

> See [CASE_STUDY.md](./CASE_STUDY.md) for architecture decisions, test strategy, and trade-off rationale.
