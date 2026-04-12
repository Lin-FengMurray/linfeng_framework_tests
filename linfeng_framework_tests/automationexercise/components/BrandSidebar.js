// components/BrandSidebar.js

export class BrandSidebar {
  constructor(page) {
    this.page      = page;
    this.root      = page.locator('.brands-name');
    this.brandList = page.locator('.brands-name ul li');
  }

  async clickBrand(name) {
    const href = await this.page.evaluate(n => {
      const el = [...document.querySelectorAll('.brands-name a')]
        .find(a => a.textContent.trim().includes(n));
      return el ? el.getAttribute('href') : null;
    }, name);
    if (href) await this.page.goto(href);
  }

  async getBrandNames() {
    return this.brandList.locator('a').allTextContents();
  }
}
