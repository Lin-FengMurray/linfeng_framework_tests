// API13
import { test, expect } from '../../../../fixtures/index.js';
import { createUser } from '../../../../utils/testDataFactory.js';

test('update account returns 200 user updated', async ({ api }) => {
  const user = createUser();
  await api.createAccount(user);

  const updated = { ...user, name: 'Updated Name', city: 'San Francisco' };
  const { body } = await api.updateAccount(updated);
  expect(body.responseCode).toBe(200);
  expect(body.message).toBe('User updated!');

  await api.deleteAccount(user.email, user.password);
});