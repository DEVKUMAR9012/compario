import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingDown, Heart, Package } from 'lucide-react';

interface ProductCardProps {
  id: string;
  image: string;
  brand: string;
  name: string;
  rating: number;
  reviews?: number;
  currentPrice: number;
  storeCount: number;
  priceDropPercentage?: number;
  avgPrice90D: number;
}

export default function ProductCard({
  id,
  image,
  brand,
  name,
  rating,
  currentPrice,
  storeCount,
  priceDropPercentage,
  avgPrice90D
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  return (
    <div className="group relative bg-surface border border-border rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 flex flex-col h-full">
      {/* Wishlist Button */}
      <button 
        onClick={() => setIsWishlisted(!isWishlisted)}
        className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 ${
          isWishlisted ? 'text-danger bg-danger/10' : 'text-text-secondary hover:text-danger hover:bg-danger/5'
        }`}
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-danger' : ''}`} />
      </button>

      {/* Image */}
      <Link to={`/product/${id}`} className="block relative aspect-[4/3] w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center p-4 bg-background/50">
        {!imgError ? (
          <img 
            src={image} 
            alt={name} 
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" 
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-text-secondary">
            <Package className="w-12 h-12 stroke-[1.5] text-primary/40 mb-1" />
            <span className="text-xs font-medium">{brand}</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{brand}</div>
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-medium text-text-primary leading-tight mb-2 line-clamp-2 hover:text-primary transition-colors text-sm sm:text-base">
            {name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-warning text-warning" />
          <span className="text-xs font-bold text-text-primary ml-1">{rating}</span>
          <span className="text-[11px] text-text-secondary">({(Math.round(rating * 120)).toLocaleString()})</span>
        </div>

        <div className="mt-auto">
          {/* Price Area */}
          <div className="flex items-end gap-2 mb-1">
            <span className="text-xl font-bold text-text-primary">{formatPrice(currentPrice)}</span>
            {priceDropPercentage && (
              <span className="flex items-center gap-0.5 text-xs font-bold text-success bg-success/10 px-1.5 py-0.5 rounded mb-1">
                <TrendingDown className="w-3 h-3 stroke-[3]" />
                {priceDropPercentage}%
              </span>
            )}
          </div>
          
          <div className="text-xs text-text-secondary mb-1">
            Lowest across {storeCount} stores
          </div>
          
          <div className="text-xs text-text-secondary mb-4">
            90D Avg <span className="line-through">{formatPrice(avgPrice90D)}</span>
          </div>

          <Link to={`/product/${id}`} className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm text-primary bg-primary/5 hover:bg-primary hover:text-white transition-all border border-transparent hover:border-primary/20">
            Compare Prices
          </Link>
        </div>
      </div>
    </div>
  );
}
