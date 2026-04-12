// edge — Login with an email that has never been registered shows error
import { test, expect } from '../../../../fixtures/index.js';
import { createUser } from '../../../../utils/testDataFactory.js';

test('login shows error for unregistered email', async ({ loginPage }) => {
  const { email, password } = createUser(); // unique email — guaranteed not registered

  await loginPage.goto();
  await loginPage.loginAs(email, password);

  await expect(loginPage.loginError).toBeVisible();
});
