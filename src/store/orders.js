/* ============================================
   INDUPACK — Orders Actions
   ============================================ */

import { state, store } from './state.js';
import { cartStore } from './cart.js';
import { generateId } from '../utils/helpers.js';

export const ordersStore = {
  createOrder(shippingInfo) {
    if (state.cart.length === 0) {
      return { success: false, error: 'El carrito está vacío.' };
    }

    const newOrder = {
      id: generateId('IND'),
      date: new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      items: [...state.cart],
      total: cartStore.getCartTotal(),
      shippingInfo,
      status: 'Procesando'
    };

    // Save order in state and persist
    const orders = [...state.orders];
    orders.unshift(newOrder);
    state.orders = orders;

    // Clear cart after checkout
    cartStore.clearCart();
    store.showToast('¡Compra realizada con éxito!');
    return { success: true, order: newOrder };
  },

  getUserOrders() {
    return state.orders;
  }
};
