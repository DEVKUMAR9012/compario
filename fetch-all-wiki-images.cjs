const fs = require('fs');
const https = require('https');

async function getWikiImage(query) {
  return new Promise((resolve) => {
    const searchUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=600&generator=search&gsrsearch=' + encodeURIComponent(query) + '&gsrlimit=1';
    https.get(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (pages) {
            const pageId = Object.keys(pages)[0];
            const imgUrl = pages[pageId]?.thumbnail?.source;
            if (imgUrl) {
              resolve(imgUrl);
              return;
            }
          }
        } catch (e) {}
        resolve(null);
      });
    });
  });
}

async function run() {
  const file = 'scripts/generate-products.js';
  let content = fs.readFileSync(file, 'utf-8');
  
  const regex = /name:\s*'([^']+)'/g;
  let match;
  const queries = new Set();
  
  while ((match = regex.exec(content)) !== null) {
    let name = match[1];
    let query = name.split(' ').slice(0, 3).join(' ');
    queries.add(query);
  }
  
  console.log('Unique queries:', queries.size);
  
  const cache = {};
  for (let q of queries) {
    console.log('Fetching', q);
    const url = await getWikiImage(q);
    if (url) {
      cache[q] = url;
    } else {
      const q2 = q.split(' ').slice(0, 2).join(' ');
      console.log('Fallback fetching', q2);
      const url2 = await getWikiImage(q2);
      if (url2) cache[q] = url2;
    }
  }
  
  const fullRegex = /(name:\s*'([^']+)',\s*price:\s*\d+,\s*img:\s*)'[^']+'/g;
  let newContent = content.replace(fullRegex, (match, prefix, name) => {
    let q = name.split(' ').slice(0, 3).join(' ');
    let url = cache[q];
    if (!url) {
      url = cache[name.split(' ').slice(0, 2).join(' ')];
    }
    if (url) {
      return prefix + "'" + url + "'";
    }
    return match;
  });
  
  fs.writeFileSync(file, newContent, 'utf-8');
  console.log('Replaced images in generate-products.js');
}

run();
