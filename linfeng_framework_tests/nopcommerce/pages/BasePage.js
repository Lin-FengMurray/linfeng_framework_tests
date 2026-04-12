export class BasePage {
  constructor(page) {
    this.page = page;
  }

  // ===== Navigation =====

  async navigate(url) {
    await this.page.goto(url);
  }

  // ✅ navigate + wait combined — use this instead of bare navigate()
  async navigateTo(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForPageLoad(state = 'domcontentloaded') {
    await this.page.waitForLoadState(state);
  }

  async waitForUrlContains(value) {
    await this.page.waitForURL(`**/*${value}*`);
  }

  async getTitle() {
    return await this.page.title();
  }

  // ===== Cloudflare Detection =====

  // ✅ Call after any page load to check if Cloudflare intercepted
  async isCloudflarePage() {
    const title = await this.page.title();
    return title.includes('Just a moment') || title.includes('Access denied');
  }

  // ✅ Attach network listener to detect 403/503 blocks — use for debugging
  enableCloudflareLogging() {
    this.page.on('response', response => {
      if (response.status() === 403 || response.status() === 503) {
        console.warn(`🚨 Cloudflare block: ${response.status()} ${response.url()}`);
      }
    });
  }

  // ===== Element Interaction =====

  async click(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fill(locator, text) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  async type(locator, text) {
    await locator.waitFor({ state: 'visible' });
    await locator.type(text);
  }

  async pressEnter(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.press('Enter');
  }

  async check(locator) {
    await locator.waitFor({ state: 'visible' });
    if (!(await locator.isChecked())) {
      await locator.check();
    }
  }

  async uncheck(locator) {
    await locator.waitFor({ state: 'visible' });
    if (await locator.isChecked()) {
      await locator.uncheck();
    }
  }

  async selectDropdownByText(locator, text) {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption({ label: text });
  }

  async selectDropdownByValue(locator, value) {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }

  // ===== Element State =====

  async getText(locator) {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent())?.trim();
  }

  async isVisible(locator) {
    return await locator.isVisible();
  }

  // ✅ Safer isVisible — catches errors for elements that may not exist at all
  async isVisibleSafe(locator) {
    return await locator.isVisible().catch(() => false);
  }

  // ✅ Explicit wait for element — use before assertions to eliminate race conditions
  async waitForVisible(locator, timeout = 10000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  // ===== Utilities =====

  async takeScreenshot(name = 'screenshot') {
    await this.page.screenshot({
      path: `test-results/${name}.png`,
      fullPage: true
    });
  }
  
}