# Hacker News Articles Sort Validator

This project contains a Node.js script using [Playwright](https://playwright.dev/) to validate that the **first 100 articles** on Hacker News “Newest” page are sorted from **newest to oldest**. It leverages a **Page Object Model (POM)** for maintainable and reusable page interactions.  

---

## 1. Test Environment

- **Node.js**: >= 18.x  
- **Playwright**: >= 1.40.x  
- **Browser**: Chromium (via Playwright)  
- **Operating System**: Cross-platform (Windows, macOS, Linux)  
- **POM**: `pages/HackerNewsPage.js`  
- **Script**: `index.js` (ES module syntax)  
- **ES Module**: {"type": "module"} in package.json
- **Execution**: Node.js (`node index.js`)  

---

## 2. Test Strategy

- **Goal**: Verified that the first 100 articles on Hacker News “Newest” page were ordered **newest to oldest**.  
- **Approach**:  
  1. Launched Chromium browser in visible or headless mode.  
  2. Navigated to `https://news.ycombinator.com/newest`.  
  3. Scraped timestamps of articles using locators defined in the POM.  
  4. Paginated using the “More” button until 100 timestamps were collected.  
  5. Verified sequential order by comparing each timestamp with the next.  
- **Assertions**: Script threw an error if any article was older than its predecessor.  

---

## 3. Test Coverage

- **Scope**:  
  - First 100 articles on Hacker News “Newest” page.  
  - Validated **timestamp order** (newest → oldest).  
- **Not covered**:  
  - Comment counts, points, or author information.  
  - Search functionality, story content, or links.  
  - Mobile layout or other browsers besides Chromium (can be added).  

---

## 4. Page Object Model Design

- **File**: `pages/HackerNewsPage.js`  
- **Responsibilities**:  
  - Encapsulated locators (`.athing`, `.age a`, `.rank`, `More` button).  
  - Provided helper methods for interactions:  
    - `navigate()`: Load Hacker News “Newest” page.  
    - `getTopTimestamps(limit)`: Scrape article timestamps up to the specified limit.  
    - `getFirstRankNumber()`: Retrieve numeric rank of first article.  
    - `clickMore()`: Click the “More” button and wait for content update.  
- **Benefits**:  
  - Reusable across multiple scripts or tests.  
  - Kept scraping logic separate from test/assertion logic.  

---

## 5. Error Handling & Reporting

- **try/catch/finally** used in `index.js` to:  
  - Catch navigation, scraping, or verification errors.  
  - Log detailed error messages to the console.  
  - Ensure browser closes even when errors occur.  
- **Error messages** included:  
  - Row index of failed timestamp order.  
  - Exact timestamps causing the failure.  
- **Console logs** tracked:  
  - Navigation progress  
  - Pagination and number of timestamps collected  
  - Verification progress and final success message  

---

## 6. Known Limitations

- Script currently only validates **first 100 articles**; does not dynamically adjust for more or fewer articles unless modified.
- Uses **Chromium only**; Firefox and WebKit not tested.  
- Timestamps rely on Hacker News server time and HTML `title` attributes; changes in HTML structure may break scraping.  
- Headless mode may cause slight timing differences; script waits for elements to be visible before scraping.  

---

## 7. How Tests Were Run

### 7.1 Installing dependencies
Running the following command to install Node modules, including Playwright:

```bash
npm i



7.3 Running the script
Execute the Node.js script with:
node index.js

7.3 Verifying output
The console displayed:
Navigation progress to Hacker News “Newest” page
Number of timestamps collected
Verification status (success or error)
If order check failed, the script would throw an error with:
Row number of failure
The timestamps causing the failure
The browser will close automatically at the end of execution.