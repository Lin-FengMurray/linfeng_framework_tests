// utils/testDataFactory.js
// Generates a unique isolated user per test run.
// Never hardcode emails — always call createUser() to avoid subscription/account collisions.

import { randomUUID } from 'crypto';

export function createUser() {
  const id = randomUUID().replace(/-/g, '').slice(0, 10);
  return {
    name:         `Test User ${id}`,
    email:        `test_${id}@example.com`,
    password:     'Test@1234!',
    title:        'Mr',
    firstName:    'Test',
    lastName:     `User${id}`,
    company:      'QA Wolf',
    address1:     '123 Test Street',
    address2:     'Suite 100',
    country:      'United States',
    state:        'MI',
    city:         'Ann Arbor',
    zipcode:      '90001',
    mobileNumber: '5551234567',
    birthDay:     '1',
    birthMonth:   '1',
    birthYear:    '1990',
  };
}
