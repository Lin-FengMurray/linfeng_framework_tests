import { BasePage } from './BasePage.js';
import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.header = new Header(page);
    this.footer = new Footer(page);

    this.pageTitle = page.locator('.page.home-page');
    this.welcomeTitle = page.locator('.topic-block-title h2');
    this.featuredProductsTitle = page.locator('.product-grid.home-page-product-grid .title strong');
    this.featuredProductItems = page.locator('.product-grid.home-page-product-grid .item-box');
    this.newsSectionTitle = page.locator('.news-list-homepage .title strong');
  }

  async open() {
    await this.page.goto('https://demo.nopcommerce.com/');
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectCategory(categoryName) {
    const path = categoryName.toLowerCase().replace(/ /g, '-');
    await this.page.goto(`https://demo.nopcommerce.com/${path}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getWelcomeTitleText() {
    return await this.getText(this.welcomeTitle);
  }

  async getFeaturedProductsTitleText() {
    return await this.getText(this.featuredProductsTitle);
  }

  async getFeaturedProductsCount() {
    return await this.featuredProductItems.count();
  }

  async clickFeaturedProductByIndex(index = 0) {
    await this.featuredProductItems.nth(index).click();
  }

  async clickFeaturedProductByName(productName) {
    await this.page.getByRole('link', { name: productName, exact: true }).click();
  }

  async isNewsSectionVisible() {
    return await this.isVisible(this.newsSectionTitle);
  }
}