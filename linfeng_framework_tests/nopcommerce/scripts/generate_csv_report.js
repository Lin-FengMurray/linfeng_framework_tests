/**
 * generate_csv_report.js
 *
 * Converts a Playwright JSON report into long-format CSV rows and APPENDS
 * them to test_results.csv (creates the file + header if it doesn't exist).
 *
 * The suite name is auto-detected from the file paths in the JSON report.
 * The CSV is written one folder above this script (i.e. the project root).
 *
 * Usage:
 *   npx playwright test <path> --reporter=json 2>/dev/null | node scripts/generate_csv_report.js
 *
 * Or from a saved JSON file:
 *   node scripts/generate_csv_report.js < results.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, '..', 'test_results.csv');

const HEADER = [
  'run_timestamp',
  'suite',
  'section',
  'subfolder',
  'file',
  'test_title',
  'status',
  'duration_ms',
  'retry',
  'browser',
  'error_message',
  'error_location',
];

function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

// Detect suite name from file path, e.g.
// "linfeng_framework_tests/hackernews/tests/..." → "hackernews"
// "linfeng_framework_tests/nopcommerce/tests/..." → "nopcommerce"
function detectSuite(filePath) {
  const match = filePath.match(/linfeng_framework_tests\/([^/]+)\/tests\//);
  return match ? match[1] : 'unknown';
}

function parseFilePath(filePath) {
  const parts = filePath.split('/').filter(Boolean);
  const testsIdx = parts.indexOf('tests');
  const after = parts.slice(testsIdx + 1);
  return {
    section:   after[0] || '',
    subfolder: after.length > 2 ? after[1] : '',
    file:      after[after.length - 1] || '',
  };
}

function parseCsvRow(row) {
  const cols = [];
  let cur = '', inQ = false;
  for (const ch of row) {
    if (ch === '"') { inQ = !inQ; }
    else if (ch === ',' && !inQ) { cols.push(cur); cur = ''; }
    else cur += ch;
  }
  cols.push(cur);
  return cols;
}

function walk(suites, rows, timestamp) {
  for (const suite of suites) {
    if (suite.specs?.length > 0) {
      for (const spec of suite.specs) {
        const suiteName = detectSuite(spec.file || '');
        for (const test of spec.tests) {
          const browser = (test.projectName || '').toLowerCase();
          for (const result of test.results) {
            const { section, subfolder, file } = parseFilePath(spec.file || '');
            const errorMsg = result.errors?.length > 0
              ? result.errors
                  .map(e => (e.message || '').replace(/\x1B\[[0-9;]*m/g, '').trim())
                  .join(' | ')
              : '';
            const errorLoc = result.errors?.length > 0
              ? result.errors
                  .map(e => e.location ? `${e.location.file}:${e.location.line}` : '')
                  .filter(Boolean)
                  .join(' | ')
              : '';
            rows.push([
              timestamp,
              suiteName,
              section,
              subfolder,
              file,
              spec.title,
              result.status,
              result.duration,
              result.retry,
              browser,
              errorMsg,
              errorLoc,
            ].map(escapeCsv).join(','));
          }
        }
      }
    }
    if (suite.suites?.length > 0) {
      walk(suite.suites, rows, timestamp);
    }
  }
}

// Read JSON from stdin
let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => raw += chunk);
process.stdin.on('end', () => {
  const results = JSON.parse(raw);
  const timestamp = new Date().toISOString();
  const rows = [];

  walk(results.suites, rows, timestamp);

  const fileExists = fs.existsSync(CSV_PATH);
  const output = fileExists
    ? '\n' + rows.join('\n')
    : HEADER.join(',') + '\n' + rows.join('\n');

  fs.appendFileSync(CSV_PATH, output);

  // Summary
  const byBrowserStatus = {};
  for (const row of rows) {
    const cols = parseCsvRow(row);
    const browser = cols[9];
    const status  = cols[6];
    const key = `${browser}|${status}`;
    byBrowserStatus[key] = (byBrowserStatus[key] || 0) + 1;
  }

  console.log(`\nRun timestamp : ${timestamp}`);
  console.log(`Rows appended : ${rows.length}`);
  console.log(`CSV path      : ${CSV_PATH}\n`);
  console.log('Browser'.padEnd(12) + 'Status'.padEnd(12) + 'Count');
  console.log('-'.repeat(36));
  for (const [key, count] of Object.entries(byBrowserStatus)) {
    const [browser, status] = key.split('|');
    console.log(browser.padEnd(12) + status.padEnd(12) + count);
  }
});
