import { test, expect } from '../../../../fixtures/index.js';

test('user email in response matches registered email', async ({ api, freshUser }) => {
  const { body } = await api.getUserByEmail(freshUser.email);
  expect(body.responseCode).toBe(200);
  expect(body.user.email).toBe(freshUser.email);
});