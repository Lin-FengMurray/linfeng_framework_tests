# Hacker News & YC Jobs — Playwright Test Framework

A production-ready end-to-end test suite for Hacker News and YC Jobs, built with Playwright Test Runner and the Page Object Model (POM) design pattern.

---

## Requirements

- Node.js v18+
- npm

```bash
npm install
npx playwright install
```

---

## How to Run

**Primary assignment — algorithmic sorting validation script:**
```bash
node index.js
```

**Full test suite:**
```bash
npx playwright test
```

**Specific section:**
```bash
npx playwright test tests/01_takehome_task_sorted_articles/
npx playwright test tests/10_search/
```

**View HTML report after a run:**
```bash
npx playwright show-report
```

---

## Folder Structure

```
hackernews/
├── pages/
│   ├── HackerNewsPage.js
│   └── HackerNewsSearchPage.js
└── tests/
    ├── 01_takehome_task_sorted_articles/
    │   └── 100_articles_sorted_newest_to_oldest.spec.js
    ├── 02_homepage/
    │   ├── header/
    │   │   └── header_navigation_links_visible.spec.js
    │   ├── content/
    │   │   ├── first_post_displays_with_rank_and_link.spec.js
    │   │   └── rank_numbers_increase_sequentially.spec.js
    │   └── navigation/
    │       └── post_and_comments_links_navigate_correctly.spec.js
    ├── 03_pagination/
    │   ├── more_link_loads_next_page.spec.js
    │   └── page_rank_increases_on_more_click.spec.js
    ├── 04_past_page/
    │   ├── back_navigation/
    │   │   ├── go_back_a_day.spec.js
    │   │   ├── go_back_a_month.spec.js
    │   │   └── go_back_a_year.spec.js
    │   └── forward_navigation/
    │       ├── go_forward_a_day.spec.js
    │       ├── go_forward_a_month.spec.js
    │       └── go_forward_a_year.spec.js
    ├── 05_comments_page/
    │   ├── functionality/
    │   │   ├── page_displays_comments.spec.js
    │   │   └── comments_sorted_by_most_recent.spec.js
    │   └── navigation/
    │       ├── more_button_loads_next_page.spec.js
    │       └── author_name_navigates_to_profile.spec.js
    ├── 06_ask_page/
    │   ├── functionality/
    │   │   ├── stories_render_correctly.spec.js
    │   │   ├── ranks_increase_sequentially.spec.js
    │   │   └── scores_formatted_correctly.spec.js
    │   └── navigation/
    │       ├── author_click_navigates_to_profile.spec.js
    │       └── comments_link_opens_discussion.spec.js
    ├── 07_show_page/
    │   ├── functionality/
    │   │   ├── stories_render_correctly.spec.js
    │   │   ├── ranks_increase_sequentially.spec.js
    │   │   └── scores_formatted_correctly.spec.js
    │   └── navigation/
    │       ├── rules_tips_and_newest_links_redirect_correctly.spec.js
    │       ├── article_title_redirects_outside_hn.spec.js
    │       ├── comments_link_navigates_to_discussion.spec.js
    │       └── more_button_loads_next_page.spec.js
    ├── 08_jobs_page/
    │   ├── hn_jobs/
    │   │   ├── hn_jobs_page_loads_and_yc_link_navigates.spec.js
    │   │   ├── yc_jobs_page_loads_core_elements.spec.js
    │   │   └── first_job_listing_works_correctly.spec.js
    │   └── yc_jobs/
    │       ├── role_filters_update_listings.spec.js
    │       ├── video_carousel_loads.spec.js
    │       └── footer_social_media_links_valid.spec.js
    ├── 09_footer/
    │   └── footer_links_valid.spec.js
    ├── 10_search/
    │   ├── search_redirects_to_algolia.spec.js
    │   ├── search_updates_url_query_params.spec.js
    │   ├── search_triggers_network_request.spec.js
    │   ├── search_results_load_within_threshold.spec.js
    │   ├── sorting_updates_url_and_results.spec.js
    │   ├── search_returns_no_results_for_nonsense_query.spec.js
    │   └── search_input_type_attribute_is_search.spec.js
    └── 11_authentication/
        ├── form_auth/
        │   ├── valid_login_and_logout.spec.js
        │   └── invalid_login_attempts.spec.js
        └── basic_auth/
            ├── valid_login.spec.js
            ├── invalid_password_login.spec.js
            ├── invalid_username_login.spec.js
            └── cancel_login.spec.js
```

---

## Design Conventions

- **One test per file** — each `.spec.js` contains one `test.describe` block with one `test()`. The filename is the description.
- **Self-contained tests** — each test handles its own navigation inline. No shared `beforeEach` state between files.
- **Page Objects in `pages/`** — locators and reusable actions are kept separate from assertions.

---

> See [CASE_STUDY.md](./CASE_STUDY.md) for architecture decisions, test strategy, and trade-off rationale.
