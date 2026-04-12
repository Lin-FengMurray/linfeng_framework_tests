// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './linfeng_framework_tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  use: {
    headless: true,
    viewport: { width: 1440, height: 900 },
    actionTimeout: 15 * 1000,
    navigationTimeout: 20 * 1000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },
  projects: [
    // ── automationexercise ───────────────────────────────────────────────
    {
      name: 'automationexercise',
      testMatch: '**/automationexercise/tests/**/*.spec.js',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://www.automationexercise.com' },
    },
    {
      name: 'automationexercise-firefox',
      testMatch: '**/automationexercise/tests/**/*.spec.js',
      use: { ...devices['Desktop Firefox'], baseURL: 'https://www.automationexercise.com' },
    },
    {
      name: 'automationexercise-webkit',
      testMatch: '**/automationexercise/tests/**/*.spec.js',
      use: { ...devices['Desktop Safari'], baseURL: 'https://www.automationexercise.com' },
    },

    // ── nopcommerce ──────────────────────────────────────────────────────
    {
      name: 'nopcommerce',
      testMatch: '**/nopcommerce/tests/**/*.spec.js',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://demo.nopcommerce.com' },
    },
    {
      name: 'nopcommerce-firefox',
      testMatch: '**/nopcommerce/tests/**/*.spec.js',
      use: { ...devices['Desktop Firefox'], baseURL: 'https://demo.nopcommerce.com' },
    },
    {
      name: 'nopcommerce-webkit',
      testMatch: '**/nopcommerce/tests/**/*.spec.js',
      use: { ...devices['Desktop Safari'], baseURL: 'https://demo.nopcommerce.com' },
    },

    // ── hackernews ───────────────────────────────────────────────────────
    {
      name: 'hackernews',
      testMatch: '**/hackernews/tests/**/*.spec.js',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://news.ycombinator.com' },
    },
    {
      name: 'hackernews-firefox',
      testMatch: '**/hackernews/tests/**/*.spec.js',
      use: { ...devices['Desktop Firefox'], baseURL: 'https://news.ycombinator.com' },
    },
    {
      name: 'hackernews-webkit',
      testMatch: '**/hackernews/tests/**/*.spec.js',
      use: { ...devices['Desktop Safari'], baseURL: 'https://news.ycombinator.com' },
    },
  ],
  outputDir: 'test-results',
});
