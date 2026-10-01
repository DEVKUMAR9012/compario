const fs = require('fs');
const csv = require('csv-parse/sync');

const indexFile = 'public/images/products/index.csv';
const productsFile = 'src/data/products.ts';

try {
  // 1. Read the CSV mapping
  const csvData = fs.readFileSync(indexFile, 'utf-8');
  const records = csv.parse(csvData, { columns: true, skip_empty_lines: true });
  
  const mapping = {};
  for (const row of records) {
    if (row.status === 'downloaded' && row.image_file) {
      // Ensure path uses forward slashes for the web
      mapping[row.query] = `/images/products/${row.image_file.replace(/\\/g, '/')}`;
    }
  }

  // 2. Read products.ts
  let content = fs.readFileSync(productsFile, 'utf-8');
  const searchStr = 'export const PRODUCTS: Product[] = ';
  let arrayStartIndex = content.indexOf(searchStr);
  let arrayStr = content.substring(arrayStartIndex + searchStr.length);
  
  let arrayEndIndex = arrayStr.indexOf('\n];');
  if (arrayEndIndex === -1) arrayEndIndex = arrayStr.indexOf('\n] ;');
  arrayStr = arrayStr.substring(0, arrayEndIndex + 2);
  
  const products = eval('(' + arrayStr + ')');
  
  // 3. Update the array
  let updatedCount = 0;
  products.forEach(p => {
    const query = `${p.brand} ${p.name}`;
    if (mapping[query]) {
      p.image = mapping[query];
      p.images = [mapping[query], mapping[query], mapping[query], p.images[3] || mapping[query]]; 
      updatedCount++;
    }
  });
  
  // 4. Reconstruct the file
  const updatedArrayStr = JSON.stringify(products, null, 2);
  const before = content.substring(0, arrayStartIndex + searchStr.length);
  const after = content.substring(arrayStartIndex + searchStr.length + arrayEndIndex + 2);
  
  fs.writeFileSync(productsFile, before + updatedArrayStr + ';' + after, 'utf-8');
  console.log(`Successfully updated ${updatedCount} products with local images.`);

} catch (err) {
  console.error('Error:', err);
}
