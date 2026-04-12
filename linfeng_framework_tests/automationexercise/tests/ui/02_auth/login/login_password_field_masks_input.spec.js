// edge — Password field has type="password" so input is masked
import { test, expect } from '../../../../fixtures/index.js';

test('login password field masks input', async ({ loginPage }) => {
  await loginPage.goto();

  await expect(loginPage.loginPassword).toHaveAttribute('type', 'password');
});
