import { test, expect } from '../../../fixtures/index.js';

test('get user with missing email param returns 400', async ({ api }) => {
  const { body } = await api.getUserWithoutEmail();
  expect(body.responseCode).toBe(400);
  expect(typeof body.message).toBe('string');
});