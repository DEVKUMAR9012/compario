import { Link } from 'react-router-dom';
import { ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { getAllCategoryCounts } from '../data/products';

export default function Categories() {
  const categoryCounts = getAllCategoryCounts();

  return (
    <div className="flex flex-col space-y-10 pb-20">
      
      {/* Page Header */}
      <div className="bg-surface border border-border rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Product Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-3">
            Browse All Product Categories
          </h1>
          <p className="text-text-secondary text-base sm:text-lg mb-6">
            Compare prices across 8 major electronics & tech categories. Every category features a minimum of 100 authentic products with real-time multi-store price comparisons.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-medium text-text-primary">
            <div className="flex items-center gap-1.5 bg-background border border-border px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>8 Categories</span>
            </div>
            <div className="flex items-center gap-1.5 bg-background border border-border px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>840+ Products Total</span>
            </div>
            <div className="flex items-center gap-1.5 bg-background border border-border px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>100% Verified Stores</span>
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {CATEGORIES.map((category) => {
          const count = categoryCounts[category.id] || 105;
          return (
            <div 
              key={category.id}
              className="bg-surface border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <category.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                        {category.name}
                      </h2>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success/10 text-success">
                        {count} Products Available
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Featured Brands */}
                <div className="mb-6">
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block mb-2">
                    Top Featured Brands
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.featuredBrands.map((brand) => (
                      <Link
                        key={brand}
                        to={`/search?category=${category.id}&q=${encodeURIComponent(brand)}`}
                        className="text-xs bg-background border border-border px-2.5 py-1 rounded-md text-text-secondary hover:text-primary hover:border-primary/40 transition-colors"
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link 
                to={`/search?category=${category.id}`}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-primary/5 hover:bg-primary text-primary hover:text-white transition-all font-semibold text-sm border border-transparent hover:border-primary/20"
              >
                <span>Browse {count} {category.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>

    </div>
  );
}
