// pages/SignupPage.js

import { BasePage } from './BasePage.js';

export class SignupPage extends BasePage {
  constructor(page) {
    super(page);
    this.titleMr        = page.locator('#id_gender1');
    this.titleMrs       = page.locator('#id_gender2');
    this.nameField      = page.locator('[data-qa="name"]');
    this.passwordField  = page.locator('[data-qa="password"]');
    this.daySelect      = page.locator('[data-qa="days"]');
    this.monthSelect    = page.locator('[data-qa="months"]');
    this.yearSelect     = page.locator('[data-qa="years"]');
    this.firstNameField = page.locator('[data-qa="first_name"]');
    this.lastNameField  = page.locator('[data-qa="last_name"]');
    this.companyField   = page.locator('[data-qa="company"]');
    this.address1Field  = page.locator('[data-qa="address"]');
    this.address2Field  = page.locator('[data-qa="address2"]');
    this.countrySelect  = page.locator('[data-qa="country"]');
    this.stateField     = page.locator('[data-qa="state"]');
    this.cityField      = page.locator('[data-qa="city"]');
    this.zipcodeField   = page.locator('[data-qa="zipcode"]');
    this.mobileField    = page.locator('[data-qa="mobile_number"]');
    this.createBtn      = page.locator('[data-qa="create-account"]');
  }

  async fillForm(user) {
    if (user.title === 'Mrs') {
      await this.titleMrs.check();
    } else {
      await this.titleMr.check();
    }
    await this.passwordField.fill(user.password);
    await this.daySelect.selectOption(user.birthDay);
    await this.monthSelect.selectOption(user.birthMonth);
    await this.yearSelect.selectOption(user.birthYear);
    await this.firstNameField.fill(user.firstName);
    await this.lastNameField.fill(user.lastName);
    await this.companyField.fill(user.company);
    await this.address1Field.fill(user.address1);
    await this.address2Field.fill(user.address2);
    await this.countrySelect.selectOption(user.country);
    await this.stateField.fill(user.state);
    await this.cityField.fill(user.city);
    await this.zipcodeField.fill(user.zipcode);
    await this.mobileField.fill(user.mobileNumber);
  }

  async submit() {
    await this.createBtn.click();
  }
}
