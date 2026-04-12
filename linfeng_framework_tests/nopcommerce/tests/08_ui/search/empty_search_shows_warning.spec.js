import { test } from '@playwright/test';

test.describe('UI Search - Empty Search Shows Warning', () => {

  test('submitting empty search shows minimum length warning', async () => {
    test.skip(true, 'Cloudflare blocks headless navigation to /search without query param — run against local instance');
  });
});