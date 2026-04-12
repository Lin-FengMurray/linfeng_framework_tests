import { test, expect } from '../../../fixtures/index.js';

test('brands API returns 200', async ({ api }) => {
  const { body } = await api.getBrands();
  expect(body.responseCode).toBe(200);
});