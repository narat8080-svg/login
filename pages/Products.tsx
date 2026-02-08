import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { Filter, Search } from 'lucide-react';

export const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold dark:text-white mb-6">Marketplace</h1>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all dark:text-white"
            />
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-block p-6 rounded-full bg-slate-100 dark:bg-white/5 mb-4 text-slate-400">
            <Filter size={48} />
          </div>
          <h3 className="text-xl font-bold dark:text-white mb-2">No products found</h3>
          <p className="text-slate-500">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
};