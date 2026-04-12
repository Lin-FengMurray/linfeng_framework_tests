import { BasePage } from './BasePage.js';

export class RegisterPage extends BasePage {
  constructor(page) {
    super(page);

    // ===== Page Elements =====
    this.pageHeading = page.locator('.page.registration-page .page-title h1');
    this.registrationResult = page.locator('.result');

    this.genderFemaleRadio = page.locator('#gender-female');

    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');

    this.registerButton = page.locator('#register-button');

    // ===== Validation Errors =====
    this.firstNameError = page.locator('#FirstName-error');
    this.lastNameError = page.locator('#LastName-error');
    this.emailError = page.locator('#Email-error');
    this.passwordError = page.locator('#Password-error');
    this.confirmPasswordError = page.locator('#ConfirmPassword-error');
  }

  // ===== Navigation =====

  async open() {
    await this.navigate('https://demo.nopcommerce.com/register');
    await this.waitForPageLoad();
  }

  // ===== Actions =====

  async registerUser(user) {
    // gender (default to female)
    await this.click(this.genderFemaleRadio);

    if (user.firstName) await this.fill(this.firstNameInput, user.firstName);
    if (user.lastName) await this.fill(this.lastNameInput, user.lastName);
    if (user.email) await this.fill(this.emailInput, user.email);
    if (user.password) await this.fill(this.passwordInput, user.password);
    if (user.confirmPassword) await this.fill(this.confirmPasswordInput, user.confirmPassword);

    await this.click(this.registerButton);
  }
}