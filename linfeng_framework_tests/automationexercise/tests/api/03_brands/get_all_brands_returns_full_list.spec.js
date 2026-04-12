// API03
import { test, expect } from '../../../fixtures/index.js';

test('get all brands returns full list', async ({ api }) => {
  const { body } = await api.getBrands();
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.brands)).toBe(true);
  expect(body.brands.length).toBeGreaterThan(0);
});