// API14
import { test, expect } from '../../../../fixtures/index.js';

test('get user detail by email returns full profile', async ({ api, freshUser }) => {
  const { body } = await api.getUserByEmail(freshUser.email);
  expect(body.responseCode).toBe(200);
  expect(body.user).toBeDefined();
  expect(body.user.email).toBe(freshUser.email);
  expect(body.user.name).toBe(freshUser.name);
});