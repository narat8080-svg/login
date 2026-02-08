import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

export const Home: React.FC = () => {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-primary/20 backdrop-blur-md text-primary font-semibold text-sm mb-6 animate-bounce">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Future Collection 2026 Live Now
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white leading-tight">
              Upgrade Your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                Digital Reality
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              Experience the next generation of tech. From hover-boards to neural links, we curate the future so you can live it today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto group">
                  Explore Products
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  View New Arrivals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Instant Delivery", desc: "Drone delivery within 2 hours globally." },
              { icon: Shield, title: "Quantum Secured", desc: "Transactions protected by quantum encryption." },
              { icon: Globe, title: "Eco-Synthetic", desc: "100% sustainable lab-grown materials." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-primary/50 transition-colors shadow-sm hover:shadow-lg group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-white/10 dark:to-white/5 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold dark:text-white mb-2">Trending Now</h2>
              <p className="text-slate-500 dark:text-slate-400">Top picks from the metaverse.</p>
            </div>
            <Link to="/products" className="text-primary font-semibold hover:text-accent transition-colors hidden sm:block">
              View All ->
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
             <Link to="/products">
                <Button variant="outline">View All Products</Button>
             </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter / CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to upgrade your lifestyle?</h2>
            <p className="text-white/80 text-lg mb-8">Join 50,000+ users exploring the future of retail today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 flex-grow"
               />
               <Button className="bg-white text-primary hover:bg-white/90 shadow-lg border-none">
                 Subscribe
               </Button>
            </div>
        </div>
      </section>
    </div>
  );
};