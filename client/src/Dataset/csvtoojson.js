import { createReadStream, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import csvToJson from 'csvtojson';

// Get __dirname equivalent in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define paths
const csvFilePath = join(__dirname, '35985678-0d79-46b4-9ed6-6f13308a1d24_67a6ee748c4d0c2354a6c3b074c0fe3a.csv');
const jsonOutputPath = join(__dirname, '..', 'data', 'priceData.json');

// Ensure output directory exists
const outputDir = dirname(jsonOutputPath);
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Convert CSV to JSON
csvToJson()
  .fromFile(csvFilePath)
  .then(json => {
    writeFileSync(jsonOutputPath, JSON.stringify(json, null, 2));
    console.log(`Successfully converted CSV to JSON at ${jsonOutputPath}`);
  })
  .catch(err => {
    console.error('Error converting CSV to JSON:', err.message);
  });