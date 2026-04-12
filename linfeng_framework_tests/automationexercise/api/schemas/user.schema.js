// api/schemas/user.schema.js

export function assertUserDetailShape(user) {
  const requiredStrings = [
    'name', 'email', 'title',
    'birth_day', 'birth_month', 'birth_year',
    'first_name', 'last_name',
    'address1', 'country', 'state', 'city', 'zipcode',
  ];
  for (const field of requiredStrings) {
    if (typeof user[field] !== 'string') {
      throw new Error(`user.${field} should be string, got ${typeof user[field]}`);
    }
  }
  if (typeof user.id !== 'number') throw new Error(`user.id should be number`);
}