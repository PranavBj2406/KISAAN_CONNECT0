import { createReadStream, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import csvToJson from 'csvtojson';

// Get __dirname equivalent in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define paths
const csvFilePath = join(__dirname, 'cabbage.csv');
const jsonOutputPath = join(__dirname, '..', 'data', 'priceDataCabbage.json');

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