# Component Catalog

Complete HTML + CSS for every Neoblo component. Each component includes all states (default, hover, active, disabled) and responsive behavior. All CSS variables use the `--neo-*` prefix system defined in `neo.css`.

## Design Tokens

### CSS Variables Reference

```css
:root {
  /* Backgrounds */
  --neo-bg: #F5F0E8;
  --neo-surface: #FFFFFF;
  --neo-surface-alt: #FFF8E7;

  /* Border system */
  --neo-border-color: #000000;
  --neo-border-width: 2.5px;
  --neo-border: 2.5px solid #000000;
  --neo-radius: 10px;

  /* Shadows — hard offset, zero blur */
  --neo-shadow-sm: 3px 3px 0px #000000;
  --neo-shadow: 5px 5px 0px #000000;
  --neo-shadow-lg: 8px 8px 0px #000000;
  --neo-shadow-pressed: 2px 2px 0px #000000;

  /* Text colors */
  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --text-tertiary: #7a7a7a;

  /* Accent colors */
  --accent-orange: #F97C00;
  --accent-green: #3ECFA0;
  --accent-blue: #0057FF;
  --accent-teal: #00BFA5;
  --accent-title: #00C0A6;
}
```

### Typography

- **Body font**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Heading font**: `'Noto Serif SC', serif`
- **Monospace**: `'JetBrains Mono', 'Fira Code', monospace`
- **Body line-height**: 1.7

## Cards

### `.neo-card` — Standard Card

10px radius, medium shadow.

```css
.neo-card {
  background: var(--neo-surface);
  border: var(--neo-border);
  border-radius: var(--neo-radius); /* 10px */
  box-shadow: var(--neo-shadow); /* 5px 5px */
}
```

### `.neo-card-sm` — Small Card

8px radius, small shadow.

```css
.neo-card-sm {
  background: var(--neo-surface);
  border: var(--neo-border);
  border-radius: 8px;
  box-shadow: var(--neo-shadow-sm); /* 3px 3px */
}
```

### `.neo-card-lg` — Large Card

14px radius, large shadow.

```css
.neo-card-lg {
  background: var(--neo-surface);
  border: var(--neo-border);
  border-radius: 14px;
  box-shadow: var(--neo-shadow-lg); /* 8px 8px */
}
```

### `.neo-hover` — Lift Effect (composable)

Add to any card or element for the signature lift-on-hover interaction.

```css
.neo-hover {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.neo-hover:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--neo-shadow-lg); /* 8px 8px */
}
```

```html
<div class="neo-card neo-hover">
  <h3>Hoverable card</h3>
  <p>Lifts up-left on hover.</p>
</div>
```

## Buttons

### `.neo-btn` — Base Button

Pill-shaped, orange background, lift/push animation.

```css
.neo-btn {
  display: inline-block;
  padding: 0.625rem 1.5rem;
  background: var(--accent-orange);
  color: var(--text-primary);
  font-weight: 700;
  border: var(--neo-border);
  border-radius: 999px;
  box-shadow: var(--neo-shadow-sm); /* 3px 3px */
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  text-decoration: none;
  text-align: center;
}
.neo-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--neo-shadow); /* 5px 5px */
  color: var(--text-primary);
}
.neo-btn:active {
  transform: translate(2px, 2px);
  box-shadow: var(--neo-shadow-pressed); /* 2px 2px */
}
```

```html
<a href="#" class="neo-btn">Get Started</a>
```

### `.neo-btn-primary` — Primary Button

Blue background, white text. Combine with `.neo-btn`.

```css
.neo-btn-primary {
  background: var(--accent-blue);
  color: #ffffff;
}
.neo-btn-primary:hover {
  color: #ffffff;
}
```

```html
<a href="#" class="neo-btn neo-btn-primary">Download</a>
```

### Button States Summary

| State    | Transform               | Shadow                   |
| -------- | ----------------------- | ------------------------ |
| Default  | none                    | `--neo-shadow-sm` (3px)  |
| Hover    | `translate(-2px, -2px)` | `--neo-shadow` (5px)     |
| Active   | `translate(2px, 2px)`   | `--neo-shadow-pressed`   |
| Disabled | none + `opacity: 0.5`   | `--neo-shadow-sm`        |

## Badges & Tags

### `.neo-badge`

Pill-shaped, orange background, 2px border, 0.75rem font.

