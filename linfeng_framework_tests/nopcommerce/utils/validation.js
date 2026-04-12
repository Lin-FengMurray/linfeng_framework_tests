export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isArrayWithItems(value) {
  return Array.isArray(value) && value.length > 0;
}
