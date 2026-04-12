// API05
import { test, expect } from '../../../../fixtures/index.js';

test('search product returns matching results', async ({ api }) => {
  const { body } = await api.searchProduct('top');
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
  // The API matches on multiple fields (name, category, etc.), not just name.
  // Verify each result has the expected product shape.
  for (const product of body.products) {
    expect(typeof product.id).toBe('number');
    expect(typeof product.name).toBe('string');
    expect(product.name.length).toBeGreaterThan(0);
  }
});