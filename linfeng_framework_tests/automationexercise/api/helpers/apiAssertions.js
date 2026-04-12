// api/helpers/apiAssertions.js
// Shared assertion helpers for API response envelopes.

import { expect } from '../../fixtures/index.js';

export function assertResponseEnvelope(body, expectedCode) {
  expect(typeof body.responseCode).toBe('number');
  expect(typeof body.message).toBe('string');
  if (expectedCode !== undefined) {
    expect(body.responseCode).toBe(expectedCode);
  }
}