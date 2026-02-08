import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { Button } from '../components/ui/Button';
import { useStore } from '../context/StoreContext';
import { Star, Truck, ShieldCheck, ArrowLeft, Tag } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useStore();
  
  const product = MOCK_PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <Link to="/products" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors mb-8">
        <ArrowLeft size={20} className="mr-2" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Side */}
        <div className="relative group">
           <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2.5rem] transform rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
           <div className="relative rounded-[2rem] overflow-hidden bg-white dark:bg-white/5 border border-white/20 shadow-2xl">
             <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
           </div>
           <div className="absolute top-6 left-6 z-20">
              <div className="flex items-center space-x-2 bg-primary/90 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold shadow-lg">
                <Tag size={16} />
                <span>Fixed Price $1.50</span>
              </div>
           </div>
        </div>

        {/* Info Side */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-2 mb-4">
             <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-bold uppercase tracking-wide">
               {product.category}
             </span>
             <div className="flex items-center text-yellow-400">
               <Star size={16} fill="currentColor" />
               <span className="ml-1 text-slate-700 dark:text-slate-300 font-bold">{product.rating}</span>
             </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {product.name}
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center space-x-4 mb-10">
            <div className="text-5xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </div>
            <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 text-sm font-medium">
              Single Price Store
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" onClick={() => addToCart(product)} className="flex-1">
              Add to Cart - ${product.price.toFixed(2)}
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Wishlist
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                <Truck size={20} />
              </div>
              <div>
                <h4 className="font-bold dark:text-white">Free Hover-Shipping</h4>
                <p className="text-xs text-slate-500">Global coverage included</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold dark:text-white">2 Year Warranty</h4>
                <p className="text-xs text-slate-500">Full tech support coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};