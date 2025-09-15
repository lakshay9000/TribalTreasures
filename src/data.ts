import { Product, Tribe, Order, UserProfile } from './types';

export const products: Product[] = [
  {
    name: 'Traditional Bamboo Basket',
    tribe: 'Gond Tribe',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1590137876181-2a5a7e340308?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Hand-woven Textile',
    tribe: 'Bhil Tribe',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tribal Jewelry Set',
    tribe: 'Warli Tribe',
    price: 6999,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Ceremonial Mask',
    tribe: 'Baiga Tribe',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

export const tribes: Tribe[] = [
  {
    name: 'Gond Tribe',
    description: 'Known for their intricate artwork and natural color paintings.',
    image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bhil Tribe',
    description: 'Masters of traditional crafts and distinctive pottery.',
    image: 'https://images.unsplash.com/photo-1537365587684-f490102e1225?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Warli Tribe',
    description: 'Famous for their traditional geometric art forms.',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

export const userProfile: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  address: '123 Tribal Street, Artisan City, AC 12345',
  phone: '+91 98765 43210'
};

export const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-03-15',
    status: 'delivered',
    items: [
      { product: products[0], quantity: 2 },
      { product: products[1], quantity: 1 }
    ],
    total: 9997,
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    date: '2024-03-18',
    status: 'shipped',
    items: [
      { product: products[2], quantity: 1 }
    ],
    total: 6999,
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-003',
    date: '2024-03-20',
    status: 'processing',
    items: [
      { product: products[3], quantity: 1 },
      { product: products[0], quantity: 1 }
    ],
    total: 12498
  }
];