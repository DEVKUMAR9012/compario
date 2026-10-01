const https = require('https');
const urls = [
  { name: 'Amazon', url: 'https://commons.wikimedia.org/wiki/File:Amazon_logo.svg' },
  { name: 'Flipkart', url: 'https://commons.wikimedia.org/wiki/File:Flipkart_logo_(2026).svg' },
  { name: 'Blinkit', url: 'https://commons.wikimedia.org/wiki/File:Blinkit-yellow-app-icon.svg' },
  { name: 'Reliance Digital', url: 'https://commons.wikimedia.org/wiki/File:Reliance_Digital.svg' },
  { name: 'eBay', url: 'https://commons.wikimedia.org/wiki/File:EBay_logo.svg' }
];

async function getUrl(item) {
  return new Promise((resolve) => {
    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<a href=\"(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[^\"<]+)\" class=\"internal\"/);
        if (match) {
          resolve({name: item.name, rawUrl: match[1]});
        } else {
          resolve({name: item.name, rawUrl: 'NOT FOUND'});
        }
      });
    });
  });
}

Promise.all(urls.map(getUrl)).then(results => console.log(JSON.stringify(results, null, 2)));
