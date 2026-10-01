import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import compiled or inspect generated products.ts
const productsFilePath = path.resolve(__dirname, '../src/data/products.ts');
const fileContent = fs.readFileSync(productsFilePath, 'utf-8');

const expectedCategories = [
  'smartphones',
  'laptops',
  'headphones',
  'smartwatches',
  'monitors',
  'gaming',
  'cameras',
  'accessories'
];

console.log('--- VERIFYING CATEGORY COUNTS ---');

// Extract all category occurrences
const categoryMatches = fileContent.match(/"category":\s*"([^"]+)"/g);
if (!categoryMatches) {
  console.error('FAIL: No products found in products.ts');
  process.exit(1);
}

const counts = {};
expectedCategories.forEach(c => counts[c] = 0);

categoryMatches.forEach(match => {
  const cat = match.replace(/"category":\s*"/, '').replace(/"/, '');
  counts[cat] = (counts[cat] || 0) + 1;
});

let allPassed = true;
let total = 0;

for (const cat of expectedCategories) {
  const count = counts[cat] || 0;
  total += count;
  const passed = count >= 100;
  if (!passed) allPassed = false;
  console.log(`[${passed ? 'PASS' : 'FAIL'}] Category "${cat}": ${count} products (minimum required: 100)`);
}

console.log('---------------------------------');
console.log(`Total Products in Catalog: ${total}`);

if (allPassed) {
  console.log('ALL CATEGORY ASSERTIONS PASSED! Every category has >= 100 products.');
  process.exit(0);
} else {
  console.error('FAILED: One or more categories have fewer than 100 products.');
  process.exit(1);
}
