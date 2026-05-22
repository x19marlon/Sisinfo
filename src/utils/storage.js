/* ============================================
   LocalStorage Manager Wrapper
   ============================================ */

const PREFIX = 'indupack_';

export const storage = {
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(PREFIX + key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error reading key "${PREFIX + key}" from localStorage:`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing key "${PREFIX + key}" to localStorage:`, error);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(PREFIX + key);
      return true;
    } catch (error) {
      console.error(`Error removing key "${PREFIX + key}" from localStorage:`, error);
      return false;
    }
  },

  clear() {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(PREFIX))
        .forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Error clearing localStorage prefix keys:', error);
      return false;
    }
  }
};
