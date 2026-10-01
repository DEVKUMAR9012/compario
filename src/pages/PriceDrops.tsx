import { TrendingDown, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getPriceDropProducts } from '../data/products';

export default function PriceDrops() {
  const drops = getPriceDropProducts(24);

  return (
    <div className="flex flex-col space-y-8 pb-20">
      
      {/* Header Banner */}
      <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated Every Hour</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
            Top Price Drops <TrendingDown className="w-8 h-8 text-success" />
          </h1>
          <p className="text-text-secondary text-sm sm:text-base">
            Hand-picked products priced significantly below their 90-day market averages across Amazon, Flipkart, Croma, and more.
          </p>
        </div>
        <div className="bg-background border border-border px-4 py-2.5 rounded-xl text-center flex-shrink-0">
          <div className="text-2xl font-bold text-primary">{drops.length}</div>
          <div className="text-xs text-text-secondary font-medium">Active Drops Found</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {drops.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
