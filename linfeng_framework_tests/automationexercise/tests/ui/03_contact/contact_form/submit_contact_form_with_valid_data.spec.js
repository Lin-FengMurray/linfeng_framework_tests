// TC06 — Submit contact form with valid data
import { test, expect } from '../../../../fixtures/index.js';

test('submit contact form with valid data @TC06', async ({ contactUsPage, page }) => {
  await contactUsPage.goto();
  await contactUsPage.fillForm({
    name:    'Test User',
    email:   'test@example.com',
    subject: 'Test Enquiry',
    message: 'This is an automated test message.',
  });

  page.on('dialog', dialog => dialog.accept());
  await contactUsPage.submit();

  await expect(contactUsPage.successMessage).toContainText('Success! Your details have been submitted successfully.');
});
