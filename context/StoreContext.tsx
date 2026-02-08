import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, CartItem, Product } from '../types';
import { supabase } from '../lib/supabase';

interface StoreContextType {
  user: User | null;
  isAuthenticated: boolean;
  cart: CartItem[];
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartTotal: number;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize Theme and Cart from LocalStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('purat_cart');
    const storedTheme = localStorage.getItem('purat_theme');

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Check active Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        mapSupabaseUser(session.user);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        mapSupabaseUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('purat_cart', JSON.stringify(cart));
  }, [cart]);

  const mapSupabaseUser = (sbUser: any) => {
    const newUser: User = {
      id: sbUser.id,
      email: sbUser.email,
      name: sbUser.user_metadata?.display_name || sbUser.email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${sbUser.email}`
    };
    setUser(newUser);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('purat_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('purat_theme', 'light');
      }
      return newMode;
    });
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      setIsAuthModalOpen(false);
    }
    return { error };
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });
    if (!error) {
       // Optional: Auto sign in or show message to check email
       setIsAuthModalOpen(false);
    }
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCart([]);
    localStorage.removeItem('purat_cart');
  };

  const addToCart = (product: Product) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        cart,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        signIn,
        signUp,
        logout,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        toggleTheme,
        isDarkMode
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};