/* ============================================
   Splash Screen Component
   ============================================ */

export const Splash = {
  render() {
    const isFirstVisit = !localStorage.getItem('indupack_visited');
    if (!isFirstVisit) return '';

    return `
      <div id="splash-screen" class="splash flex flex-col items-center justify-center" style="
        position: fixed;
        inset: 0;
        background: var(--color-dark);
        z-index: var(--z-splash);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 1s ease-out, visibility 1s;
      ">
        <div class="splash__content flex flex-col items-center gap-4 text-center">
          <img src="/assets/logo.png" alt="Indupack Logo" class="splash__logo animate-float" style="
            width: 140px;
            height: 140px;
            object-fit: contain;
            filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.4));
            animation: fadeInZoom 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          " />
          <h1 style="
            font-size: var(--font-size-3xl);
            font-weight: var(--font-weight-bold);
            color: var(--color-white);
            margin-top: var(--space-4);
            letter-spacing: var(--letter-spacing-wide);
          ">
            INDUPACK
          </h1>
          <p class="text-muted" style="font-size: var(--font-size-sm); max-width: 250px;">
            Soluciones Premium en Empaque Industrial
          </p>
          <div class="loader mt-6" style="border-top-color: var(--color-primary-400);"></div>
        </div>
      </div>
    `;
  },

  init() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;

    // Lock body scrolling during splash
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      splash.style.opacity = '0';
      splash.style.visibility = 'hidden';
      document.body.style.overflow = '';
      
      // Mark as visited so it doesn't show up again
      localStorage.setItem('indupack_visited', 'true');

      // Remove from DOM after transition
      setTimeout(() => splash.remove(), 1000);
    }, 2800);
  }
};
