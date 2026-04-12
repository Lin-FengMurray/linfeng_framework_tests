// utils/fileHelpers.js

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/**
 * Returns the absolute path to the test-data/upload-sample.txt file.
 */
export function getUploadFilePath() {
  return path.resolve(__dirname, '../test-data/upload-sample.txt');
}
