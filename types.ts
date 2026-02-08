export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type AuthMode = 'login' | 'register';