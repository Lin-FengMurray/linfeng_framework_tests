import { test, expect } from '../../../../fixtures/index.js';

test('405 response contains responseCode and message', async ({ api }) => {
  const { body } = await api.postToProducts();
  expect(body.responseCode).toBe(405);
  expect(typeof body.message).toBe('string');
  expect(body.message.length).toBeGreaterThan(0);
});