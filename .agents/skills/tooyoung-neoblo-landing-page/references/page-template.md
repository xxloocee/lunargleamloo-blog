# Page Template

Complete single-file HTML landing page template using the Neoblo design system. Copy-paste into `index.html` and open in a browser — works immediately with no build step.

## Customization Checklist

Before deploying, replace these placeholders:

- [ ] `MyApp` — your app name (nav logo, `<title>`, footer)
- [ ] `Your headline here` — hero title
- [ ] `One-sentence value proposition` — hero description
- [ ] `#install-link` / `#source-link` — hero button URLs
- [ ] Feature card titles, descriptions, and icons (6 cards)
- [ ] CTA heading and description
- [ ] Footer links (privacy, GitHub, license)
- [ ] OG/Twitter meta tags (title, description, image URL)
- [ ] Favicon paths
- [ ] `--neo-*` design tokens — adjust colors, border-width, radius, shadow offsets if needed
- [ ] `--deco-*` decoration colors — change to match your brand
- [ ] Google Fonts `Inter` + `Noto Serif SC` — swap or remove if using system fonts

## Full Template

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MyApp — Your headline here.</title>
    <meta
      name="description"
      content="One-sentence value proposition for SEO."
    />

    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- OG Meta Tags -->
    <meta property="og:title" content="MyApp — Your headline here." />
    <meta property="og:description" content="One-sentence value proposition." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://example.com/og-image.png" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="MyApp — Your headline here." />
    <meta
      name="twitter:description"
      content="One-sentence value proposition."
    />
    <meta name="twitter:image" content="https://example.com/og-image.png" />

    <!-- FOUC prevention: resolve theme before first paint -->
    <script>
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        } else if (
          window.matchMedia("(prefers-color-scheme: light)").matches
        ) {
          document.documentElement.setAttribute("data-theme", "light");
        }
      })();
    </script>

    <!-- Google Fonts: Inter + Noto Serif SC -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Serif+SC:wght@400;700;900&display=swap"
      rel="stylesheet"
    />

    <style>
      /* ============================================================
         Design Tokens  (--neo-* system)
         ============================================================ */
      :root {
        /* Surfaces */
        --neo-bg: #F5F0E8;
        --neo-surface: #FFFFFF;
        --neo-surface-alt: #FFF8E7;

        /* Typography */
        --text-primary: #1a1a1a;
        --text-secondary: #4a4a4a;
        --text-tertiary: #7a7a7a;

        /* Accents */
        --accent-orange: #F97C00;
        --accent-green: #3ECFA0;
        --accent-blue: #0057FF;
        --accent-teal: #00BFA5;
        --accent-title: #00C0A6;

        /* Borders */
        --neo-border-color: #000000;
        --neo-border-width: 2.5px;
        --neo-border: 2.5px solid #000000;
        --neo-radius: 10px;

        /* Shadows — hard offset, zero blur */
        --neo-shadow-sm: 3px 3px 0px #000000;
        --neo-shadow: 5px 5px 0px #000000;
        --neo-shadow-lg: 8px 8px 0px #000000;
        --neo-shadow-pressed: 2px 2px 0px #000000;

        /* Decoration colors */
        --deco-1: #F97C00;
        --deco-2: #3ECFA0;
        --deco-3: #0057FF;
        --deco-4: #00BFA5;
        --deco-5: #00C0A6;
      }

      [data-theme="dark"] {
        --neo-bg: #1a1a1a;
        --neo-surface: #2a2a2a;
        --neo-surface-alt: #333333;

        --text-primary: #f0f0f0;
        --text-secondary: #b0b0b0;
        --text-tertiary: #808080;

        --neo-border-color: #e0e0e0;
        --neo-border: 2.5px solid #e0e0e0;

        --neo-shadow-sm: 3px 3px 0px rgba(255, 255, 255, 0.15);
        --neo-shadow: 5px 5px 0px rgba(255, 255, 255, 0.15);
        --neo-shadow-lg: 8px 8px 0px rgba(255, 255, 255, 0.15);
        --neo-shadow-pressed: 2px 2px 0px rgba(255, 255, 255, 0.15);
      }

      /* ============================================================
         Reset & Base
         ============================================================ */
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        min-height: 100vh;
        overflow: hidden;
        background: var(--neo-bg);
        color: var(--text-primary);
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
          sans-serif;
        line-height: 1.7;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .container {
        max-width: 72rem;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      a {
        color: var(--accent-blue);
        text-decoration: none;
        transition: color 0.2s ease;
      }

      a:hover {
        color: var(--accent-orange);
      }

      /* ============================================================
         Scrollbar — only on #main-scroll
         ============================================================ */
      #main-scroll::-webkit-scrollbar {
        width: 8px;
      }
      #main-scroll::-webkit-scrollbar-track {
        background: var(--neo-bg);
      }
      #main-scroll::-webkit-scrollbar-thumb {
        background: var(--neo-border-color);
        border-radius: 4px;
        opacity: 0.4;
      }
      #main-scroll::-webkit-scrollbar-thumb:hover {
        opacity: 0.6;
      }
      #main-scroll {
        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: var(--neo-border-color) var(--neo-bg);
      }

      /* ============================================================
         Neo Components
         ============================================================ */
      .neo-card {
        background: var(--neo-surface);
        border: var(--neo-border);
        border-radius: var(--neo-radius);
        box-shadow: var(--neo-shadow);
      }

      .neo-hover {
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .neo-hover:hover {
        transform: translate(-2px, -2px);
        box-shadow: var(--neo-shadow-lg);
      }

      /* ============================================================
         Button System
         ============================================================ */
      .neo-btn {
        display: inline-block;
        padding: 0.625rem 1.5rem;
        background: var(--accent-orange);
        color: var(--text-primary);
        font-weight: 700;
        font-size: 1rem;
        font-family: inherit;
        border: var(--neo-border);
        border-radius: 999px;
        box-shadow: var(--neo-shadow-sm);
        cursor: pointer;
        transition: transform 0.1s ease, box-shadow 0.1s ease;
        text-decoration: none;
        text-align: center;
      }
      .neo-btn:hover {
        transform: translate(-2px, -2px);
        box-shadow: var(--neo-shadow);
        color: var(--text-primary);
      }
      .neo-btn:active {
        transform: translate(2px, 2px);
        box-shadow: var(--neo-shadow-pressed);
      }
      .neo-btn-primary {
        background: var(--accent-blue);
        color: #ffffff;
      }
      .neo-btn-primary:hover {
        color: #ffffff;
      }
      .neo-btn-outline {
        background: var(--neo-surface);
        color: var(--text-primary);
      }
      .neo-btn-lg {
        padding: 1rem 2.25rem;
        font-size: 1.125rem;
        box-shadow: var(--neo-shadow);
      }
      .neo-btn-lg:hover {
        box-shadow: var(--neo-shadow-lg);
      }

      /* ============================================================
         Header
         ============================================================ */
      .site-header {
        background: var(--neo-surface);
        border-bottom: var(--neo-border);
        box-shadow: 0 4px 0px var(--neo-border-color);
        padding: 0.75rem 1rem;
        z-index: 50;
      }
      .header-inner {
        max-width: 72rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .header-logo {
        font-family: "Noto Serif SC", serif;
        font-size: 1.25rem;
        font-weight: 800;
        color: var(--accent-title);
        text-decoration: none;
      }
      .header-logo:hover {
        color: var(--accent-title);
      }
      .header-nav {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .nav-link {
        font-size: 0.875rem;
        font-weight: 600;
        padding: 0.375rem 0.75rem;
        border-radius: 0.5rem;
        color: var(--text-primary);
        text-decoration: none;
        transition: background 0.15s ease;
      }
      .nav-link:hover {
        background: var(--accent-orange);
        color: var(--text-primary);
      }
      .theme-toggle {
        margin-left: 0.5rem;
        width: 2.25rem;
        height: 2.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 0.875rem;
        font-weight: 700;
        border: var(--neo-border);
        background: var(--neo-surface-alt);
        cursor: pointer;
        transition: transform 0.1s ease, box-shadow 0.1s ease;
      }
      .theme-toggle:hover {
        transform: translate(-1px, -1px);
        box-shadow: var(--neo-shadow-sm);
      }
      .theme-toggle:active {
        transform: translate(1px, 1px);
        box-shadow: none;
      }

      /* ============================================================
         Hero
         ============================================================ */
      .hero {
        padding: 5rem 0 4rem;
        text-align: center;
      }
      .hero-title {
        font-size: clamp(2.25rem, 6vw, 4.25rem);
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: -0.02em;
        margin-bottom: 1.5rem;
        color: var(--text-primary);
      }
      .hero-desc {
        font-size: 1.125rem;
        color: var(--text-secondary);
        max-width: 34rem;
        margin: 0 auto 2.5rem;
        line-height: 1.7;
      }
      .hero-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      /* ============================================================
         Features
         ============================================================ */
      .features {
        padding: 5rem 0;
        background: var(--neo-surface);
        border-top: var(--neo-border);
        border-bottom: var(--neo-border);
      }
      .section-title {
        font-size: 2.5rem;
        font-weight: 800;
        text-align: center;
        margin-bottom: 3rem;
        letter-spacing: -0.02em;
        color: var(--text-primary);
      }
      .features-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
      }
      .feature-card {
        padding: 1.75rem 1.5rem;
        background: var(--neo-surface);
        border: var(--neo-border);
        border-radius: var(--neo-radius);
        box-shadow: var(--neo-shadow);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .feature-card:hover {
        transform: translate(-2px, -2px);
        box-shadow: var(--neo-shadow-lg);
      }
      /* Card accent stripe via decoration colors */
      .feature-card:nth-child(1) { border-top: 4px solid var(--deco-1); }
      .feature-card:nth-child(2) { border-top: 4px solid var(--deco-2); }
      .feature-card:nth-child(3) { border-top: 4px solid var(--deco-3); }
      .feature-card:nth-child(4) { border-top: 4px solid var(--deco-4); }
      .feature-card:nth-child(5) { border-top: 4px solid var(--deco-5); }
      .feature-card:nth-child(6) { border-top: 4px solid var(--deco-1); }

      .feature-icon {
        margin-bottom: 0.875rem;
        width: 3.5rem;
        height: 3.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: var(--neo-border);
        border-radius: var(--neo-radius);
        background: var(--neo-surface-alt);
        box-shadow: var(--neo-shadow-sm);
      }
      .feature-icon svg {
        width: 1.75rem;
        height: 1.75rem;
      }
      .feature-card h3 {
        font-size: 1.125rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      .feature-card p {
        font-size: 0.875rem;
        color: var(--text-secondary);
        line-height: 1.65;
      }

      /* ============================================================
         CTA Section
         ============================================================ */
      .cta {
        padding: 5rem 0;
        text-align: center;
        background: var(--accent-blue);
        color: #ffffff;
        border-top: var(--neo-border);
        border-bottom: var(--neo-border);
      }
      .cta h2 {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 0.75rem;
        letter-spacing: -0.02em;
      }
      .cta p {
        font-size: 1.125rem;
        opacity: 0.9;
        margin-bottom: 2.25rem;
      }
      .cta .neo-btn {
        background: var(--accent-orange);
        color: var(--text-primary);
        font-size: 1.25rem;
        padding: 1.125rem 2.5rem;
      }

      /* ============================================================
         Footer
         ============================================================ */
      .site-footer {
        background: var(--neo-surface);
        border-top: var(--neo-border);
        padding: 1.5rem 1rem;
      }
      .footer-inner {
        max-width: 72rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.875rem;
        color: var(--text-tertiary);
      }
      .footer-links {
        display: flex;
        gap: 1.5rem;
      }
      .footer-links a {
        font-weight: 600;
        color: var(--text-tertiary);
        transition: color 0.15s;
      }
      .footer-links a:hover {
        color: var(--accent-orange);
      }

      /* ============================================================
         Back-to-Top Button
         ============================================================ */
      .back-to-top {
        position: fixed;
        right: 1.5rem;
        bottom: 5rem;
        z-index: 50;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        background: var(--neo-surface);
        border: var(--neo-border);
        box-shadow: var(--neo-shadow-sm);
        color: var(--text-primary);
        opacity: 0;
        visibility: hidden;
        transform: translateY(12px);
        transition: opacity 0.3s, visibility 0.3s, transform 0.3s,
          box-shadow 0.15s;
      }
      .back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .back-to-top:hover {
        transform: translate(-2px, -2px);
        box-shadow: var(--neo-shadow);
        color: var(--accent-blue);
      }
      .back-to-top:active {
        transform: translate(1px, 1px);
        box-shadow: var(--neo-shadow-pressed);
      }

      /* ============================================================
         Decoration System
         ============================================================ */
      .page-decorations {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
      }
      .deco-zone {
        position: absolute;
        top: 0;
        bottom: 0;
        overflow: hidden;
      }
      /* Left/right gutters: viewport half minus content half-width
         (max-width 72rem / 2 = 36rem + 1rem gap) */
      .deco-left {
        left: 0;
        width: calc(50% - 37rem);
      }
      .deco-right {
        right: 0;
        width: calc(50% - 37rem);
      }
      .deco-zone .deco-item {
        position: absolute;
        opacity: 0.8;
      }
      @media (max-width: 1280px) {
        .page-decorations {
          display: none;
        }
      }

      /* ============================================================
         Responsive
         ============================================================ */
      @media (max-width: 768px) {
        .features-grid {
          grid-template-columns: 1fr;
        }
        .hero {
          padding: 3rem 0 2.5rem;
        }
        .hero-title {
          font-size: 2rem;
          letter-spacing: -0.01em;
        }
        .hero-desc {
          font-size: 1rem;
        }
        .section-title {
          font-size: 1.75rem;
        }
        .cta h2 {
          font-size: 1.75rem;
        }
        .header-nav .nav-link {
          display: none;
        }
        .footer-inner {
          flex-direction: column;
          gap: 0.75rem;
          text-align: center;
        }
      }

      /* ============================================================
         Reduced Motion
         ============================================================ */
      @media (prefers-reduced-motion: reduce) {
        .neo-hover:hover,
        .feature-card:hover {
          transform: none;
        }
        .neo-btn:hover,
        .neo-btn:active {
          transform: none;
        }
        .back-to-top.visible {
          transform: none;
        }
      }
    </style>
  </head>

  <body>
    <!-- ============================================================
         Shell: full-viewport flex column, body overflow hidden
         ============================================================ -->
    <div style="height:100vh;display:flex;flex-direction:column;overflow:hidden">

      <!-- Header -->
      <header class="site-header" style="flex-shrink:0">
        <div class="header-inner">
          <a href="/" class="header-logo">MyApp</a>
          <div class="header-nav">
            <a href="#features" class="nav-link">Features</a>
            <a href="#cta" class="nav-link">Get Started</a>
            <a href="https://github.com/yourname/yourapp" target="_blank" class="nav-link">GitHub</a>
            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme"></button>
          </div>
        </div>
      </header>

      <!-- Scrollable content area -->
      <div id="main-scroll" style="flex:1;overflow-y:auto">
        <div style="position:relative;min-height:100%">

          <!-- Decoration zones (PC margins only) -->
          <div class="page-decorations" aria-hidden="true">
            <div class="deco-zone deco-left"></div>
            <div class="deco-zone deco-right"></div>
          </div>

          <!-- Page content -->
          <main>

            <!-- Hero -->
            <section class="hero">
              <div class="container">
                <h1 class="hero-title">Your headline here.</h1>
                <p class="hero-desc">
                  One-sentence value proposition that explains what your product
                  does and why people should care.
                </p>
                <div class="hero-actions">
                  <a href="#install-link" class="neo-btn neo-btn-primary neo-btn-lg">
                    Get Started
                  </a>
                  <a href="#source-link" class="neo-btn neo-btn-outline neo-btn-lg">
                    Source Code
                  </a>
                </div>
              </div>
            </section>

            <!-- Features -->
            <section class="features" id="features">
              <div class="container">
                <h2 class="section-title">Features</h2>
                <div class="features-grid">

                  <div class="feature-card">
                    <div class="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
                      </svg>
                    </div>
                    <h3>Feature One</h3>
                    <p>Description of what this feature does and why it matters.</p>
                  </div>

                  <div class="feature-card">
                    <div class="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>
                      </svg>
                    </div>
                    <h3>Feature Two</h3>
                    <p>Description of what this feature does and why it matters.</p>
                  </div>

                  <div class="feature-card">
                    <div class="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                      </svg>
                    </div>
                    <h3>Feature Three</h3>
                    <p>Description of what this feature does and why it matters.</p>
                  </div>

                  <div class="feature-card">
                    <div class="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                    <h3>Feature Four</h3>
                    <p>Description of what this feature does and why it matters.</p>
                  </div>

                  <div class="feature-card">
                    <div class="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
                      </svg>
                    </div>
                    <h3>Feature Five</h3>
                    <p>Description of what this feature does and why it matters.</p>
                  </div>

                  <div class="feature-card">
                    <div class="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.73-12.73 1.41-1.41"/>
                      </svg>
                    </div>
                    <h3>Feature Six</h3>
                    <p>Description of what this feature does and why it matters.</p>
                  </div>

                </div>
              </div>
            </section>

            <!-- CTA -->
            <section class="cta" id="cta">
              <div class="container">
                <h2>Ready to get started?</h2>
                <p>Free, open-source, zero dependencies.</p>
                <a href="#install-link" class="neo-btn neo-btn-lg">Get MyApp</a>
              </div>
            </section>

          </main>
        </div>
      </div>

      <!-- Footer -->
      <footer class="site-footer" style="flex-shrink:0">
        <div class="footer-inner">
          <span>&copy; 2026 MyApp. All rights reserved.</span>
          <div class="footer-links">
            <a href="privacy.html">Privacy</a>
            <a href="https://github.com/yourname/yourapp" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://github.com/yourname/yourapp/blob/main/LICENSE">MIT License</a>
          </div>
        </div>
      </footer>

    </div>

    <!-- Back-to-top (listens on #main-scroll) -->
    <button id="back-to-top" class="back-to-top" aria-label="Back to top">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4L4 10.5H8.5V16H11.5V10.5H16L10 4Z" fill="currentColor"/>
      </svg>
    </button>

    <script>
      // ============================================================
      // Theme Toggle  (simple 2-state: light <-> dark)
      // ============================================================
      (function () {
        function applyIcon() {
          var btn = document.getElementById("theme-toggle");
          if (!btn) return;
          var theme = document.documentElement.getAttribute("data-theme");
          btn.textContent = theme === "dark" ? "\uD83C\uDF19" : "\u2600\uFE0F";
        }

        function toggleTheme() {
          var html = document.documentElement;
          var current = html.getAttribute("data-theme");
          var next = current === "dark" ? "light" : "dark";
          html.setAttribute("data-theme", next);
          localStorage.setItem("theme", next);
          applyIcon();
        }

        var btn = document.getElementById("theme-toggle");
        if (btn) btn.addEventListener("click", toggleTheme);

        applyIcon();
      })();

      // ============================================================
      // Back-to-Top  (watches #main-scroll)
      // ============================================================
      (function () {
        var btn = document.getElementById("back-to-top");
        var scroller = document.getElementById("main-scroll");
        if (!btn || !scroller) return;

        scroller.addEventListener(
          "scroll",
          function () {
            btn.classList.toggle("visible", scroller.scrollTop > 300);
          },
          { passive: true }
        );

        btn.addEventListener("click", function () {
          scroller.scrollTo({ top: 0, behavior: "smooth" });
        });
      })();

      // ============================================================
      // Decoration System  — renderDecorations()
      // Dynamically generates SVG shapes in page-margin gutters
      // based on content height.
      // ============================================================
      (function renderDecorations() {
        var SPACING = 400;
        var SHAPES = [
          '<path d="M50 5L56 28L76 16L64 38L92 36L63 52L74 82L54 62L50 96L46 62L26 82L37 52L8 36L36 38L24 16L44 28Z"/>',
          '<rect x="46" y="5" width="8" height="90" rx="4"/><rect x="46" y="5" width="8" height="90" rx="4" transform="rotate(60 50 50)"/><rect x="46" y="5" width="8" height="90" rx="4" transform="rotate(-60 50 50)"/><circle cx="50" cy="8" r="5"/><circle cx="50" cy="92" r="5"/><circle cx="86" cy="29" r="5"/><circle cx="14" cy="71" r="5"/><circle cx="86" cy="71" r="5"/><circle cx="14" cy="29" r="5"/>',
          '<ellipse cx="50" cy="64" rx="24" ry="22"/><circle cx="28" cy="36" r="11"/><circle cx="44" cy="24" r="10"/><circle cx="56" cy="24" r="10"/><circle cx="72" cy="36" r="11"/>',
          '<path d="M50 8C20 30 12 65 50 92C88 65 80 30 50 8Z"/>',
          '<circle cx="50" cy="28" r="15"/><circle cx="71" cy="43" r="15"/><circle cx="63" cy="68" r="15"/><circle cx="37" cy="68" r="15"/><circle cx="29" cy="43" r="15"/>'
        ];

        var leftZone = document.querySelector(".deco-left");
        var rightZone = document.querySelector(".deco-right");
        if (!leftZone || !rightZone) return;

        var scrollEl = document.getElementById("main-scroll");
        var contentHeight = scrollEl ? scrollEl.scrollHeight : 0;
        var perSide = Math.max(2, Math.ceil(contentHeight / SPACING));
        var total = perSide * 2;

        var leftHtml = "";
        var rightHtml = "";

        for (var i = 0; i < total; i++) {
          var s = (i * 137 + 53) % 100;
          var isLeft = i % 2 === 0;
          var top = 120 + Math.floor(i / 2) * SPACING + (s % 120);
          var offset = 5 + (s % 40);
          var rotation = (s * 37) % 360;
          var size = 80 + (s % 48);
          var colorIdx = ((i * 3 + 1) % 5) + 1;
          var shape = SHAPES[i % 5];
          var side = isLeft ? "left" : "right";

          var el =
            '<div class="deco-item" style="' +
            side + ":" + offset + "px;" +
            "top:" + top + "px;" +
            "transform:rotate(" + rotation + 'deg)">' +
            '<svg width="' + size + '" height="' + size +
            '" viewBox="0 0 100 100" fill="var(--deco-' + colorIdx + ')">' +
            shape +
            "</svg></div>";

          if (isLeft) leftHtml += el;
          else rightHtml += el;
        }

        leftZone.innerHTML = leftHtml;
        rightZone.innerHTML = rightHtml;
      })();
    </script>
  </body>
</html>
```
