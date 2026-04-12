// API01
import { test, expect } from '../../../../fixtures/index.js';

test('get all products returns full list', async ({ api }) => {
  const { body } = await api.getProducts();
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
});