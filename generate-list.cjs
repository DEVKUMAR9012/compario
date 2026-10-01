const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'src', 'data', 'products.ts');
const outputFile = path.join('C:', 'Users', 'Asus', '.gemini', 'antigravity-ide', 'brain', 'b6b890f7-dfe1-4317-b0ba-957aba628896', 'products_list.md');

try {
  let content = fs.readFileSync(inputFile, 'utf-8');
  
  const searchStr = 'export const PRODUCTS: Product[] = ';
  const arrayStartIndex = content.indexOf(searchStr) + searchStr.length;
  let arrayStr = content.substring(arrayStartIndex);
  
  // The array ends with '];' at the root level, so we split by \n];
  let arrayEndIndex = arrayStr.indexOf('\n];');
  if (arrayEndIndex === -1) arrayEndIndex = arrayStr.indexOf('\n] ;');
  arrayStr = arrayStr.substring(0, arrayEndIndex + 2);
  
  const products = eval('(' + arrayStr + ')');
  
  // Group by category
  const grouped = {};
  products.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });
  
  let md = '# Complete Product Catalog List\n\n';
  md += `Total Products: **${products.length}**\n\n`;
  
  for (const [category, items] of Object.entries(grouped)) {
    md += `## ${category.toUpperCase()} (${items.length})\n\n`;
    md += '| Brand | Product Name | Current Price |\n';
    md += '| :--- | :--- | :--- |\n';
    
    // Group by brand within category to make it look clean
    items.sort((a, b) => a.brand.localeCompare(b.brand)).forEach(item => {
      md += `| ${item.brand} | ${item.name} | ₹${item.currentPrice.toLocaleString('en-IN')} |\n`;
    });
    
    md += '\n';
  }
  
  fs.writeFileSync(outputFile, md, 'utf-8');
  console.log('Successfully generated products_list.md in the artifacts directory.');
  
} catch (e) {
  console.error("Failed to parse products:", e.message);
}
