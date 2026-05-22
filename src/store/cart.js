/* ============================================
   INDUPACK — Cart Actions
   ============================================ */

import { state, store } from './state.js';

export const cartStore = {
  addToCart(product, quantity = 1) {
    const cart = [...state.cart];
    const existingIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    state.cart = cart;
    store.showToast(`¡Se agregó ${product.name} al carrito!`);
  },

  removeFromCart(productId) {
    const item = state.cart.find(i => i.product.id === productId);
    state.cart = state.cart.filter(item => item.product.id !== productId);
    if (item) {
      store.showToast(`¡Se eliminó ${item.product.name} del carrito!`, 'info');
    }
  },

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const cart = [...state.cart];
    const index = cart.findIndex(item => item.product.id === productId);

    if (index > -1) {
      cart[index].quantity = quantity;
      state.cart = cart;
    }
  },

  clearCart() {
    state.cart = [];
  },

  getCartTotal() {
    return state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },

  getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  }
};
