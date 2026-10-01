import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "./contexts/AuthContext"
import Navbar from "./components/Navbar"
import AuthModal from "./components/AuthModal"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import SearchResults from "./pages/SearchResults"
import Dashboard from "./pages/Dashboard"
import Wishlist from "./pages/Wishlist"
import PriceDrops from "./pages/PriceDrops"
import Categories from "./pages/Categories"
import Login from "./pages/Login"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Full-screen standalone route — no Navbar / padding */}
            <Route path="/login" element={<Login />} />

            {/* All other routes share the app shell */}
            <Route
              path="/*"
              element={
                <div className="min-h-screen bg-background flex flex-col font-sans text-text-primary">
                  <Navbar />
                  <AuthModal />
                  <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/drops" element={<PriceDrops />} />
                    </Routes>
                  </main>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
