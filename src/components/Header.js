/* ============================================
   Header Component
   ============================================ */

import { state } from '../store/state.js';
import { cartStore } from '../store/cart.js';
import { authStore } from '../store/auth.js';

export const Header = {
  render() {
    const cartCount = cartStore.getCartCount();
    const user = state.user;
    const currentHash = state.currentRoute;
    const isMobileMenuOpen = state.mobileMenuOpen;

    return `
      <header class="header">
        <div class="header__inner">
          <!-- Logo -->
          <a href="#/" class="header__logo">
            <img src="/assets/logo.png" alt="Indupack Logo" />
            <span class="header__logo-text">INDUPACK</span>
          </a>

          <!-- Nav Links -->
          <nav class="header__nav ${isMobileMenuOpen ? 'header__nav--mobile-open' : ''}">
            <a href="#/" class="header__nav-link ${currentHash === '#/' ? 'header__nav-link--active' : ''}">Inicio</a>
            <a href="#/catalog" class="header__nav-link ${currentHash.startsWith('#/catalog') ? 'header__nav-link--active' : ''}">Productos</a>
            <a href="#/profile" class="header__nav-link ${currentHash.startsWith('#/profile') ? 'header__nav-link--active' : ''}">Mi Cuenta</a>
          </nav>

          <!-- Action Buttons -->
          <div class="header__actions">
            <!-- Search Toggle (navigates to catalog) -->
            <a href="#/catalog" class="header__action-btn" title="Buscar productos">
              <span class="search-toggle-icon">🔍</span>
            </a>

            <!-- Cart Trigger -->
            <button id="cart-trigger-btn" class="header__action-btn" title="Ver carrito">
              <span>🛒</span>
              ${cartCount > 0 ? `<span class="header__cart-badge">${cartCount}</span>` : ''}
            </button>

            <!-- User Menu -->
            <div style="position: relative;">
              ${user 
                ? `<div id="user-avatar-btn" class="header__user-avatar" title="${user.name}">
                     ${user.name.charAt(0).toUpperCase()}
                   </div>
                   <div id="user-dropdown-menu" class="user-dropdown">
                     <a href="#/profile" class="user-dropdown__item">
                       <span>👤</span> Mi Perfil
                     </a>
                     <div id="logout-menu-btn" class="user-dropdown__item user-dropdown__item--danger">
                       <span>🚪</span> Cerrar Sesión
                     </div>
                   </div>`
                : `<a href="#/login" class="btn btn--primary btn--sm">Iniciar Sesión</a>`
              }
            </div>

            <!-- Mobile Toggle -->
            <button id="mobile-toggle-btn" class="header__menu-toggle">
              <span>☰</span>
            </button>
          </div>
        </div>
      </header>
    `;
  },

  init() {
    // 1. Cart Drawer Trigger
    const cartBtn = document.getElementById('cart-trigger-btn');
    if (cartBtn) {
      cartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.cartOpen = true;
      });
    }

    // 2. User Dropdown Menu Toggle
    const avatarBtn = document.getElementById('user-avatar-btn');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    if (avatarBtn && dropdownMenu) {
      avatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('user-dropdown--open');
      });
    }

    // 3. Logout handler
    const logoutBtn = document.getElementById('logout-menu-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        authStore.logout();
        window.location.hash = '#/';
      });
    }

    // 4. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-toggle-btn');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        state.mobileMenuOpen = !state.mobileMenuOpen;
      });
    }

    // Close menus when clicking outside
    document.addEventListener('click', () => {
      const openDropdown = document.querySelector('.user-dropdown--open');
      if (openDropdown) {
        openDropdown.classList.remove('user-dropdown--open');
      }
    });
  }
};
