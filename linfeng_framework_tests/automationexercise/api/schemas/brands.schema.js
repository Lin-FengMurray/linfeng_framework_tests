// api/schemas/brands.schema.js

export function assertBrandShape(brand) {
  if (typeof brand.id !== 'number')     throw new Error(`brand.id should be number, got ${typeof brand.id}`);
  if (typeof brand.brand !== 'string')  throw new Error(`brand.brand should be string`);
}