import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHome = location.pathname === '/';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/search');
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
  };

  if (isHome) {
    return (
      <nav className="w-full bg-[#f7fbfa]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex h-20 items-center justify-between gap-5">
            <Logo />

            <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
              <a href="#features" className="hover:text-slate-950 transition-colors">Features</a>
              <a href="#categories" className="hover:text-slate-950 transition-colors">Categories</a>
              <Link to="/drops" className="hover:text-slate-950 transition-colors">Price Drops</Link>
              <Link to="/search" className="hover:text-slate-950 transition-colors">Browse</Link>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {user ? (
                <Link to="/dashboard" className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white sm:block">
                  Dashboard
                </Link>
              ) : !loading ? (
                <button
                  onClick={() => navigate('/login')}
                  className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-white sm:block"
                >
                  Log in
                </button>
              ) : null}
              <Link to="/search" className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 sm:px-5">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface border-b border-border shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Logo />

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-secondary group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 800+ products, brands or models..."
              className="block w-full pl-10 pr-16 py-2.5 bg-background border border-transparent rounded-xl text-sm placeholder-text-secondary focus:border-primary focus:bg-surface focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="submit"
                className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-text-secondary hover:text-primary bg-surface border border-border rounded px-1.5 py-0.5 shadow-sm transition-colors cursor-pointer"
              >
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/categories" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Categories</Link>
            <Link to="/drops" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Price Drops</Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4 ml-4 lg:ml-8">
            <Link to="/wishlist" className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-full transition-colors hidden sm:block" title="Wishlist">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/dashboard" className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-full transition-colors" title="Alerts & Dashboard">
              <Bell className="w-5 h-5" />
            </Link>
            <div className="h-6 w-px bg-border hidden sm:block mx-1" />

            {/* Auth area */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-border animate-pulse" />
            ) : user ? (
              /* Logged in — user dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 p-1.5 pr-3 text-text-secondary hover:text-text-primary hover:bg-background rounded-full transition-colors border border-transparent hover:border-border"
                >
                  <div className="bg-primary/20 border border-primary/30 p-1.5 rounded-full">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <ChevronDown className={`w-3 h-3 hidden sm:block transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-text-primary truncate">{user.name || 'Compario User'}</p>
                      <p className="text-xs text-text-secondary truncate mt-0.5">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-background transition-colors"
                      >
                        <Bell className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-background transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        Wishlist
                      </Link>
                    </div>
                    <div className="border-t border-border py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Not logged in — navigate to login page */
              <button
                id="navbar-signin-btn"
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 p-1.5 pr-4 text-text-secondary hover:text-text-primary hover:bg-background rounded-full transition-colors border border-transparent hover:border-border"
              >
                <div className="bg-background border border-border p-1.5 rounded-full">
                  <User className="w-4 h-4 text-text-secondary" />
                </div>
                <span className="text-sm font-medium hidden sm:block">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
