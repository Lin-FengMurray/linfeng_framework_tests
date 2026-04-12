import { test, expect } from '../../../../fixtures/index.js';
import { assertUserDetailShape } from '../../../../api/schemas/user.schema.js';

test('user detail response matches expected schema', async ({ api, freshUser }) => {
  const { body } = await api.getUserByEmail(freshUser.email);
  expect(body.responseCode).toBe(200);
  expect(body.user).toBeDefined();
  assertUserDetailShape(body.user);
});