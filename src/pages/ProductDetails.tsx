import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Bell, TrendingDown, ShieldCheck, Truck, ExternalLink, ArrowLeft, Package, Check } from 'lucide-react';
import PriceChart from '../components/PriceChart';
import MarketplaceTable from '../components/MarketplaceTable';
import PriceAlertModal from '../components/PriceAlertModal';
import { getProductById, getAllProducts } from '../data/products';
import { CATEGORIES } from '../data/categories';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Retrieve product from database
  const product = id ? getProductById(id) : undefined;

  // Fallback if ID doesn't exist
  if (!product) {
    const popularFallbacks = getAllProducts().slice(0, 4);
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Product Not Found</h1>
        <p className="text-text-secondary max-w-md mb-8">
          The requested product ID could not be located in the catalog. It might have been updated or moved.
        </p>
        <Link 
          to="/search" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-sm hover:bg-primary/90 transition-all mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All 840+ Products</span>
        </Link>

        <div className="w-full max-w-4xl text-left">
          <h2 className="text-lg font-bold text-text-primary mb-4">You may be interested in:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularFallbacks.map(p => (
              <Link 
                key={p.id}
                to={`/product/${p.id}`}
                className="p-4 bg-surface border border-border rounded-xl hover:border-primary/40 transition-all flex flex-col"
              >
                <span className="text-xs font-semibold text-text-secondary uppercase">{p.brand}</span>
                <span className="text-sm font-medium text-text-primary line-clamp-2 mt-1 mb-2">{p.name}</span>
                <span className="font-bold text-primary text-sm mt-auto">₹{p.currentPrice.toLocaleString('en-IN')}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const categoryObj = CATEGORIES.find(c => c.id === product.category);
  const categoryName = categoryObj ? categoryObj.name : product.category;
  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;
  const priceDrop = product.avgPrice90D - product.currentPrice;
  const bestOffer = product.stores.find(s => s.best) || product.stores[0];

  return (
    <div className="flex flex-col space-y-8 pb-20">
      
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-text-secondary gap-2 mb-2 flex-wrap">
        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/categories" className="hover:text-text-primary transition-colors">Categories</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/search?category=${product.category}`} className="hover:text-text-primary transition-colors">
          {categoryName}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-text-primary transition-colors">{product.brand}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="font-medium text-text-primary line-clamp-1">{product.name}</span>
      </nav>

      {/* Main Product Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left: Gallery */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 h-auto sm:h-[500px]">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto w-full sm:w-20 no-scrollbar pb-2 sm:pb-0">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => { setActiveImage(idx); setImgError(false); }}
                className={`flex-shrink-0 w-16 sm:w-full aspect-square bg-surface border rounded-xl overflow-hidden p-2 transition-all ${
                  activeImage === idx ? 'border-primary ring-1 ring-primary/50 shadow-sm' : 'border-border hover:border-primary/50'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} referrerPolicy="no-referrer" className="w-full h-full object-contain mix-blend-multiply" />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 bg-surface border border-border rounded-2xl p-8 flex items-center justify-center relative bg-background/50">
            {!imgError ? (
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mix-blend-multiply max-h-[420px]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-text-secondary">
                <Package className="w-20 h-20 text-primary/30 mb-2 stroke-[1.5]" />
                <span className="text-sm font-semibold">{product.brand}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Info & Price Card */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{product.brand}</span>
              <span className="text-xs text-border">•</span>
              <Link to={`/search?category=${product.category}`} className="text-xs font-medium text-primary hover:underline">
                {categoryName}
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-warning/10 px-2.5 py-1 rounded-md">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-bold text-warning-dark">{product.rating}</span>
              </div>
              <span className="text-sm text-text-secondary">Tracked by {product.reviews.toLocaleString()} users</span>
              <span className="text-xs bg-surface border border-border px-2.5 py-1 rounded-md text-text-secondary">
                {product.storeCount} Stores Competing
              </span>
            </div>
          </div>

          {/* Key specs pills */}
          {product.specs && product.specs.length > 0 && (
            <div className="mb-6">
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Key Specifications</div>
              <div className="flex flex-wrap gap-2">
                {product.specs.map((spec, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-xs bg-surface border border-border px-2.5 py-1 rounded-lg text-text-primary">
                    <Check className="w-3 h-3 text-success" />
                    <span>{spec}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Current Best Price Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Current Best Price</div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
                {formatPrice(product.currentPrice)}
              </span>
              {product.avgPrice90D > product.currentPrice && (
                <span className="text-base text-text-secondary line-through">
                  {formatPrice(product.avgPrice90D)}
                </span>
              )}
            </div>
            
            {priceDrop > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center gap-1 text-sm font-bold text-success bg-success/10 px-2 py-1 rounded-md">
                  <TrendingDown className="w-4 h-4 stroke-[3]" />
                  {formatPrice(priceDrop)} below 90-day average
                  {product.priceDropPercentage && ` (${product.priceDropPercentage}% off)`}
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-background rounded-xl p-3 border border-border/50">
                <div className="text-xs text-text-secondary mb-1">Historical Low</div>
                <div className="font-bold text-text-primary">{formatPrice(product.historicalLow)}</div>
              </div>
              <div className="bg-background rounded-xl p-3 border border-border/50">
                <div className="text-xs text-text-secondary mb-1">Historical High</div>
                <div className="font-bold text-text-primary">{formatPrice(product.historicalHigh)}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href={bestOffer.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-white font-medium py-3.5 px-6 rounded-xl hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2 text-center"
              >
                <span>Buy on {bestOffer.store} ({formatPrice(bestOffer.price)})</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setIsAlertModalOpen(true)}
                className="flex-1 bg-primary/10 text-primary font-medium py-3.5 px-6 rounded-xl hover:bg-primary/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bell className="w-4 h-4" /> Set Price Alert
              </button>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="flex items-center gap-6 py-4 border-t border-border mt-auto">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <ShieldCheck className="w-5 h-5 text-success" /> Verified Retailers
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Truck className="w-5 h-5 text-primary" /> Free Delivery Available
            </div>
          </div>
        </div>
      </div>

      <PriceAlertModal 
        isOpen={isAlertModalOpen} 
        onClose={() => setIsAlertModalOpen(false)} 
        productName={product.name} 
        currentPrice={product.currentPrice} 
      />

      {/* Price Intelligence Section */}
      <section className="pt-8">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Price Intelligence & History</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Metric Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 h-fit">
            <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Current Best</div>
              <div className="text-2xl font-bold text-text-primary">{formatPrice(product.currentPrice)}</div>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">90-Day Avg</div>
              <div className="text-2xl font-bold text-text-primary">{formatPrice(product.avgPrice90D)}</div>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Historical Low</div>
              <div className="text-2xl font-bold text-success">{formatPrice(product.historicalLow)}</div>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Historical High</div>
              <div className="text-2xl font-bold text-text-secondary">{formatPrice(product.historicalHigh)}</div>
            </div>
          </div>

          {/* Right: Price Chart */}
          <div className="lg:col-span-8 bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <PriceChart currentPrice={product.currentPrice} avgPrice90D={product.avgPrice90D} />
          </div>
        </div>
      </section>

      {/* Marketplace Comparison */}
      <section className="pt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Marketplace Comparison</h2>
          <p className="text-text-secondary">Comparing live prices across {product.stores.length} authorized Indian retailers</p>
        </div>
        <MarketplaceTable stores={product.stores} />
      </section>
    </div>
  );
}
