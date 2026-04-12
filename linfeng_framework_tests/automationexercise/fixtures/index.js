// automationexercise/fixtures/index.js
// Central fixture file — import { test, expect } from here in every spec.
// Never import directly from @playwright/test.

import { test as base, expect } from '@playwright/test';

// ── Components ─────────────────────────────────────────────────────────────
import { Header }            from '../components/Header.js';
import { Footer }            from '../components/Footer.js';
import { CategorySidebar }   from '../components/CategorySidebar.js';
import { BrandSidebar }      from '../components/BrandSidebar.js';
import { CartModal }         from '../components/CartModal.js';
import { RecommendedItems }  from '../components/RecommendedItems.js';
import { SubscriptionForm }  from '../components/SubscriptionForm.js';

// ── Page objects ───────────────────────────────────────────────────────────
import { BasePage }           from '../pages/BasePage.js';
import { HomePage }           from '../pages/HomePage.js';
import { LoginPage }          from '../pages/LoginPage.js';
import { SignupPage }         from '../pages/SignupPage.js';
import { AccountCreatedPage } from '../pages/AccountCreatedPage.js';
import { AccountDeletedPage } from '../pages/AccountDeletedPage.js';
import { ContactUsPage }      from '../pages/ContactUsPage.js';
import { TestCasesPage }      from '../pages/TestCasesPage.js';
import { ProductsPage }       from '../pages/ProductsPage.js';
import { ProductDetailPage }  from '../pages/ProductDetailPage.js';
import { CartPage }           from '../pages/CartPage.js';
import { CheckoutPage }       from '../pages/CheckoutPage.js';
import { PaymentPage }        from '../pages/PaymentPage.js';
import { OrderPlacedPage }    from '../pages/OrderPlacedPage.js';

// ── API client ─────────────────────────────────────────────────────────────
import { AutomationExerciseApiClient } from '../api/clients/AutomationExerciseApiClient.js';

// ── User factory ───────────────────────────────────────────────────────────
import { createUser } from '../utils/testDataFactory.js';

export { expect };

