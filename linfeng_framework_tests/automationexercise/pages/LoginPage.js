// pages/LoginPage.js

import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginEmail    = page.locator('[data-qa="login-email"]');
    this.loginPassword = page.locator('[data-qa="login-password"]');
    this.loginButton   = page.locator('[data-qa="login-button"]');
    this.loginError    = page.locator('p:has-text("Your email or password is incorrect!")');
    this.signupName    = page.locator('[data-qa="signup-name"]');
    this.signupEmail   = page.locator('[data-qa="signup-email"]');
    this.signupButton  = page.locator('[data-qa="signup-button"]');
    this.signupError   = page.locator('p:has-text("Email Address already exist!")');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async loginAs(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }
}