```css
.neo-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.6rem;
  background: var(--accent-orange);
  color: var(--text-primary);
  border: 2px solid var(--neo-border-color);
  border-radius: 999px;
}
```

### `.neo-tag`

Pill-shaped, surface-alt background, 1.5px border, 0.7rem font.

```css
.neo-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.15rem 0.55rem;
  background: var(--neo-surface-alt);
  color: var(--text-secondary);
  border: 1.5px solid var(--neo-border-color);
  border-radius: 999px;
}
```

```html
<span class="neo-badge">New</span>
<span class="neo-tag">Astro</span>
```

## Navigation

### Header

Non-sticky (`shrink-0`), surface background, bottom border with hard box-shadow line. Max-width `max-w-6xl`. Nav links highlight with `--accent-orange` on hover.

```html
<header
  class="shrink-0 z-50 px-4 py-3"
  style="background: var(--neo-surface); border-bottom: var(--neo-border); box-shadow: 0 4px 0px var(--neo-border-color);"
>
  <nav class="max-w-6xl mx-auto flex items-center justify-between">
    <a
      href="/"
      class="text-lg font-extrabold"
      style="font-family: 'Noto Serif SC', serif; color: var(--accent-title);"
    >
      Site Title
    </a>

    <!-- Desktop nav -->
    <div class="hidden md:flex items-center gap-1">
      <a href="/features" class="nav-link text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors" style="color: var(--text-primary);">Features</a>
      <a href="/about" class="nav-link text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors" style="color: var(--text-primary);">About</a>
      <!-- Dark mode toggle -->
      <button
        class="ml-2 w-9 h-9 flex items-center justify-center rounded-full font-bold text-sm transition-colors"
        style="border: var(--neo-border); background: var(--neo-surface-alt);"
        aria-label="Toggle dark mode"
      >🌓</button>
    </div>
  </nav>
</header>
```

```css
.nav-link:hover {
  background: var(--accent-orange);
}
```

### Mobile: Toggle Menu

```html
<!-- Mobile menu button -->
<button
  id="mobile-menu-toggle"
  class="w-9 h-9 flex items-center justify-center rounded-full text-xl font-bold"
  style="border: var(--neo-border); background: var(--neo-surface-alt);"
  aria-label="Open menu"
>☰</button>

<!-- Mobile menu panel (hidden by default) -->
<div id="mobile-menu" class="hidden md:hidden mt-3 pb-2 pt-3" style="border-top: var(--neo-border);">
  <a href="/features" class="block py-2 px-3 text-sm font-semibold rounded-lg" style="color: var(--text-primary);">Features</a>
  <a href="/about" class="block py-2 px-3 text-sm font-semibold rounded-lg" style="color: var(--text-primary);">About</a>
</div>
```

## Hero Section

### Standard Hero

Centered text inside a `.neo-card` wrapper. Uses `.neo-btn` for CTA.

```html
<section class="hero" style="padding: 80px 0 60px; text-align: center; background: var(--neo-bg);">
  <div class="max-w-6xl mx-auto px-4">
    <div class="neo-card" style="padding: 48px 32px;">
      <span class="neo-badge" style="margin-bottom: 24px;">Open Source</span>
      <h1 class="hero-title" style="font-family: 'Noto Serif SC', serif; font-size: clamp(36px, 6vw, 68px); font-weight: 700; line-height: 1.1; letter-spacing: -2px; margin-bottom: 24px; color: var(--text-primary);">
        Your headline here.
      </h1>
      <p style="font-size: 18px; color: var(--text-secondary); max-width: 540px; margin: 0 auto 40px; line-height: 1.7;">
        One-sentence value proposition.
      </p>
      <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <a href="#" class="neo-btn neo-btn-primary">Primary CTA</a>
        <a href="#" class="neo-btn">Secondary CTA</a>
      </div>
    </div>
  </div>
</section>
```

## Feature Cards

### Standard Feature Card Grid

```html
<div class="features-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
  <div class="neo-card neo-hover" style="padding: 28px 24px;">
    <div class="feature-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </div>
    <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Feature Title</h3>
    <p style="font-size: 14px; color: var(--text-secondary); opacity: 0.8; line-height: 1.65;">Feature description.</p>
  </div>
  <!-- Repeat for each card -->
</div>
```

### Icon Container

```css
.feature-icon {
  margin-bottom: 14px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--neo-border);
  border-radius: var(--neo-radius);
  background: var(--neo-surface);
  box-shadow: var(--neo-shadow-sm);
}
.feature-icon svg {
  width: 28px;
  height: 28px;
}
```

