import { test, expect } from '../../../../fixtures/index.js';

test('400 response contains responseCode and message', async ({ api }) => {
  const { body } = await api.searchProductMissingParam();
  expect(body.responseCode).toBe(400);
  expect(typeof body.message).toBe('string');
  expect(body.message.length).toBeGreaterThan(0);
});