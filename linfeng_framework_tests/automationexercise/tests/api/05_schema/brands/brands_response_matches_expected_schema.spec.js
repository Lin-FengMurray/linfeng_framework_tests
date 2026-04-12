import { test, expect } from '../../../../fixtures/index.js';
import { assertBrandShape } from '../../../../api/schemas/brands.schema.js';

test('brands response matches expected schema', async ({ api }) => {
  const { body } = await api.getBrands();
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.brands)).toBe(true);
  for (const brand of body.brands) {
    assertBrandShape(brand);
  }
});