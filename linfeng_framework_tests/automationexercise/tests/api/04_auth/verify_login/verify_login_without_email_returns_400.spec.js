// API08
import { test, expect } from '../../../../fixtures/index.js';

test('verify login without email returns 400', async ({ api }) => {
  const { body } = await api.verifyLoginWithoutEmail('anypassword');
  expect(body.responseCode).toBe(400);
  expect(body.message).toContain('email');
});