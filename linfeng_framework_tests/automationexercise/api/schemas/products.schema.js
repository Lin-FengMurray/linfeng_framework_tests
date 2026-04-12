// api/schemas/products.schema.js

export function assertProductShape(product) {
  if (typeof product.id !== 'number')        throw new Error(`product.id should be number, got ${typeof product.id}`);
  if (typeof product.name !== 'string')      throw new Error(`product.name should be string`);
  if (typeof product.price !== 'string')     throw new Error(`product.price should be string`);
  if (typeof product.brand !== 'string')     throw new Error(`product.brand should be string`);
  if (typeof product.category !== 'object')  throw new Error(`product.category should be object`);
}