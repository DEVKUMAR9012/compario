const https = require('https');

const queries = [
  'iPhone 13 Pro',
  'MacBook Pro 14',
  'Sony Headphones',
  'Apple Watch Series 7',
  'Computer Monitor Dell',
  'PlayStation 5',
  'Sony Alpha 7',
  'Power Bank Anker'
];

async function getWikiImage(query) {
  return new Promise((resolve) => {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=600&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1`;
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
              resolve({ query, url: imgUrl });
              return;
            }
          }
        } catch (e) {}
        resolve({ query, url: 'NOT FOUND' });
      });
    });
  });
}

Promise.all(queries.map(getWikiImage)).then(res => console.log(JSON.stringify(res, null, 2)));
