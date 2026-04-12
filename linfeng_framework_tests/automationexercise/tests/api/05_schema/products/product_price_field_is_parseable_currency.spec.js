import { test, expect } from '../../../../fixtures/index.js';

test('product price field is parseable currency', async ({ api }) => {
  const { body } = await api.getProducts();
  for (const product of body.products) {
    expect(typeof product.price).toBe('string');
    // price format: "Rs. 500" — strip label and parse
    const numeric = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    expect(isNaN(numeric)).toBe(false);
    expect(numeric).toBeGreaterThan(0);
  }
});