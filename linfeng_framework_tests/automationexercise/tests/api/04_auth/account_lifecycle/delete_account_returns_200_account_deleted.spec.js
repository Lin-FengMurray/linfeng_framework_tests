// API12
import { test, expect } from '../../../../fixtures/index.js';
import { createUser } from '../../../../utils/testDataFactory.js';

test('delete account returns 200 account deleted', async ({ api }) => {
  const user = createUser();
  await api.createAccount(user);

  const { body } = await api.deleteAccount(user.email, user.password);
  expect(body.responseCode).toBe(200);
  expect(body.message).toBe('Account deleted!');
});