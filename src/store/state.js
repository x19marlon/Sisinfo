/* ============================================
   INDUPACK — Global State Store
   ============================================ */

import { storage } from '../utils/storage.js';
import { products } from '../data/products.js';

// Initial state hydrated from localStorage
const initialState = {
  user: storage.get('user', null),
  cart: storage.get('cart', []),
  orders: storage.get('orders', []),
  products: [...products],
  searchQuery: '',
  activeCategory: 'Todos',
  sortBy: 'featured',
  currentRoute: window.location.hash || '#/',
  toast: null,
  cartOpen: false
};

// Subscriptions for state changes (reactive pattern)
const listeners = new Set();

export const state = new Proxy(initialState, {
  set(target, property, value) {
    target[property] = value;
    
    // Auto-persist specific properties to localStorage
    if (property === 'user') {
      storage.set('user', value);
    } else if (property === 'cart') {
      storage.set('cart', value);
    } else if (property === 'orders') {
      storage.set('orders', value);
    }

    // Trigger all listeners on change
    listeners.forEach(callback => callback(property, value));
    return true;
  }
});

export const store = {
  subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },
  
  showToast(message, type = 'success') {
    state.toast = { id: Date.now(), message, type };
  },

  clearToast() {
    state.toast = null;
  }
};
