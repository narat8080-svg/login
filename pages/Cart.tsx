import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { Trash2, ArrowRight } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, cartTotal } = useStore();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 text-slate-400">
           <ArrowRight size={40} className="rotate-180" />
        </div>
        <h2 className="text-3xl font-bold dark:text-white mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added any futuristic gear yet.</p>
        <Link to="/products">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  // No tax, fixed price logic
  const totalAmount = cartTotal.toFixed(2);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold dark:text-white mb-10">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white dark:bg-white/5 backdrop-blur-sm p-4 rounded-3xl border border-slate-100 dark:border-white/10 shadow-sm">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
              
              <div className="flex-1 ml-0 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                <h3 className="text-lg font-bold dark:text-white">{item.name}</h3>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                   <div className="text-primary font-bold">${item.price.toFixed(2)}</div>
                   <span className="text-xs text-slate-400 border border-slate-200 dark:border-white/10 px-1.5 rounded">Fixed</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                 <div className="flex items-center bg-slate-100 dark:bg-white/10 rounded-xl px-2">
                    <span className="px-4 py-2 font-bold dark:text-white">Qty: {item.quantity}</span>
                 </div>
                 <button 
                   onClick={() => removeFromCart(item.id)}
                   className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                 >
                   <Trash2 size={20} />
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-slate-100 dark:border-white/10 shadow-lg sticky top-24">
            <h3 className="text-xl font-bold dark:text-white mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              {/* Removed Tax Calculation for Fixed Pricing Model */}
            </div>

            <div className="border-t border-slate-100 dark:border-white/10 pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold dark:text-white">Total</span>
                <span className="text-2xl font-bold text-primary">${totalAmount}</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">
                 Single Price Store Policy: No additional fees.
              </p>
            </div>

            <Button onClick={() => navigate('/checkout')} className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};