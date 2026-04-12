import { BasePage } from '../pages/BasePage.js';

export class Footer extends BasePage {
  constructor(page) {
    super(page);

    this.footerSection = page.locator('.footer');

    this.sitemapLink = page.getByRole('link', { name: 'Sitemap' });
    this.shippingReturnsLink = page.getByRole('link', { name: 'Shipping & returns' });
    this.privacyNoticeLink = page.getByRole('link', { name: 'Privacy notice' });
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });

    this.newsLink = page.getByRole('link', { name: 'News' });
    this.blogLink = page.getByRole('link', { name: 'Blog' });

    this.newsletterInput = page.locator('#newsletter-email');
    this.newsletterButton = page.locator('#newsletter-subscribe-button');
    this.newsletterResult = page.locator('#newsletter-result-block');

    this.copyrightText = page.locator('.footer-powered-by, .footer-disclaimer, .footer-lower');
  }

  async goToSitemap() {
    await this.click(this.sitemapLink);
  }

  async goToContactUs() {
    await this.click(this.contactUsLink);
  }

  async goToNews() {
    await this.click(this.newsLink);
  }

  async goToBlog() {
    await this.click(this.blogLink);
  }

  async subscribeToNewsletter(email) {
    await this.fill(this.newsletterInput, email);
    await this.click(this.newsletterButton);
  }

  async getNewsletterResultText() {
    return await this.getText(this.newsletterResult);
  }

  async isFooterVisible() {
  return await super.isVisible(this.footerSection);
}
}
