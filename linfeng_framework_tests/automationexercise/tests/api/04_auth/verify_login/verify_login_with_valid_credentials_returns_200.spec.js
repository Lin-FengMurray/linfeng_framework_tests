// API07
import { test, expect } from '../../../../fixtures/index.js';

test('verify login with valid credentials returns 200', async ({ api, freshUser }) => {
  const { body } = await api.verifyLogin(freshUser.email, freshUser.password);
  expect(body.responseCode).toBe(200);
  expect(body.message).toBe('User exists!');
});