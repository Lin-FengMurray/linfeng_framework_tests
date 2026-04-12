// components/CategorySidebar.js

export class CategorySidebar {
  constructor(page) {
    this.page = page;
    this.root            = page.locator('.left-sidebar');
    this.categoryHeading = page.locator('.title.text-center b');
  }

  async clickCategory(name) {
    // Expand accordion panel via JS (no click = no ad-vignette trigger)
    await this.page.evaluate(n => {
      const toggle = [...document.querySelectorAll('.left-sidebar a')]
        .find(a => a.textContent.trim() === n && (a.getAttribute('href') ?? '').startsWith('#'));
      if (!toggle) return;
      const panel = document.querySelector(toggle.getAttribute('href'));
      if (panel) {
        panel.style.display = 'block';
        panel.style.height = 'auto';
        panel.classList.add('in');
      }
    }, name);
  }

  async clickSubcategory(_category, subcategory) {
    // Links are in the DOM even when the accordion is collapsed — find and navigate directly
    const href = await this.page.evaluate(sub => {
      const el = [...document.querySelectorAll('.left-sidebar a')]
        .find(a => a.textContent.trim() === sub && !(a.getAttribute('href') ?? '').startsWith('#'));
      return el ? el.getAttribute('href') : null;
    }, subcategory);
    if (href) await this.page.goto(href);
  }
}
