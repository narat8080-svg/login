import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { FloatingContact } from './components/FloatingContact';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';

// Wrapper for scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <ScrollToTop />
        <div className="relative min-h-screen overflow-x-hidden selection:bg-primary/30 selection:text-primary">
          <Navbar />
          <AuthModal />
          <FloatingContact />
          
          <main className="relative z-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white dark:bg-black/50 border-t border-slate-100 dark:border-white/10 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="mb-4">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                  Purat Site
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                © 2026 Purat Site Inc. Designed for the future.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;