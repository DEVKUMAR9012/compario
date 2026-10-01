import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import { searchProducts, getAllProducts } from '../data/products';

const ITEMS_PER_PAGE = 20;

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [hasPriceDropOnly, setHasPriceDropOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'drop-desc' | 'rating-desc'>('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page and filters on query/category change
  useEffect(() => {
    setCurrentPage(1);
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setSelectedStores([]);
    setHasPriceDropOnly(false);
  }, [queryParam, categoryParam]);

  // Find all available brands and stores for current category or query
  const categoryProducts = useMemo(() => {
    const all = getAllProducts();
    if (categoryParam && categoryParam !== 'all') {
      return all.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase());
    }
    return all;
  }, [categoryParam]);

  const availableBrands = useMemo(() => {
    const brandMap = new Map<string, number>();
    for (const p of categoryProducts) {
      brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);
    }
    return Array.from(brandMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([brand, count]) => ({ brand, count }));
  }, [categoryProducts]);

  const availableStores = useMemo(() => {
    return ['Amazon', 'Flipkart', 'Croma', 'Reliance Digital', 'Tata Cliq', 'JioMart', 'Vijay Sales'];
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;

    return searchProducts(queryParam, categoryParam, {
      brands: selectedBrands,
      minPrice: min,
      maxPrice: max,
      stores: selectedStores,
      hasPriceDrop: hasPriceDropOnly,
      sortBy: sortBy
    });
  }, [queryParam, categoryParam, selectedBrands, minPrice, maxPrice, selectedStores, hasPriceDropOnly, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleBrandToggle = (brand: string) => {
    setCurrentPage(1);
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleStoreToggle = (store: string) => {
    setCurrentPage(1);
    setSelectedStores(prev => 
      prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
    );
  };

  const handleCategorySelect = (catId: string) => {
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setSelectedStores([]);
    setHasPriceDropOnly(false);
    setSortBy('relevance');
    setCurrentPage(1);
  };

  const currentCategoryObj = CATEGORIES.find(c => c.id === categoryParam);

  return (
    <div className="flex flex-col pb-20">
      
      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        <button
          onClick={() => handleCategorySelect('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            categoryParam === 'all'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/40'
          }`}
        >
          All Categories (840)
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              categoryParam === cat.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/40'
            }`}
          >
            <cat.icon className="w-4 h-4" />
            <span>{cat.name} (105)</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-primary" /> Filters
            </h2>
            {(selectedBrands.length > 0 || minPrice || maxPrice || selectedStores.length > 0 || hasPriceDropOnly) && (
              <button 
                onClick={clearAllFilters}
                className="text-xs text-primary font-medium hover:underline cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="bg-surface border border-border rounded-2xl p-5 space-y-6 shadow-sm">
            
            {/* Price Drop Only Filter */}
            <div className="border-b border-border pb-5">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-semibold text-text-primary">Price Drops Only</span>
                <input 
                  type="checkbox" 
                  checked={hasPriceDropOnly}
                  onChange={(e) => {
                    setHasPriceDropOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-border cursor-pointer"
                />
              </label>
            </div>

            {/* Price Range */}
            <div className="border-b border-border pb-5">
              <h3 className="font-semibold text-text-primary text-sm mb-3">Price Range (₹)</h3>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                />
                <span className="text-text-secondary text-xs">to</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="border-b border-border pb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-text-primary text-sm">Brands</h3>
                {selectedBrands.length > 0 && (
                  <span className="text-[11px] text-primary font-medium">({selectedBrands.length} selected)</span>
                )}
              </div>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1 no-scrollbar">
                {availableBrands.map(({ brand, count }) => {
                  const isChecked = selectedBrands.includes(brand);
                  return (
                    <label 
                      key={brand} 
                      onClick={() => handleBrandToggle(brand)}
                      className="flex items-center justify-between cursor-pointer py-1 px-1.5 rounded-lg hover:bg-background transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/50 bg-background'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <span className={`text-sm ${isChecked ? 'font-medium text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                          {brand}
                        </span>
                      </div>
                      <span className="text-[11px] text-text-secondary">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            
            {/* Store Filter */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-text-primary text-sm">Available Stores</h3>
              </div>
              <div className="space-y-2">
                {availableStores.map((store) => {
                  const isChecked = selectedStores.includes(store);
                  return (
                    <label 
                      key={store} 
                      onClick={() => handleStoreToggle(store)}
                      className="flex items-center gap-2.5 cursor-pointer py-1 px-1.5 rounded-lg hover:bg-background transition-colors group"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/50 bg-background'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </div>
                      <span className={`text-sm ${isChecked ? 'font-medium text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                        {store}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
        </aside>

        {/* Right Product Grid */}
        <div className="flex-1">
          {/* Header & Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-surface border border-border rounded-2xl p-4 sm:p-5 shadow-sm">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-1">
                {queryParam 
                  ? `Search results for "${queryParam}"`
                  : currentCategoryObj 
                    ? currentCategoryObj.name 
                    : 'All Products'}
              </h1>
              <p className="text-sm text-text-secondary">
                Showing {filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} items
                {currentCategoryObj && ` in ${currentCategoryObj.name}`}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary whitespace-nowrap">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="bg-background border border-border rounded-xl px-3 py-2 text-sm text-text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer shadow-sm transition-all"
              >
                <option value="relevance">Featured & Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="drop-desc">Biggest Price Drop</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Active Filter Pills */}
          {(selectedBrands.length > 0 || selectedStores.length > 0 || minPrice || maxPrice || hasPriceDropOnly) && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-text-secondary font-medium mr-1">Active filters:</span>
              {selectedBrands.map(b => (
                <button
                  key={b}
                  onClick={() => handleBrandToggle(b)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                >
                  <span>{b}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}
              {selectedStores.map(s => (
                <button
                  key={s}
                  onClick={() => handleStoreToggle(s)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                >
                  <span>{s}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}
              {hasPriceDropOnly && (
                <button
                  onClick={() => setHasPriceDropOnly(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold hover:bg-success/20 transition-colors"
                >
                  <span>Price Drops Only</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {(minPrice || maxPrice) && (
                <button
                  onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border text-text-secondary text-xs font-semibold hover:text-text-primary transition-colors"
                >
                  <span>₹{minPrice || 0} - ₹{maxPrice || '∞'}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-primary font-medium hover:underline ml-2"
              >
                Reset all
              </button>
            </div>
          )}

          {/* Product Grid */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginatedProducts.map(p => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-border pt-6 mt-6">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage(p => Math.max(1, p - 1));
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-xl text-sm font-medium text-text-primary hover:border-primary/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      // show first, last, and around current
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => {
                              setCurrentPage(page);
                              window.scrollTo({ top: 120, behavior: 'smooth' });
                            }}
                            className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                              currentPage === page
                                ? 'bg-primary text-white shadow-sm'
                                : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/40'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="px-1 text-text-secondary">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage(p => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-xl text-sm font-medium text-text-primary hover:border-primary/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-surface border border-border rounded-2xl p-12 text-center flex flex-col items-center">
              <SlidersHorizontal className="w-12 h-12 text-text-secondary/40 mb-4" />
              <h3 className="text-lg font-bold text-text-primary mb-2">No matching products found</h3>
              <p className="text-sm text-text-secondary max-w-md mb-6">
                We couldn't find any products matching your current combination of filters. Try broadening your criteria or reset the filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
