/* ============================================
   INDUPACK — Simple SPA Hash Router
   ============================================ */

import { state } from '../store/state.js';

export const routes = {};

export const router = {
  on(path, handler) {
    routes[path] = handler;
  },

  resolve() {
    const hash = window.location.hash || '#/';
    state.currentRoute = hash;

    // Separate route and query/parameters
    let [routePath, queryString] = hash.split('?');
    
    // Find matching route by checking parameterized matches (e.g., #/product/:id)
    let handler = routes[routePath];
    let params = {};

    if (!handler) {
      // Check dynamic routes
      for (const pattern in routes) {
        if (pattern.includes('/:')) {
          const patternParts = pattern.split('/');
          const hashParts = routePath.split('/');

          if (patternParts.length === hashParts.length) {
            let match = true;
            for (let i = 0; i < patternParts.length; i++) {
              if (patternParts[i].startsWith(':')) {
                params[patternParts[i].slice(1)] = hashParts[i];
              } else if (patternParts[i] !== hashParts[i]) {
                match = false;
                break;
              }
            }
            if (match) {
              handler = routes[pattern];
              break;
            }
          }
        }
      }
    }

    if (handler) {
      // Parse query string if present
      const query = {};
      if (queryString) {
        new URLSearchParams(queryString).forEach((val, key) => {
          query[key] = val;
        });
      }

      handler({ params, query });
    } else {
      console.warn(`No route handler defined for hash: ${hash}. Redirecting to home.`);
      window.location.hash = '#/';
    }
  },

  init() {
    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('load', () => this.resolve());
  },

  navigate(hash) {
    window.location.hash = hash;
  }
};
