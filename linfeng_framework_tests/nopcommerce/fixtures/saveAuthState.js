// fixtures/saveAuthState.js

//
// NOTE: This script is not required to run the current test suite.
// All authenticated tests are currently skipped due to Cloudflare
// bot protection on demo.nopcommerce.com.
//
// Use this script when running against:
//   - Local nopCommerce instance (docker run -p 80:80 nopcommerceteam/nopcommerce)
//   - A site without bot protection
//
// Usage: node fixtures/saveAuthState.js

import { chromium } from '@playwright/test';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // ✅ Navigate to login page and WAIT — you log in manually in the browser
  await page.goto('https://demo.nopcommerce.com/login');

  console.log('👤 Please log in manually in the browser window...');
  console.log('⏳ Waiting for you to complete login (60 seconds)...');

  // Wait until URL changes to home page — triggered by YOUR manual login
  await page.waitForURL('https://demo.nopcommerce.com/', { timeout: 60000 });
  console.log('✅ Login detected!');

  // Save the session
  const authStatePath = join(__dirname, 'authState.json');
  await context.storageState({ path: authStatePath });
  console.log('💾 Auth state saved to fixtures/authState.json');
  console.log('🎉 Done!');

  await browser.close();
})();