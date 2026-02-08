import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from './ui/Button';
import { X, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';
import { AuthMode } from '../types';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, signIn, signUp } = useStore();
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) throw error;
      }
      
      // Reset form on success
      setFormData({ name: '', email: '', password: '' });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={closeAuthModal}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-[0_0_40px_rgba(30,111,255,0.2)] overflow-hidden transition-all transform scale-100">
        
        {/* Gradient Top Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-secondary"></div>
        
        <button 
          onClick={closeAuthModal} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join the Future'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {mode === 'login' ? 'Access your digital assets.' : 'Create your neural identity.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <UserIcon size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-white/10 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none transition-all dark:text-white placeholder-slate-400"
                />
              </div>
            )}
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-white/10 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none transition-all dark:text-white placeholder-slate-400"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Lock size={20} />
              </div>
              <input
                type="password"
                placeholder="Password"
                required
                minLength={6}
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-white/10 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none transition-all dark:text-white placeholder-slate-400"
              />
            </div>

            <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                className="ml-2 font-semibold text-primary hover:text-accent transition-colors underline decoration-2 underline-offset-2"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};