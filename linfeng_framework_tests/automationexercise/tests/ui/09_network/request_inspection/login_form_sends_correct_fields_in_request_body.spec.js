// advanced — Login form sends the correct fields in the POST request body
import { test, expect } from '../../../../fixtures/index.js';

test('login form sends correct fields in request body', async ({ page, loginPage }) => {
  let capturedBody = '';

  page.on('request', request => {
    if (request.method() === 'POST' && request.url().includes('/login')) {
      capturedBody = request.postData() ?? '';
    }
  });

  await loginPage.goto();
  await loginPage.loginAs('test@example.com', 'password123');

  expect(capturedBody).toContain('email');
  expect(capturedBody).toContain('password');
});