export const test = base.extend({

  // ── Block Google ad vignettes that intercept page navigation ─────────────
  page: async ({ page }, use) => {
    // 1. Block ad network requests
    const adPatterns = [
      '**/*googlesyndication*',
      '**/*doubleclick*',
      '**/*googletagservices*',
      '**/*pagead*',
      '**/*googleadservices*',
      '**/*google_vignette*',
    ];
    await Promise.all(adPatterns.map(p => page.route(p, r => r.abort())));

    // 2. Kill AdSense before it activates.
    // Route blocking alone is insufficient in WebKit — the adsbygoogle script still runs
    // from cache or from a CDN variant not in the block list, and the resulting ins.adsbygoogle
    // iframe intercepts pointer events even after the network request is aborted.
    //
    // Strategy (layered):
    //   a) Stub window.adsbygoogle.push as a no-op before any ad script runs, so no ad ever
    //      gets queued or rendered by the library.
    //   b) Intercept Element.prototype.setAttribute to block data-vignette-loaded (the flag
    //      that enables the full-page vignette overlay).
    //   c) MutationObserver as last-resort: hide any ins.adsbygoogle that slip through.
    await page.addInitScript(() => {
      // (a) Stub adsbygoogle.push — this must run before adsbygoogle.js evaluates.
      Object.defineProperty(window, 'adsbygoogle', {
        configurable: true,
        get() { return { push() {}, length: 0 }; },
        set() {},   // silently discard writes from adsbygoogle.js
      });

      // (b) Block data-vignette-loaded from ever being set on any element.
      const _origSetAttr = Element.prototype.setAttribute;
      Element.prototype.setAttribute = function(name, value) {
        if (name === 'data-vignette-loaded') return;
        return _origSetAttr.call(this, name, value);
      };

      // (c) Belt-and-suspenders: hide any ins.adsbygoogle elements that do appear.
      const suppressAds = () => {
        document.querySelectorAll('ins.adsbygoogle, ins.adsbygoogle-noablate').forEach(el => {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('pointer-events', 'none', 'important');
        });
      };
      new MutationObserver(suppressAds).observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-adsbygoogle-status', 'class'],
      });
      suppressAds();
    });

    // 3. Patch all mechanisms the vignette uses to inject #google_vignette into the URL
    await page.addInitScript(() => {
      // Patch history.pushState / replaceState
      const _push = history.pushState.bind(history);
      history.pushState = (s, t, url) => {
        if (typeof url === 'string' && url.includes('google_vignette')) return;
        _push(s, t, url);
      };
      const _replace = history.replaceState.bind(history);
      history.replaceState = (s, t, url) => {
        if (typeof url === 'string' && url.includes('google_vignette')) return;
        _replace(s, t, url);
      };
      // Patch location.hash setter (the primary vignette mechanism)
      try {
        const hashDesc = Object.getOwnPropertyDescriptor(Location.prototype, 'hash');
        if (hashDesc && hashDesc.set) {
          Object.defineProperty(Location.prototype, 'hash', {
            ...hashDesc,
            set(value) {
              if (typeof value === 'string' && value.includes('google_vignette')) return;
              hashDesc.set.call(this, value);
            },
          });
        }
      } catch (_) {}
    });

    await use(page);
  },

  // ── Page object fixtures (auto-injected, no boilerplate in specs) ────────
  basePage:           ({ page }, use) => use(new BasePage(page)),
  homePage:           ({ page }, use) => use(new HomePage(page)),
  loginPage:          ({ page }, use) => use(new LoginPage(page)),
  signupPage:         ({ page }, use) => use(new SignupPage(page)),
  accountCreatedPage: ({ page }, use) => use(new AccountCreatedPage(page)),
  accountDeletedPage: ({ page }, use) => use(new AccountDeletedPage(page)),
  contactUsPage:      ({ page }, use) => use(new ContactUsPage(page)),
  testCasesPage:      ({ page }, use) => use(new TestCasesPage(page)),
  productsPage:       ({ page }, use) => use(new ProductsPage(page)),
  productDetailPage:  ({ page }, use) => use(new ProductDetailPage(page)),
  cartPage:           ({ page }, use) => use(new CartPage(page)),
  checkoutPage:       ({ page }, use) => use(new CheckoutPage(page)),
  paymentPage:        ({ page }, use) => use(new PaymentPage(page)),
  orderPlacedPage:    ({ page }, use) => use(new OrderPlacedPage(page)),

  // ── Component fixtures ───────────────────────────────────────────────────
  header:           ({ page }, use) => use(new Header(page)),
  footer:           ({ page }, use) => use(new Footer(page)),
  categorySidebar:  ({ page }, use) => use(new CategorySidebar(page)),
  brandSidebar:     ({ page }, use) => use(new BrandSidebar(page)),
  cartModal:        ({ page }, use) => use(new CartModal(page)),
  recommendedItems: ({ page }, use) => use(new RecommendedItems(page)),
  subscriptionForm: ({ page }, use) => use(new SubscriptionForm(page)),

  // ── API client fixture ───────────────────────────────────────────────────
  api: ({ request }, use) =>
    use(new AutomationExerciseApiClient(request)),

  // ── freshUser ────────────────────────────────────────────────────────────
  freshUser: [async ({ api }, use) => {
    const user = createUser();
    await api.createAccount(user);
    await use(user);
    await api.deleteAccount(user.email, user.password);
  }, { scope: 'test' }],

  // ── authedPage ───────────────────────────────────────────────────────────
  authedPage: async ({ page, freshUser, loginPage }, use) => {
    await loginPage.goto();
    await loginPage.loginAs(freshUser.email, freshUser.password);
    // Wait for the post-login redirect to settle before yielding to the test
    await page.waitForURL(url => !url.href.includes('/login'), { timeout: 15000 });
    await use(page);
  },

});