Icons use Feather icon style: `stroke="currentColor"`, `stroke-width="2.5"`, no `fill`. They inherit text color and scale cleanly.

### Responsive: Stack on Mobile

```css
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
```

## Demo Window

Browser window mockup with macOS traffic light controls.

```html
<section style="padding: 40px 0 80px;">
  <div class="max-w-6xl mx-auto px-4">
    <div class="neo-card-lg" style="overflow: hidden; background: #1a1a1a;">
      <div style="display: flex; align-items: center; gap: 8px; padding: 14px 16px; background: #2d2d2d; border-bottom: var(--neo-border);">
        <span style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.3); background: #ff5f57;"></span>
        <span style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.3); background: #febc2e;"></span>
        <span style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.3); background: #28c840;"></span>
        <span style="flex: 1; text-align: center; font-size: 13px; font-weight: 700; color: #888; font-family: 'JetBrains Mono', monospace; margin-right: 60px;">App Name</span>
      </div>
      <img src="demo.gif" alt="Demo" style="display: block; width: 100%;" loading="lazy" />
    </div>
  </div>
</section>
```

## Footer

Non-sticky (`shrink-0`), surface background, top border, `--text-tertiary` text color.

```html
<footer
  class="shrink-0 px-4 py-6"
  style="background: var(--neo-surface); border-top: var(--neo-border);"
>
  <div
    class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
    style="color: var(--text-tertiary);"
  >
    <p>&copy; 2026 AppName. All rights reserved.</p>
    <div class="flex items-center gap-4">
      <a href="/rss.xml" target="_blank" class="font-semibold hover:opacity-80">RSS</a>
      <a href="https://github.com/..." target="_blank" rel="noopener noreferrer" class="font-semibold hover:opacity-80">GitHub</a>
      <a href="mailto:hello@example.com" class="font-semibold hover:opacity-80">Email</a>
    </div>
  </div>
</footer>
```

## Section Title (Shared)

```css
.section-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
  letter-spacing: -1px;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
  }
}
```

Optional subtitle:

```css
.section-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  text-align: center;
  max-width: 560px;
  margin: -32px auto 48px;
  line-height: 1.7;
}
```

## CTA Section

Full-width colored call-to-action.

```html
<section style="padding: 80px 0; text-align: center; background: var(--accent-blue); color: #fff; border-top: var(--neo-border); border-bottom: var(--neo-border);">
  <div class="max-w-6xl mx-auto px-4">
    <h2 style="font-family: 'Noto Serif SC', serif; font-size: 40px; font-weight: 700; margin-bottom: 12px; letter-spacing: -1px;">Ready to get started?</h2>
    <p style="font-size: 18px; opacity: 0.9; margin-bottom: 36px;">Free, open-source, zero dependencies.</p>
    <a href="#" class="neo-btn" style="background: var(--accent-orange); color: #fff; font-size: 20px; padding: 18px 40px;">Get AppName</a>
  </div>
</section>
```

## Prose / Article Content

The `.prose` class provides full article typography using `--neo-*` tokens.

```css
.prose {
  color: var(--text-primary);
  max-width: 72ch;
}
.prose h1, .prose h2, .prose h3, .prose h4 {
  color: var(--text-primary);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.01em;
}
.prose h1 { font-size: 2.25rem; margin: 2rem 0 1rem; }
.prose h2 { font-size: 1.75rem; margin: 1.75rem 0 0.75rem; }
.prose h3 { font-size: 1.375rem; margin: 1.5rem 0 0.5rem; }

.prose p {
  margin: 1rem 0;
  color: var(--text-secondary);
}
.prose a {
  color: var(--accent-blue);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
.prose a:hover {
  background: var(--accent-orange);
  color: var(--text-primary);
}
.prose code {
  background: var(--accent-green);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  border: 1.5px solid var(--neo-border-color);
  font-size: 0.875em;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
.prose pre {
  background: var(--neo-surface-alt);
  border: var(--neo-border);
  border-radius: var(--neo-radius);
  padding: 1.25rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  box-shadow: var(--neo-shadow-sm);
}
.prose pre code {
  background: none;
  padding: 0;
  border: none;
}
.prose blockquote {
  border-left: 5px solid var(--accent-blue);
  background: var(--neo-surface-alt);
  padding: 1rem 1.5rem;
  border-radius: 0 var(--neo-radius) var(--neo-radius) 0;
  color: var(--text-secondary);
  font-style: italic;
  margin: 1.5rem 0;
}
.prose img {
  border: var(--neo-border);
  border-radius: var(--neo-radius);
  box-shadow: var(--neo-shadow);
  margin: 1.5rem 0;
}
.prose table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1.5rem 0;
  font-size: 0.9em;
  border: var(--neo-border);
  border-radius: 8px;
  overflow: hidden;
}
.prose thead {
  background: var(--accent-orange);
}
.prose th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 700;
  color: var(--text-primary);
  border-bottom: var(--neo-border);
}
.prose td {
  padding: 0.75rem 1rem;
  border-bottom: 1.5px solid var(--neo-border-color);
  color: var(--text-secondary);
}
.prose tbody tr:last-child td {
  border-bottom: none;
}
.prose tbody tr:hover {
  background: var(--neo-surface-alt);
}
```

