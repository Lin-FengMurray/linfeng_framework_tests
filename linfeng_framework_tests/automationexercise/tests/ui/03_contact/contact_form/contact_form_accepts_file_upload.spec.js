// edge — Contact form accepts a file upload
import { test, expect } from '../../../../fixtures/index.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadFile = path.resolve(__dirname, '../../../../test-data/upload-sample.txt');

test('contact form accepts file upload', async ({ contactUsPage, page }) => {
  await contactUsPage.goto();

  await contactUsPage.fillForm({
    name:    'Upload Tester',
    email:   'upload@example.com',
    subject: 'File Upload Test',
    message: 'Testing file attachment.',
  });

  await page.locator('input[name="upload_file"]').setInputFiles(uploadFile);
  page.on('dialog', dialog => dialog.accept());
  await contactUsPage.submit();
  await expect(contactUsPage.successMessage).toContainText('Success! Your details have been submitted successfully.');
});
