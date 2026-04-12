import { test, expect } from '../../../../fixtures/index.js';

test('brand IDs are unique across the list', async ({ api }) => {
  const { body } = await api.getBrands();
  const ids = body.brands.map(b => b.id);
  const uniqueIds = new Set(ids);
  expect(uniqueIds.size).toBe(ids.length);
});