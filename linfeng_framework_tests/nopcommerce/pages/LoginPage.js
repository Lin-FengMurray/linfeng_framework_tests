import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.pageHeading = page.locator('.page-title h1');

    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('button.login-button');
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });

    this.emailError = page.locator('[data-valmsg-for="Email"]');
    this.validationSummary = page.locator('.message-error');

    this.recoveryEmailInput = page.locator('#Email');
    this.recoverButton = page.getByRole('button', { name: 'Recover' });
    this.resultMessage = page.locator('.result');
  }

  async open() {
    await this.navigate('https://demo.nopcommerce.com/login?returnUrl=%2F');
    await this.waitForPageLoad();
  }

  async login(user) {
    if (user?.email) {
      await this.fill(this.emailInput, user.email);
    }

    if (user?.password) {
      await this.fill(this.passwordInput, user.password);
    }

    await this.click(this.loginButton);
  }
}