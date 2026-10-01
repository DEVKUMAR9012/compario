import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, TrendingDown, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import { getTrendingProducts, getAllCategoryCounts } from '../data/products';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const trendingProducts = getTrendingProducts(8);
  const categoryCounts = getAllCategoryCounts();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="flex flex-col space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-8 md:mt-16 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Real-time price comparisons across 8+ Indian stores</span>
        </div>


        
        {/* Large Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-3xl relative group mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search phones, laptops, GPUs, headphones, cameras..."
            className="block w-full pl-14 pr-28 py-4 bg-surface border border-border rounded-2xl text-base md:text-lg shadow-sm placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-secondary">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Verified Retailers Only</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-success" />
            <span>90-Day Price History</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            <span>100+ Products per Category</span>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Explore Categories</h2>
            <p className="text-sm text-text-secondary">Over 100 products cataloged in each category</p>
          </div>
          <Link to="/categories" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((category) => {
            const count = categoryCounts[category.id] || 105;
            return (
              <Link 
                key={category.id}
                to={`/search?category=${category.id}`}
                className="flex flex-col items-center justify-center p-4 bg-surface border border-border rounded-xl shadow-sm hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 cursor-pointer transition-all duration-200 group text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-3 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-200">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-semibold text-text-primary mb-1">{category.name}</span>
                <span className="text-[11px] font-medium text-text-secondary group-hover:text-primary transition-colors">
                  {count}+ products
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trending Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Trending Flagships</h2>
            <p className="text-sm text-text-secondary">Top searched products with active price drops today</p>
          </div>
          <Link to="/search" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            <span>Browse All 840+</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

    </div>
  );
}
