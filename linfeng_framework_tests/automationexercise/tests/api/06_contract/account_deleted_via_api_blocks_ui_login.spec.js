import { test, expect } from '../../../fixtures/index.js';
import { createUser } from '../../../utils/testDataFactory.js';

test('account deleted via API blocks UI login', async ({ api, loginPage }) => {
  const user = createUser();
  await api.createAccount(user);
  await api.deleteAccount(user.email, user.password);

  await loginPage.goto();
  await loginPage.loginAs(user.email, user.password);
  await expect(loginPage.loginError).toBeVisible();
});