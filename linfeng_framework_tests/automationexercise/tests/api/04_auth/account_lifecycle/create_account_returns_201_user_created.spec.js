// API11
import { test, expect } from '../../../../fixtures/index.js';
import { createUser } from '../../../../utils/testDataFactory.js';

test('create account returns 201 user created', async ({ api }) => {
  const user = createUser();
  const { body } = await api.createAccount(user);
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe('User created!');
  await api.deleteAccount(user.email, user.password);
});