---

## Optional Components

These components are used in specific projects and can be added as needed. All use `--neo-*` tokens.

### Comparison Table

Two-column good/bad comparison with color-coded hover.

```html
<section style="padding: 80px 0; background: var(--neo-bg);">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="section-title">Why Us?</h2>
    <div class="compare-table">
      <div class="compare-header">
        <div class="compare-col compare-col-others">Others</div>
        <div class="compare-col compare-col-ours">Our App</div>
      </div>
      <div class="compare-row">
        <div class="compare-cell compare-bad">
          <span class="compare-x">&times;</span> Slow and bloated
        </div>
        <div class="compare-cell compare-good">
          <span class="compare-check">&check;</span> Fast and lightweight
        </div>
      </div>
      <!-- More rows -->
    </div>
  </div>
</section>
```

```css
.compare-table {
  max-width: 900px;
  margin: 0 auto;
  border: var(--neo-border);
  border-radius: var(--neo-radius);
  overflow: hidden;
  box-shadow: var(--neo-shadow);
}
.compare-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.compare-col {
  padding: 16px 24px;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: var(--neo-border);
}
.compare-col-others {
  background: var(--neo-bg);
  color: var(--text-secondary);
}
.compare-col-ours {
  background: var(--accent-blue);
  color: #fff;
  border-left: var(--neo-border);
}
.compare-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 2px solid var(--neo-border-color);
}
.compare-row:last-child {
  border-bottom: none;
}
.compare-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 24px;
  font-size: 15px;
  line-height: 1.5;
  transition: background 0.15s;
}
.compare-cell:last-child {
  border-left: var(--neo-border);
}
.compare-bad {
  background: var(--neo-bg);
  color: var(--text-secondary);
}
.compare-good {
  background: var(--neo-surface);
  color: var(--text-primary);
  font-weight: 600;
}
.compare-row:hover .compare-bad {
  background: var(--neo-surface-alt);
}
.compare-row:hover .compare-good {
  background: color-mix(in srgb, var(--accent-green) 15%, var(--neo-surface));
}
.compare-x,
.compare-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  font-size: 16px;
  font-weight: 800;
  border: 2px solid var(--neo-border-color);
  border-radius: 50%;
}
.compare-x {
  background: var(--accent-orange);
  color: #fff;
}
.compare-check {
  background: var(--accent-green);
  color: #fff;
}
```

### Timeline

Horizontal numbered steps with dashed connector line.

```html
<section style="padding: 80px 0; background: var(--neo-bg);">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="section-title">How It Works</h2>
    <div class="timeline">
      <div class="timeline-line"></div>
      <div class="timeline-step">
        <div class="timeline-number">1</div>
        <div class="timeline-content">
          <div class="timeline-icon">
            <svg><!-- icon --></svg>
          </div>
          <h3>Step Title</h3>
          <p>Step description.</p>
        </div>
      </div>
      <!-- More steps -->
    </div>
  </div>
</section>
```

```css
.timeline {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
}
.timeline-line {
  position: absolute;
  top: 24px;
  left: 60px;
  right: 60px;
  height: 4px;
  border-top: 4px dashed var(--neo-border-color);
  z-index: 0;
}
.timeline-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
}
.timeline-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 22px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  background: var(--accent-blue);
  color: #fff;
  border: var(--neo-border);
  border-radius: 50%;
  box-shadow: var(--neo-shadow-sm);
  margin-bottom: 20px;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s;
}
.timeline-step:hover .timeline-number {
  transform: translateY(-8px) scale(1.15);
  box-shadow: var(--neo-shadow-lg);
}
.timeline-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  border: var(--neo-border);
  border-radius: var(--neo-radius);
  background: var(--neo-surface);
  box-shadow: var(--neo-shadow-sm);
}
.timeline-content h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
}
.timeline-content p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.65;
}

/* Mobile: stack vertically, hide connector */
@media (max-width: 768px) {
  .timeline {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
  .timeline-line {
    display: none;
  }
}
```

