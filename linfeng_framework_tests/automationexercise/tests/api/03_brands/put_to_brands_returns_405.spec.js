// API04
import { test, expect } from '../../../fixtures/index.js';

test('PUT to brands list returns 405', async ({ api }) => {
  const { body } = await api.putToBrands();
  expect(body.responseCode).toBe(405);
  expect(body.message).toBe('This request method is not supported.');
});