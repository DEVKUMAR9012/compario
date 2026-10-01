import { CheckCircle2 } from 'lucide-react';
import type { StoreOffer } from '../data/products';

const DEFAULT_OFFERS: StoreOffer[] = [
  { 
    store: 'Amazon', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', 
    price: 68499, shipping: 'Free', seller: 'Amazon.in', available: true, updated: '2 min ago', best: true, link: 'https://amazon.in' 
  },
  { 
    store: 'Flipkart', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Flipkart_logo_%282026%29.svg', 
    price: 69999, shipping: 'Free', seller: 'RetailNet', available: true, updated: '4 min ago', best: false, link: 'https://flipkart.com' 
  },
  { 
    store: 'Blinkit', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg', 
    price: 70990, shipping: '₹99', seller: 'Blinkit Instant', available: true, updated: '8 min ago', best: false, link: 'https://blinkit.com' 
  },
  { 
    store: 'Reliance Digital', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Reliance_Digital.svg', 
    price: 71499, shipping: 'Free', seller: 'Reliance Retail', available: true, updated: '12 min ago', best: false, link: 'https://reliancedigital.in' 
  },
  { 
    store: 'eBay', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg', 
    price: 72499, shipping: 'Free', seller: 'eBay Verified', available: true, updated: '20 min ago', best: false, link: 'https://ebay.com' 
  }
];

interface MarketplaceTableProps {
  stores?: StoreOffer[];
}

export default function MarketplaceTable({ stores }: MarketplaceTableProps) {
  const offersToRender = stores && stores.length > 0 ? stores : DEFAULT_OFFERS;

  return (
    <div className="w-full bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-background text-text-secondary uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 rounded-tl-2xl">Store</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Shipping</th>
              <th className="px-6 py-4 hidden sm:table-cell">Seller</th>
              <th className="px-6 py-4 hidden md:table-cell">Availability</th>
              <th className="px-6 py-4 hidden lg:table-cell">Updated</th>
              <th className="px-6 py-4 text-right rounded-tr-2xl">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {offersToRender.map((offer, idx) => (
              <tr key={idx} className={`hover:bg-background/50 transition-colors ${offer.best ? 'bg-primary/[0.02]' : ''}`}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <div className="h-8 w-24 flex items-center justify-start bg-white rounded p-1 mix-blend-multiply">
                    <img 
                      src={offer.logo} 
                      alt={offer.store} 
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <span className="font-medium text-text-primary text-sm hidden sm:inline">{offer.store}</span>
                  {offer.best && <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wide">Best Price</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-text-primary text-base">
                  ₹{offer.price.toLocaleString('en-IN')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                  {offer.shipping}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-text-secondary hidden sm:table-cell">
                  {offer.seller}
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  {offer.available ? (
                    <div className="flex items-center gap-1.5 text-success">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-medium text-xs">Available</span>
                    </div>
                  ) : (
                    <span className="text-text-secondary">Out of stock</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-text-secondary text-xs hidden lg:table-cell">
                  {offer.updated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <a 
                    href={offer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    View Deal
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
