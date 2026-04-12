// utils/apiAssertions.js

import { expect } from '../fixtures/index.js';

/**
 * Assert a standard success API response.
 * @param {{ status: number, body: { responseCode: number, message: string } }} response
 * @param {number} expectedCode  - expected body.responseCode
 * @param {string} expectedMessage - expected body.message
 */
export function assertSuccessResponse({ status, body }, expectedCode, expectedMessage) {
  expect(status).toBe(200);
  expect(body.responseCode).toBe(expectedCode);
  expect(body.message).toBe(expectedMessage);
}
