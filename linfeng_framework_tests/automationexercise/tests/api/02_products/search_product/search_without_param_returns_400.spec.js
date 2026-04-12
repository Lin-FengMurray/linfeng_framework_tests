// API06
import { test, expect } from '../../../../fixtures/index.js';

test('search without param returns 400', async ({ api }) => {
  const { body } = await api.searchProductMissingParam();
  expect(body.responseCode).toBe(400);
  expect(body.message).toContain('search_product parameter is missing');
});