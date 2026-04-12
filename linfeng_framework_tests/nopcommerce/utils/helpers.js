export function generateRandomEmail(prefix = 'linfeng') {
  const timestamp = Date.now();
  return `${prefix}_${timestamp}@example.com`;
}

export function generateRandomString(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let index = 0; index < length; index += 1) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}

export function getCurrentTimestamp() {
  return Date.now();
}