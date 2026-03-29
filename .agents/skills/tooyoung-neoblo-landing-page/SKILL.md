---
name: tooyoung-neoblo-landing-page
description: "Build pages with Neobrutalism design system. Configurable color palette, scattered decorations, fixed header/footer layout. Trigger: landing page, neobrutalism, 落地页, build homepage, product page, design system"
metadata:
  version: "2.0.0"
---

# Neoblo Design System

Build pages using the **Neoblo** design system: **Neo**brutalism visuals with thick borders, hard-offset shadows, bold accent colors, and playful scattered decorations. Technology-agnostic — works with pure HTML/CSS/JS or any framework (Astro, React, Vue, etc.).

Core characteristics:

- **Thick borders** (2.5px) with hard-offset shadows (zero blur)
- **Bold accent colors** on a warm neutral background
- **Pill-shaped buttons and badges** with press/lift animations
- **Scattered decorative SVGs** (maple leaf, snowflake, cat paw, leaf, flower) in page margins
- **Fixed header/footer** with independently scrolling main content

> Color palette is fully configurable via CSS custom properties. See [Color Palette Interface](#color-palette-interface).

> For Blobity cursor effects (optional), see `tooyoung:blobity-cursor` skill.

## Color Palette Interface

All colors are CSS custom properties. **To create a custom theme, override only the slots marked with `🎨`**. Structural tokens (borders, shadows, radii) are derived from the palette automatically.

### Light Theme

```css
:root {
  /* 🎨 Background & Surface */
  --neo-bg: #F5F0E8;           /* Page background */
  --neo-surface: #FFFFFF;       /* Cards, header, footer */
  --neo-surface-alt: #FFF8E7;   /* Alternate surface (code blocks, table hover) */

  /* 🎨 Text */
  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --text-tertiary: #7a7a7a;

  /* 🎨 Accent Colors */
  --accent-orange: #F97C00;     /* Default buttons, badges */
  --accent-green: #3ECFA0;      /* Inline code background */
  --accent-blue: #0057FF;       /* Links, primary actions */
  --accent-teal: #00BFA5;       /* Secondary accent */
  --accent-title: #00C0A6;      /* Site title / brand color */

  /* 🎨 Decoration Colors (margin decorations) */
  --deco-1: #F97C00;
  --deco-2: #3ECFA0;
  --deco-3: #0057FF;
  --deco-4: #00BFA5;
  --deco-5: #00C0A6;

  /* 🎨 Border Color */
  --neo-border-color: #000000;

  /* ─── Structural tokens (usually no need to change) ─── */
  --neo-border-width: 2.5px;
  --neo-border: 2.5px solid #000000;
  --neo-radius: 10px;
  --neo-shadow-sm: 3px 3px 0px #000000;
  --neo-shadow: 5px 5px 0px #000000;
  --neo-shadow-lg: 8px 8px 0px #000000;
  --neo-shadow-pressed: 2px 2px 0px #000000;
}
```

### Dark Theme

```css
[data-theme="dark"] {
  /* 🎨 Background & Surface */
  --neo-bg: #1a1a1a;
  --neo-surface: #2a2a2a;
  --neo-surface-alt: #333333;

  /* 🎨 Text */
  --text-primary: #f0f0f0;
  --text-secondary: #b0b0b0;
  --text-tertiary: #808080;

  /* 🎨 Border — lighter for dark backgrounds */
  --neo-border-color: #e0e0e0;
  --neo-border: 2.5px solid #e0e0e0;

  /* Shadows — translucent white for dark mode */
  --neo-shadow-sm: 3px 3px 0px rgba(255, 255, 255, 0.15);
  --neo-shadow: 5px 5px 0px rgba(255, 255, 255, 0.15);
  --neo-shadow-lg: 8px 8px 0px rgba(255, 255, 255, 0.15);
  --neo-shadow-pressed: 2px 2px 0px rgba(255, 255, 255, 0.15);

  /* Accent & deco colors typically stay the same in dark mode */
}
```

### Example Palettes

| Slot | Warm Cream (default) | Cool Slate | Midnight Blue |
|---|---|---|---|
| `--neo-bg` | `#F5F0E8` | `#F8FAFC` | `#0F172A` |
| `--neo-surface` | `#FFFFFF` | `#FFFFFF` | `#1E293B` |
| `--accent-orange` | `#F97C00` | `#F59E0B` | `#FB923C` |
| `--accent-blue` | `#0057FF` | `#3B82F6` | `#60A5FA` |
| `--accent-green` | `#3ECFA0` | `#10B981` | `#34D399` |
| `--neo-border-color` | `#000000` | `#1E293B` | `#CBD5E1` |

### Typography

```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

/* Optional: serif for CJK headings */
h1, h2, h3 {
  font-family: 'Noto Serif SC', serif;
}
```

Google Fonts link:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Serif+SC:wght@400;700;900&display=swap" rel="stylesheet" />
```

## Layout Structure

Fixed header and footer with independently scrollable main content. Scrollbar only appears on the main area.

```
┌─────────────────────────────────────────┐
│  Header (shrink-0, z-50)                │  ← Fixed at top
├─────────────────────────────────────────┤
│  #main-scroll (flex-1, overflow-y-auto) │  ← Only this scrolls
│  ┌─ .relative.min-h-full ────────────┐  │
│  │  Decorations (left/right zones)   │  │
│  │  <main> page content </main>      │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│  Footer (shrink-0)                      │  ← Fixed at bottom
└─────────────────────────────────────────┘
```

### HTML Structure

```html
<body>
  <div class="h-screen flex flex-col overflow-hidden">
    <header class="shrink-0 z-50">...</header>
    <div id="main-scroll" class="flex-1 overflow-y-auto">
      <div class="relative min-h-full">
        <!-- Decoration zones (see Decoration System) -->
        <main>...</main>
      </div>
    </div>
    <footer class="shrink-0">...</footer>
  </div>
</body>
```

### Scrollbar Styling (main area only)

```css
body { overflow: hidden; }

#main-scroll { scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: var(--neo-border-color) var(--neo-bg); }
#main-scroll::-webkit-scrollbar { width: 8px; }
#main-scroll::-webkit-scrollbar-track { background: var(--neo-bg); }
#main-scroll::-webkit-scrollbar-thumb { background: var(--neo-border-color); border-radius: 4px; }
```

## Component Patterns

### Cards (3 tiers)

```css
.neo-card    { background: var(--neo-surface); border: var(--neo-border); border-radius: 10px; box-shadow: var(--neo-shadow); }
.neo-card-sm { background: var(--neo-surface); border: var(--neo-border); border-radius: 8px;  box-shadow: var(--neo-shadow-sm); }
.neo-card-lg { background: var(--neo-surface); border: var(--neo-border); border-radius: 14px; box-shadow: var(--neo-shadow-lg); }
```

### Hover Effect (lift up-left)

```css
.neo-hover { transition: transform 0.15s ease, box-shadow 0.15s ease; }
.neo-hover:hover { transform: translate(-2px, -2px); box-shadow: var(--neo-shadow-lg); }
```

### Buttons (pill-shaped)

```css
.neo-btn {
  display: inline-block;
  padding: 0.625rem 1.5rem;
  background: var(--accent-orange);
  color: var(--text-primary);
  font-weight: 700;
  border: var(--neo-border);
  border-radius: 999px;
  box-shadow: var(--neo-shadow-sm);
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.neo-btn:hover  { transform: translate(-2px, -2px); box-shadow: var(--neo-shadow); }
.neo-btn:active { transform: translate(2px, 2px);   box-shadow: var(--neo-shadow-pressed); }

.neo-btn-primary       { background: var(--accent-blue); color: #ffffff; }
.neo-btn-primary:hover { color: #ffffff; }
```

### Badges & Tags

```css
.neo-badge {
  display: inline-block; font-size: 0.75rem; font-weight: 600;
  padding: 0.15rem 0.6rem; background: var(--accent-orange);
  color: var(--text-primary); border: 2px solid var(--neo-border-color); border-radius: 999px;
}
.neo-tag {
  display: inline-block; font-size: 0.7rem; font-weight: 500;
  padding: 0.15rem 0.55rem; background: var(--neo-surface-alt);
  color: var(--text-secondary); border: 1.5px solid var(--neo-border-color); border-radius: 999px;
}
```

> For full component variants and optional sections (hero, demo window, comparison table, timeline, etc.), see [references/component-catalog.md](references/component-catalog.md).

## Decoration System

Scattered decorative SVG shapes in page margins. Only visible on wide screens (> 1280px). Dynamically generated based on content height.

### Two-Zone Architecture

Decorations are confined to margin areas via two absolute-positioned zones:

```css
.page-decorations { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
.deco-zone        { position: absolute; top: 0; bottom: 0; overflow: hidden; }
.deco-left        { left: 0;  width: calc(50% - 37rem); }
.deco-right       { right: 0; width: calc(50% - 37rem); }
```

The `37rem` = half of `max-w-6xl` (72rem) + 1rem safety margin. Adjust if your content width differs.

### SVG Shapes (5 built-in)

| # | Shape | SVG (viewBox 0 0 100 100) |
|---|---|---|
| 1 | Maple leaf | `<path d="M50 5L56 28L76 16L64 38L92 36L63 52L74 82L54 62L50 96L46 62L26 82L37 52L8 36L36 38L24 16L44 28Z"/>` |
| 2 | Snowflake | 3 crossed `<rect>` bars (rotated 0/60/-60) + 6 endpoint `<circle>` |
| 3 | Cat paw | 1 `<ellipse>` pad + 4 `<circle>` toe beans |
| 4 | Leaf | `<path d="M50 8C20 30 12 65 50 92C88 65 80 30 50 8Z"/>` |
| 5 | Flower | 5 overlapping `<circle>` petals |

### Dynamic Rendering (JS)

```js
const SPACING = 400;                                                    // px between items
const contentHeight = document.getElementById('main-scroll')?.scrollHeight ?? 0;
const perSide = Math.max(2, Math.ceil(contentHeight / SPACING));        // items per side
const total = perSide * 2;                                              // left + right

for (let i = 0; i < total; i++) {
  const s = (i * 137 + 53) % 100;                                      // deterministic pseudo-random
  const isLeft = i % 2 === 0;
  const top    = 120 + Math.floor(i / 2) * SPACING + (s % 120);
  const offset = 5 + (s % 40);                                         // px from outer edge
  const size   = 80 + (s % 48);                                        // 80–128px
  const colorIdx = ((i * 3 + 1) % 5) + 1;                              // --deco-1 to --deco-5
  const shape  = SHAPES[i % 5];
  // ... append to left/right zone
}
```

### Customization Knobs

| Knob | Variable / Constant | Default | Effect |
|---|---|---|---|
| Colors | `--deco-1` … `--deco-5` | Accent palette | Fill color of each shape |
| Opacity | `.deco-item { opacity }` | `0.8` | Visibility (lower = subtler) |
| Size | `80 + (s % 48)` in JS | 80–128px | SVG dimensions |
| Density | `SPACING` | 400px | Vertical gap between items |
| Shapes | `SHAPES[]` array | 5 built-in | Add/replace SVG markup |
| Zone width | `calc(50% - 37rem)` | 37rem | Adjust for different content max-width |
| Breakpoint | `@media (max-width: 1280px)` | 1280px | Below this, decorations hidden |

## Page Sections

Standard section order for a landing/content page:

```
header      — Fixed: logo + nav links + search + theme toggle
main
  hero      — Title + subtitle + CTA (inside neo-card or standalone)
  features  — Grid of neo-cards with icons
  content   — Article body / page content
  cta       — Full-width call-to-action
footer      — Fixed: copyright + links (RSS, GitHub, email)
```

Sections alternate `--neo-bg` and `--neo-surface` backgrounds. Use `border-top`/`border-bottom` for visual separation between surface-colored sections.

## Responsive Design

| Breakpoint | Layout | Decorations |
|---|---|---|
| > 1280px | Full width, multi-column grids | Visible |
| 1024–1280px | Full width, fewer columns | Hidden |
| 768–1024px | 2-col → 1-col grids | Hidden |
| < 768px | Single column, mobile nav menu | Hidden |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .neo-hover:hover, .neo-btn:hover, .neo-btn:active { transform: none; }
}
```

## Common Pitfalls

1. **Shadow direction** — All shadows go bottom-right. Never mix directions.
2. **Hardcoded colors** — Always use `var(--token)`, never raw hex in component CSS. This ensures theme switching and palette customization work.
3. **Theme flash (FOUC)** — Theme init script must be inline in `<head>` before CSS loads.
4. **CJK text overflow** — Add `word-break: break-word` for Chinese/Japanese content in cards and descriptions.
5. **Decoration overlap** — Use `calc(50% - Xrem)` zones. Adjust `X` if content `max-width` differs from 72rem.
6. **Scrollbar on wrong element** — `body { overflow: hidden }` + only `#main-scroll { overflow-y: auto }`.
7. **Missing box-sizing** — Thick borders break layouts without `*, *::before, *::after { box-sizing: border-box }`.
8. **Font loading flash** — Load Google Fonts with `&display=swap` for immediate fallback rendering.

## References

| File | Content |
|---|---|
| [page-template.md](references/page-template.md) | Complete copy-paste HTML template |
| [interactive-behaviors.md](references/interactive-behaviors.md) | Theme toggle, 3D card tilt, decoration rendering — full JS |
| [component-catalog.md](references/component-catalog.md) | All components: cards, buttons, nav, hero, footer + optional sections |

## Customization Guide

### Changing the Color Palette

1. Override the `🎨` slots in `:root` with your brand colors
2. Create matching `[data-theme="dark"]` values — darken backgrounds, lighten borders, use `rgba(255,255,255,0.15)` for shadows
3. Set `--deco-1` through `--deco-5` to match your accent palette
4. If using Blobity, sync cursor `color`/`dotColor` options on theme change

### Adjusting Decorations

- **Different shapes**: Replace SVG paths in `SHAPES[]`
- **Fewer/more types**: Change array length, adjust `i % N`
- **Sparser layout**: Increase `SPACING` (e.g., 600 for very sparse)
- **Different content width**: If not using `max-w-6xl`, adjust the `37rem` in `.deco-left`/`.deco-right` to `(your-max-width / 2) + 1rem`

### Adding a New Component

Follow the **neo pattern**: `--neo-surface` bg + `--neo-border` + shadow tier + `--neo-radius` + `.neo-hover` for interactivity. All new components should reference tokens, never raw values.
