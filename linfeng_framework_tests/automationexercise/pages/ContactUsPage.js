// pages/ContactUsPage.js

import { BasePage } from './BasePage.js';

export class ContactUsPage extends BasePage {
  constructor(page) {
    super(page);
    this.nameField      = page.locator('[data-qa="name"]');
    this.emailField     = page.locator('[data-qa="email"]');
    this.subjectField   = page.locator('[data-qa="subject"]');
    this.messageField   = page.locator('[data-qa="message"]');
    this.submitBtn      = page.locator('[data-qa="submit-button"]');
    this.successMessage = page.locator('.status.alert.alert-success');
  }

  async goto() {
    await this.page.goto('/contact_us');
  }

  async fillForm({ name, email, subject, message }) {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.subjectField.fill(subject);
    await this.messageField.fill(message);
  }

  async submit() {
    await this.submitBtn.click();
  }
}
