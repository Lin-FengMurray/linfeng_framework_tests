import { test, expect } from '../../../../fixtures/index.js';
import { assertProductShape } from '../../../../api/schemas/products.schema.js';

test('search results match products schema', async ({ api }) => {
  const { body } = await api.searchProduct('top');
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.products)).toBe(true);
  for (const product of body.products) {
    assertProductShape(product);
  }
});