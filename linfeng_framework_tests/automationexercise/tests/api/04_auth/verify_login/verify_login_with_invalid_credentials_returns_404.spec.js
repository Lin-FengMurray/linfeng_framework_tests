// API10
import { test, expect } from '../../../../fixtures/index.js';

test('verify login with invalid credentials returns 404', async ({ api }) => {
  const { body } = await api.verifyLogin('nobody_${Date.now()}@example.com', 'wrongpassword');
  expect(body.responseCode).toBe(404);
  expect(body.message).toBe('User not found!');
});