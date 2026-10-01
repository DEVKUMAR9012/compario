import { Link } from 'react-router-dom';
import { Package, Bell, TrendingDown, IndianRupee, Trash2, ArrowRight } from 'lucide-react';
import { getPriceDropProducts } from '../data/products';

export default function Dashboard() {
  const recentDrops = getPriceDropProducts(3);

  const stats = [
    { label: 'Catalog Products', value: '840+', icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active Alerts', value: '5', icon: Bell, color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Active Price Drops', value: '24+', icon: TrendingDown, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Potential Savings', value: '₹14,850', icon: IndianRupee, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const trackedAlerts = [
    {
      id: 'phone-apple-iphone-16-128gb',
      name: 'iPhone 16 128GB',
      currentPrice: 79900,
      targetPrice: 74000,
      img: 'https://m.media-amazon.com/images/I/71nvkHnPpZL._SX679_.jpg'
    },
    {
      id: 'laptop-apple-macbook-air-13-m3-8gb-ram-256gb-ssd',
      name: 'MacBook Air 13 M3',
      currentPrice: 104990,
      targetPrice: 95000,
      img: 'https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg'
    }
  ];

  return (
    <div className="flex flex-col space-y-8 pb-20">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Good evening 👋</h1>
        <p className="text-text-secondary">Track the products you care about and manage your alerts across 840+ items.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-6 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <div className="text-sm font-semibold text-text-secondary">{stat.label}</div>
              <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Price Drops */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary">Recent Price Drops</h2>
            <Link to="/drops" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentDrops.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="flex items-center gap-4 p-3 hover:bg-background rounded-xl transition-colors group"
              >
                <div className="w-16 h-16 bg-white border border-border rounded-lg p-2 flex items-center justify-center mix-blend-multiply flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-text-secondary uppercase">{product.brand}</span>
                  <h4 className="font-semibold text-text-primary text-sm line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-text-primary">₹{product.currentPrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-text-secondary line-through">₹{product.avgPrice90D.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  {product.priceDropPercentage && (
                    <span className="flex items-center gap-0.5 text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded mb-1">
                      <TrendingDown className="w-3 h-3 stroke-[3]" /> {product.priceDropPercentage}%
                    </span>
                  )}
                  <span className="text-xs text-text-secondary">Lowest in 90D</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Active Price Alerts */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary">Active Price Alerts</h2>
            <Link to="/search" className="text-sm font-medium text-primary hover:underline">Add New</Link>
          </div>
          <div className="space-y-4">
            {trackedAlerts.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 hover:bg-background rounded-xl transition-colors">
                <div className="w-16 h-16 bg-white border border-border rounded-lg p-2 flex items-center justify-center mix-blend-multiply flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="font-semibold text-text-primary text-sm line-clamp-1 hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                  <div className="text-xs text-text-secondary mb-1">Current: <span className="font-bold text-text-primary">₹{item.currentPrice.toLocaleString('en-IN')}</span></div>
                  <div className="text-xs text-text-secondary">Target: <span className="font-bold text-primary">₹{item.targetPrice.toLocaleString('en-IN')}</span></div>
                </div>
                <button className="p-2 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors cursor-pointer" title="Delete alert">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Email Subscription Section */}
      <div className="bg-primary text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md mt-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Never miss a price drop!</h2>
          <p className="text-white/80">Sign up with your email ID to receive instant alerts and weekly savings summaries.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input 
            type="email" 
            placeholder="Enter your email ID" 
            className="px-4 py-3 rounded-xl flex-1 md:w-72 text-text-primary border-none focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button className="bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap shadow-sm cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
