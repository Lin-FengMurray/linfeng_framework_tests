import { test, expect } from '../../../fixtures/index.js';

test('products API returns 200', async ({ api }) => {
  const { body } = await api.getProducts();
  expect(body.responseCode).toBe(200);
});