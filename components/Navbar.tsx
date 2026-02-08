import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
  const { user, cart, openAuthModal, logout, toggleTheme, isDarkMode } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:animate-pulse">
              P
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
              Purat Site
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors duration-200 ${
                  location.pathname === link.path ? 'text-primary' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/cart" className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300 group">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-gradient-to-r from-secondary to-primary rounded-full shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                <img src={user.avatar} alt="User" className="w-9 h-9 rounded-full border-2 border-primary" />
                <span className="font-medium text-sm hidden lg:block dark:text-white">{user.name}</span>
                <button onClick={logout} className="text-slate-400 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Button onClick={openAuthModal} size="sm" variant="primary">
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button onClick={toggleTheme} className="p-2 mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 dark:text-white">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/90 dark:bg-black/90 backdrop-blur-md border-t border-slate-100 dark:border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
            <Link
               to="/cart"
               onClick={() => setIsMobileMenuOpen(false)}
               className="flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10"
            >
              <span>Cart</span>
              <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs">{totalItems}</span>
            </Link>
            
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              {user ? (
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center space-x-3">
                    <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full" />
                    <span className="font-medium dark:text-white">{user.name}</span>
                  </div>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-red-500 text-sm font-semibold">
                    Logout
                  </button>
                </div>
              ) : (
                <Button onClick={() => { openAuthModal(); setIsMobileMenuOpen(false); }} className="w-full">
                  Login / Register
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};