export interface Product {
  name: string;
  tribe: string;
  price: number;
  image: string;
}

export interface Tribe {
  name: string;
  description: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: {
    product: Product;
    quantity: number;
  }[];
  total: number;
  trackingNumber?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  address?: string;
  phone?: string;
  bio?: string;
  isSeller?: boolean;
  shopName?: string;
  shopDescription?: string;
}