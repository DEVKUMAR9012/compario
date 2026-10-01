import { Bell, ExternalLink, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const WISHLIST_ITEMS = [
  {
    id: 'iphone-16',
    name: 'Apple iPhone 16 128GB Black',
    image: 'https://m.media-amazon.com/images/I/71nvkHnPpZL._SX679_.jpg',
    currentPrice: 68499,
    targetPrice: 65000,
    historicalLow: 66999,
    priceChange: -4.8,
    alertActive: true
  },
  {
    id: 'macbook-air',
    name: 'MacBook Air M3 (13-inch, 8GB RAM, 256GB SSD)',
    image: 'https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg',
    currentPrice: 104990,
    targetPrice: 95000,
    historicalLow: 99990,
    priceChange: 0,
    alertActive: true
  },
  {
    id: 'airpods-pro',
    name: 'Apple AirPods Pro (2nd Generation)',
    image: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg',
    currentPrice: 24990,
    targetPrice: 19999,
    historicalLow: 18999,
    priceChange: 2.5,
    alertActive: false
  }
];

export default function Wishlist() {
  return (
    <div className="flex flex-col space-y-8 pb-20">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Wishlist</h1>
        <p className="text-text-secondary">Track your favorite products and monitor their price changes.</p>
      </div>

      <div className="w-full bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background text-text-secondary uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 rounded-tl-2xl">Product</th>
                <th className="px-6 py-4">Current Price</th>
                <th className="px-6 py-4 hidden sm:table-cell">Target Price</th>
                <th className="px-6 py-4 hidden md:table-cell">Alert Status</th>
                <th className="px-6 py-4 text-right rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {WISHLIST_ITEMS.map((item, idx) => (
                <tr key={idx} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 flex-shrink-0 bg-white border border-border rounded-lg p-1 mix-blend-multiply">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <Link to={`/product/${item.id}`} className="font-semibold text-text-primary hover:text-primary transition-colors line-clamp-2">
                        {item.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-bold text-text-primary text-base">₹{item.currentPrice.toLocaleString()}</span>
                      {item.priceChange !== 0 && (
                        <span className={`text-xs font-semibold ${item.priceChange < 0 ? 'text-success' : 'text-danger'}`}>
                          {item.priceChange > 0 ? '+' : ''}{item.priceChange}%
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="font-medium text-text-primary">₹{item.targetPrice.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    {item.alertActive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <Bell className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-background border border-border text-text-secondary">
                        <Bell className="w-3.5 h-3.5" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/product/${item.id}`} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Compare Prices">
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                      <button className="p-2 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors" title="Remove from Wishlist">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
