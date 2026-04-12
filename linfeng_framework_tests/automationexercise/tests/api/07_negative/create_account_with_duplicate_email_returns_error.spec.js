import { test, expect } from '../../../fixtures/index.js';

test('create account with duplicate email returns error', async ({ api, freshUser }) => {
  // freshUser already exists — try to create again with same email
  const { body } = await api.createAccount(freshUser);
  expect(body.responseCode).toBe(400);
  expect(body.message).toContain('Email already exist');
});