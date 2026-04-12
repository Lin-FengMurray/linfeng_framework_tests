// edge
import { test, expect } from '../../../../fixtures/index.js';

test('get user with unknown email returns 404', async ({ api }) => {
  const { body } = await api.getUserByEmail('nobody_notexist_99999@example.com');
  expect(body.responseCode).toBe(404);
  expect(body.message).toContain('Account not found');
});