const fs = require('fs');

const path = 'scripts/generate-products.js';
let content = fs.readFileSync(path, 'utf-8');

const categoryImages = {
  getSmartphones: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', // Smartphone
  getLaptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop', // Laptop
  getHeadphones: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', // Headphones
  getSmartwatches: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop', // Smartwatch
  getMonitors: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop', // Monitor
  getGaming: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop', // Gaming
  getCameras: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop', // Camera
  getAccessories: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf1?q=80&w=600&auto=format&fit=crop' // Accessory
};

// We will split the file by function declarations to know which category we are in
const chunks = content.split(/(?=function get[A-Z][a-z]+)/);

let newContent = chunks.map(chunk => {
  let matchedCat = null;
  for (const cat of Object.keys(categoryImages)) {
    if (chunk.startsWith(`function ${cat}`)) {
      matchedCat = cat;
      break;
    }
  }

  if (matchedCat) {
    const replacementImg = categoryImages[matchedCat];
    return chunk.replace(/img:\s*'https:\/\/m\.media-amazon\.com[^']+'/g, `img: '${replacementImg}'`);
  }
  return chunk;
}).join('');

fs.writeFileSync(path, newContent, 'utf-8');
console.log('Images replaced successfully.');
