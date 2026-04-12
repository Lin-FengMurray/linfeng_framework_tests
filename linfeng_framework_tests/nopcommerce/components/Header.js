import { expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';

export class Header extends BasePage {
  constructor(page) {
    super(page);

    this.logoLink = page.locator('.header-logo a');
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator('button.search-box-button');

    this.registerLink = page.locator('.header-links a.ico-register');
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    this.accountLink = page.getByRole('link', { name: 'My account' });

    this.wishlistLink = page.locator('.wishlist-label');
    this.cartLink = page.locator('.cart-label');

    this.wishlistQuantity = page.locator('.wishlist-qty');
    this.cartQuantity = page.locator('.cart-qty');

    this.topMenuLinks = page.getByRole('menu', { name: 'Categories' }).locator('.menu__link');

  }

  async clickLogo() {
    await this.click(this.logoLink);
  }

  async searchFor(keyword) {
    await this.fill(this.searchInput, keyword);
    await this.pressEnter(this.searchInput);
  }

  async goToRegister() {
    await this.click(this.registerLink);
  }

  async goToLogin() {
    await this.click(this.loginLink);
  }

  async goToAccount() {
    await this.click(this.accountLink);
  }

  async logout() {
    await this.click(this.logoutLink);
  }

  async goToWishlist() {
    await this.click(this.wishlistLink);
  }

  async goToCart() {
    await this.click(this.cartLink);
  }

  async getWishlistQuantityText() {
    return await this.getText(this.wishlistQuantity);
  }

  async getCartQuantityText() {
    return await this.getText(this.cartQuantity);
  }

  async openTopMenuCategory(categoryName) {
    const menuLink = page
      .getByRole('menu', { name: 'Categories' })
      .locator('.menu__link')
      .getByText(categoryName, { exact: true })
      .first();
    await menuLink.waitFor({ state: 'visible' });
    await menuLink.click();
  }
  
  async getTopMenuItemsText() {
    return await this.topMenuLinks.allTextContents();
  }

  async isLoginVisible() {
    return await this.isVisible(this.loginLink);
  }

  async isLogoutVisible() {
    return await this.isVisible(this.logoutLink);
  }
}