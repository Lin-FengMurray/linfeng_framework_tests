// API02
import { test, expect } from '../../../../fixtures/index.js';

test('POST to products list returns 405', async ({ api }) => {
  const { body } = await api.postToProducts();
  expect(body.responseCode).toBe(405);
  expect(body.message).toBe('This request method is not supported.');
});