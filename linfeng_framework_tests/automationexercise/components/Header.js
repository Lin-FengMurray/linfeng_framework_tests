// components/Header.js

export class Header {
  constructor(page) {
    this.page = page;
    this.nav      = page.locator('#header ul.nav.navbar-nav');
    this.logo     = page.locator('#header .logo');
    this.cartLink = page.locator('#header a[href="/view_cart"]');
  }

  async clickLink(label) {
    const href = await this.page.evaluate(lbl => {
      const el = [...document.querySelectorAll('#header ul.nav.navbar-nav a')]
        .find(a => a.textContent.trim() === lbl);
      return el ? el.getAttribute('href') : null;
    }, label);
    if (href) await this.page.goto(href);
  }

  async clickCart() {
    await this.cartLink.click();
  }

  loggedInAs(name) {
    return this.page.locator(`a:has-text("Logged in as ${name}")`);
  }
}
