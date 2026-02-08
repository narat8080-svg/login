import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Plus, Star, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <div className="group relative bg-white dark:bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-lg hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(30,111,255,0.2)] transition-all duration-500 hover:-translate-y-2">
      {/* Image Area */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-60"></div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-white text-xs font-bold border border-white/30">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
        </div>
        <div className="absolute top-4 left-4 z-20">
           <div className="flex items-center space-x-1 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg">
             <Tag size={12} />
             <span>Fixed Price</span>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20">
        <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-end justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs">Price</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                All items $1.50
              </span>
            </div>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/10 text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:rotate-90"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
      
      {/* Gradient Border Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
};