### Keyboard Shortcuts Showcase

Physical-feeling key display with press animation.

```html
<section style="padding: 80px 0; background: var(--neo-bg);">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="section-title">Keyboard Shortcuts</h2>
    <div class="key-showcase">
      <div class="key-item">
        <div class="key-combo">
          <kbd class="key-lg">&#x2318;</kbd>
          <kbd class="key-lg">C</kbd>
        </div>
        <span class="key-label">Copy</span>
      </div>
      <div class="key-item key-item-accent">
        <div class="key-combo">
          <kbd class="key-lg key-wide">Space</kbd>
        </div>
        <span class="key-label">Preview</span>
      </div>
    </div>
  </div>
</section>
```

```css
.key-showcase {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
}
.key-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.key-combo {
  display: flex;
  gap: 8px;
}
.key-lg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  height: 52px;
  padding: 8px 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  background: var(--neo-surface);
  color: var(--text-primary);
  border: var(--neo-border);
  border-radius: var(--neo-radius);
  box-shadow: 0 4px 0 var(--neo-border-color);
  transition:
    transform 0.1s,
    box-shadow 0.1s;
}
.key-lg:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 var(--neo-border-color);
}
.key-lg:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 var(--neo-border-color);
}
.key-wide {
  min-width: 100px;
}
.key-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}
/* Accent variant */
.key-item-accent .key-lg {
  background: var(--accent-blue);
  color: #fff;
}
```

### Homebrew Copy Block

Click-to-copy command with "Copied!" feedback animation.

```html
<div class="hero-brew-commands">
  <div class="hero-brew-row">
    <span class="hero-brew-label">Install</span>
    <code class="hero-brew-cmd" onclick="copyCmd(this)">brew install myapp</code>
  </div>
  <div class="hero-brew-row">
    <span class="hero-brew-label">Upgrade</span>
    <code class="hero-brew-cmd" onclick="copyCmd(this)">brew upgrade myapp</code>
  </div>
</div>
```

```js
function copyCmd(el) {
  navigator.clipboard.writeText(el.textContent);
  el.classList.add("copied");
  setTimeout(() => el.classList.remove("copied"), 1200);
}
```

```css
.hero-brew-cmd {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  background: var(--neo-surface);
  border: var(--neo-border);
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  transition:
    box-shadow 0.15s,
    transform 0.15s;
  position: relative;
}
.hero-brew-cmd:hover {
  box-shadow: var(--neo-shadow);
  transform: translate(-2px, -2px);
}
.hero-brew-cmd.copied::after {
  content: "Copied!";
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent-orange);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 6px;
  pointer-events: none;
  animation: fadeUp 1s forwards;
}
@keyframes fadeUp {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px);
  }
}
```

### Lightbox

Fullscreen image overlay for demo screenshots.

```html
<div class="lightbox" id="lightbox" onclick="closeLightbox()">
  <img id="lightbox-img" src="" alt="Enlarged view" />
</div>
```

```js
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  document.getElementById("lightbox-img").src = src;
  lb.classList.add("is-open");
  document.addEventListener("keydown", onEscClose);
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("is-open");
  document.removeEventListener("keydown", onEscClose);
}
function onEscClose(e) {
  if (e.key === "Escape") closeLightbox();
}
```

```css
.lightbox {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  cursor: zoom-out;
  align-items: center;
  justify-content: center;
  padding: 40px;
}
.lightbox.is-open {
  display: flex;
  animation: lightbox-in 0.25s ease-out;
}
.lightbox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--neo-radius);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
}
@keyframes lightbox-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

---

## Accessibility

All interactive components include:

- `@media (prefers-reduced-motion: reduce)` — disables `transform` animations on `.neo-hover`, `.neo-btn`
- Dark mode via `[data-theme="dark"]` — shadows use `rgba(255, 255, 255, 0.15)`, surfaces darken, text lightens
- Semantic `aria-label` attributes on icon-only buttons
