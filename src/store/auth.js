/* ============================================
   INDUPACK — Authentication Actions
   ============================================ */

import { state, store } from './state.js';
import { storage } from '../utils/storage.js';

export const authStore = {
  login(email, password) {
    const users = storage.get('registered_users', []);
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const { password, ...userWithoutPassword } = user;
      state.user = userWithoutPassword;
      store.showToast(`¡Bienvenido de nuevo, ${user.name}!`);
      return { success: true };
    }

    // Default admin user for demo purposes if no users are registered yet
    if (email === 'demo@indupack.com' && password === 'demo123') {
      const demoUser = { name: 'Marlon Demo', email: 'demo@indupack.com', address: 'Av. Industrial 123, Monterrey' };
      state.user = demoUser;
      store.showToast(`¡Bienvenido, Marlon!`);
      return { success: true };
    }

    return { success: false, error: 'Credenciales inválidas. Intente con el usuario demo: demo@indupack.com / demo123' };
  },

  register(name, email, password, address = '') {
    const users = storage.get('registered_users', []);
    
    if (users.some(u => u.email === email) || email === 'demo@indupack.com') {
      return { success: false, error: 'El correo ya está registrado.' };
    }

    const newUser = { name, email, password, address };
    users.push(newUser);
    storage.set('registered_users', users);

    // Auto-login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    state.user = userWithoutPassword;
    store.showToast('¡Registro exitoso! Sesión iniciada.');
    return { success: true };
  },

  logout() {
    state.user = null;
    store.showToast('Sesión cerrada correctamente.', 'info');
  },

  updateProfile(name, address) {
    if (!state.user) return { success: false, error: 'No hay usuario autenticado.' };
    
    // Update active user state
    const updatedUser = { ...state.user, name, address };
    state.user = updatedUser;

    // Update in stored registered users list
    const users = storage.get('registered_users', []);
    const index = users.findIndex(u => u.email === state.user.email);
    if (index > -1) {
      users[index].name = name;
      users[index].address = address;
      storage.set('registered_users', users);
    }

    store.showToast('Perfil actualizado correctamente.');
    return { success: true };
  }
};
