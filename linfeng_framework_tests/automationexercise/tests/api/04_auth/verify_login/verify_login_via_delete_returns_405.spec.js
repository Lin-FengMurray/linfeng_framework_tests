// API09
import { test, expect } from '../../../../fixtures/index.js';

test('verify login via DELETE returns 405', async ({ api }) => {
  const { body } = await api.verifyLoginViaDelete('test@example.com', 'anypassword');
  expect(body.responseCode).toBe(405);
  expect(body.message).toBe('This request method is not supported.');
});