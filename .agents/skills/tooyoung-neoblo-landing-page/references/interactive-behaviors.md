# Interactive Behaviors

Complete JavaScript implementations for the core interaction systems in the Neoblo design system: theme toggle, 3D card tilt, i18n, decoration rendering, and back-to-top. Each section includes the full code, parameter reference, and edge case handling.

## Theme Toggle

Two-state toggle between light and dark. Persisted in `localStorage`. Default theme is `dark`. Includes FOUC prevention script.

### FOUC Prevention Script

This **must** be in `<head>` before any CSS loads. It runs synchronously to set the `data-theme` attribute before the first paint:

```html
<script>
  (function () {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.setAttribute("data-theme", "light");
    }
  })();
</script>
```

If no saved preference exists and the OS does not prefer light, the default is `dark` (the attribute is already absent or set to dark by the HTML).

### Full Implementation

```js
function toggleTheme() {
  var html = document.documentElement;
  var current = html.getAttribute("data-theme");
  var next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}
```

### How It Works

1. Read the current `data-theme` attribute from `<html>`.
2. Flip between `"dark"` and `"light"` — no third "system" state.
3. Write to both the DOM attribute (instant visual switch) and `localStorage` (persistence across reloads).

### Notes

- The FOUC prevention script handles OS preference detection at page load. After that, the toggle is a simple binary flip.
- There is no system-preference listener at runtime — once the user toggles, their explicit choice sticks.
- Blobity cursor colors should be updated after each toggle if Blobity is active (`window.__blobity`).

## 3D Card Tilt

Pointer-driven 3D rotation with spotlight gradient overlay. Uses `perspective` + `rotateX/Y` transforms with smoothstep easing to prevent jarring border-runs-away effects at card edges.

### Parameters

| Parameter          | Value | Description                                           |
| ------------------ | ----- | ----------------------------------------------------- |
| `maxTilt`          | 12    | Maximum rotation in degrees                           |
| `perspective`      | 800px | Set on parent grid, controls 3D depth perception      |
| `scale`            | 1.03  | Max scale factor at full tilt strength                |
| `edgePadding`      | 14    | Pixel inset to clamp raw pointer position near edges  |
| `tiltStartInset`   | 12    | Distance from edge (px) before tilt begins ramping up |
| `tiltRampDistance` | 26    | Distance (px) over which tilt strength ramps 0 to 1   |
| `leaveTolerance`   | 2     | Extra pixel margin for inside-rect checks on leave    |

### How It Works

1. **Pointer enters card** — capture `getBoundingClientRect()`, start listening to `pointermove` on `window` (not card, to handle projection shifts)
2. **Each move** — RAF-throttled update calculates:
   - Edge distance from all 4 sides
   - Smoothstep strength: `t * t * (3 - 2 * t)` where `t` is normalized edge distance
   - Rotation angles scaled by strength (prevents instant max tilt at edges)
   - Dynamic shadow offset mirrors rotation: `${-rotateY}px ${rotateX}px`
   - Spotlight gradient follows raw (unclamped) pointer for smooth tracking
3. **Pointer leaves** — deferred by one frame to check if truly outside (3D transforms shift the bounding rect)

### Touch Device Handling

Skip tilt entirely on touch — the `pointerenter` handler checks `e.pointerType === 'touch'` and returns early. This prevents stuck-tilt states from tap interactions.

### Full Implementation

```js
function initCardTilt() {
  const cards = document.querySelectorAll(".neo-card.neo-hover");

  cards.forEach((card) => {
    // Inject spotlight overlay
    const spotlight = document.createElement("div");
    spotlight.className = "card-spotlight";
    card.appendChild(spotlight);

    let isActive = false;
    let cardRect = null;
    let pointerX = 0;
    let pointerY = 0;
    let rafId = 0;

    const maxTilt = 12;
    const edgePadding = 14;
    const tiltStartInset = 12;
    const tiltRampDistance = 26;
    const leaveTolerance = 2;

    function isInsideCardRect(clientX, clientY, tolerance = 0) {
      if (!cardRect) return false;
      return (
        clientX >= cardRect.left - tolerance &&
        clientX <= cardRect.right + tolerance &&
        clientY >= cardRect.top - tolerance &&
        clientY <= cardRect.bottom + tolerance
      );
    }

    function resetTilt() {
      if (!isActive) return;
      isActive = false;
      cardRect = null;
      card.classList.remove("is-tilting");
      card.style.transform = "";
      card.style.boxShadow = "";
      spotlight.style.background = "";
      window.removeEventListener("pointermove", onPointerMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    function updateTiltFrame() {
      rafId = 0;
      if (!isActive || !cardRect) return;

      // Verify pointer is still inside (handles 3D projection edge cases)
      if (!isInsideCardRect(pointerX, pointerY, leaveTolerance)) {
        resetTilt();
        return;
      }

      const rawX = pointerX - cardRect.left;
      const rawY = pointerY - cardRect.top;
      const boundedRawX = Math.min(Math.max(rawX, 0), cardRect.width);
      const boundedRawY = Math.min(Math.max(rawY, 0), cardRect.height);

      // Clamp the very edge to keep the first few pixels stable on entry
      const x = Math.min(
        Math.max(rawX, edgePadding),
        cardRect.width - edgePadding,
      );
      const y = Math.min(
        Math.max(rawY, edgePadding),
        cardRect.height - edgePadding,
      );
      const centerX = cardRect.width / 2;
      const centerY = cardRect.height / 2;
      const edgeDistance = Math.min(
        boundedRawX,
        cardRect.width - boundedRawX,
        boundedRawY,
        cardRect.height - boundedRawY,
      );

      // Smoothstep ease-in from card edge
      const linearStrength = Math.min(
        Math.max((edgeDistance - tiltStartInset) / tiltRampDistance, 0),
        1,
      );
      const tiltStrength =
        linearStrength * linearStrength * (3 - 2 * linearStrength);

      const rotateY = ((x - centerX) / centerX) * maxTilt * tiltStrength;
      const rotateX = ((centerY - y) / centerY) * maxTilt * tiltStrength;
      const scale = 1 + 0.03 * tiltStrength;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

      // Shadow mirrors rotation for convincing 3D depth
      card.style.boxShadow = `${-rotateY}px ${rotateX}px 0 var(--neo-border-color)`;

      // Spotlight follows raw pointer (unclamped) for smooth edge tracking
      spotlight.style.background = `radial-gradient(circle 180px at ${rawX}px ${rawY}px, rgba(255,255,255,0.25), transparent)`;
    }

    function queueTiltFrame() {
      if (rafId) return;
      rafId = requestAnimationFrame(updateTiltFrame);
    }

    function onPointerMove(e) {
      pointerX = e.clientX;
      pointerY = e.clientY;
      queueTiltFrame();
    }

    function onPointerEnter(e) {
      // Skip touch devices entirely
      if (e.pointerType === "touch" || isActive) return;
      cardRect = card.getBoundingClientRect();
      isActive = true;
      card.classList.add("is-tilting");
      pointerX = e.clientX;
      pointerY = e.clientY;
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      queueTiltFrame();
    }

    function onPointerLeave(e) {
      if (!isActive) return;
      pointerX = e.clientX;
      pointerY = e.clientY;

      // Defer reset: some leaves are caused by 3D projection changes
      requestAnimationFrame(() => {
        if (!isActive) return;
        if (!isInsideCardRect(pointerX, pointerY, leaveTolerance)) {
          resetTilt();
        }
      });
    }

    card.addEventListener("pointerenter", onPointerEnter);
    card.addEventListener("pointerleave", onPointerLeave);
    card.addEventListener("pointercancel", resetTilt);
    window.addEventListener("blur", resetTilt);
  });
}
```

### Required CSS

```css
/* Parent grid needs perspective */
.features-grid {
  perspective: 800px;
}

/* Cards need 3D transform context */
.neo-card.neo-hover {
  transform-style: preserve-3d;
  position: relative;
  overflow: hidden;
}

/* Spotlight overlay */
.neo-card.neo-hover .card-spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: inherit;
  z-index: 1;
}
.neo-card.neo-hover:hover .card-spotlight {
  opacity: 1;
}

/* Disable CSS transition when JS controls transform */
.neo-card.neo-hover.is-tilting {
  transition: none;
}
.neo-card.neo-hover.is-tilting:hover {
  transform: none;
}
```

## Decoration System Rendering

Client-side JS that generates decorative SVG shapes in the left and right margins of the page. Shapes are deterministically distributed based on content height, using a pseudo-random sequence for position, rotation, and size variety.

### Shape Library

Five SVG shapes are used, cycling through each element in order:

| Index | Shape      | Description                                      |
| ----- | ---------- | ------------------------------------------------ |
| 0     | Maple leaf | Spiky multi-pointed leaf silhouette              |
| 1     | Snowflake  | Six-spoke crystal with endpoint circles          |
| 2     | Cat paw    | Four toe pads + central pad via ellipses/circles |
| 3     | Leaf       | Simple teardrop leaf with curved edges           |
| 4     | Flower     | Five overlapping petal circles                   |

### Parameters

| Parameter | Value | Description                                         |
| --------- | ----- | --------------------------------------------------- |
| `SPACING` | 400   | Vertical pixels between decoration rows             |
| Colors    | 5     | Cycles through `var(--deco-1)` to `var(--deco-5)`   |
| Size      | 80-128| Random size range in pixels (`80 + (s % 48)`)       |
| Offset    | 5-45  | Horizontal offset from edge (`5 + (s % 40)`)        |
| Minimum   | 2     | At least 2 decorations per side regardless of height |

### Full Implementation

```js
const SPACING = 400;
const SHAPES = [
  // maple leaf
  `<path d="M50 5L56 28L76 16L64 38L92 36L63 52L74 82L54 62L50 96L46 62L26 82L37 52L8 36L36 38L24 16L44 28Z"/>`,
  // snowflake
  `<rect x="46" y="5" width="8" height="90" rx="4"/><rect x="46" y="5" width="8" height="90" rx="4" transform="rotate(60 50 50)"/><rect x="46" y="5" width="8" height="90" rx="4" transform="rotate(-60 50 50)"/><circle cx="50" cy="8" r="5"/><circle cx="50" cy="92" r="5"/><circle cx="86" cy="29" r="5"/><circle cx="14" cy="71" r="5"/><circle cx="86" cy="71" r="5"/><circle cx="14" cy="29" r="5"/>`,
  // cat paw
  `<ellipse cx="50" cy="64" rx="24" ry="22"/><circle cx="28" cy="36" r="11"/><circle cx="44" cy="24" r="10"/><circle cx="56" cy="24" r="10"/><circle cx="72" cy="36" r="11"/>`,
  // leaf
  `<path d="M50 8C20 30 12 65 50 92C88 65 80 30 50 8Z"/>`,
  // flower
  `<circle cx="50" cy="28" r="15"/><circle cx="71" cy="43" r="15"/><circle cx="63" cy="68" r="15"/><circle cx="37" cy="68" r="15"/><circle cx="29" cy="43" r="15"/>`,
];

function renderDecorations() {
  const leftZone = document.querySelector(".deco-left");
  const rightZone = document.querySelector(".deco-right");
  if (!leftZone || !rightZone) return;

  const contentHeight =
    document.getElementById("main-scroll")?.scrollHeight ?? 0;
  const perSide = Math.max(2, Math.ceil(contentHeight / SPACING));
  const total = perSide * 2;

  let leftHtml = "";
  let rightHtml = "";

  for (let i = 0; i < total; i++) {
    const s = (i * 137 + 53) % 100;
    const isLeft = i % 2 === 0;
    const top = 120 + Math.floor(i / 2) * SPACING + (s % 120);
    const offset = 5 + (s % 40);
    const rotation = (s * 37) % 360;
    const size = 80 + (s % 48);
    const colorIdx = ((i * 3 + 1) % 5) + 1;
    const shape = SHAPES[i % 5];
    const side = isLeft ? "left" : "right";

    const el = `<div class="deco-item" style="${side}:${offset}px;top:${top}px;transform:rotate(${rotation}deg)"><svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="var(--deco-${colorIdx})">${shape}</svg></div>`;
    if (isLeft) leftHtml += el;
    else rightHtml += el;
  }

  leftZone.innerHTML = leftHtml;
  rightZone.innerHTML = rightHtml;
}
```

### How It Works

1. **Content measurement** — reads `scrollHeight` from `#main-scroll` to determine how many decoration rows to generate.
2. **Deterministic pseudo-random** — uses `(i * 137 + 53) % 100` to produce a repeatable scatter seed `s` for each element, ensuring consistent layout across reloads.
3. **Alternating sides** — even indices go left, odd go right. Each pair shares a vertical row.
4. **Color cycling** — maps each element to one of five `--deco-N` CSS custom properties (1-indexed), offset by `(i * 3 + 1)` to avoid adjacent same-colors.
5. **innerHTML batch write** — builds both sides as strings, then writes once per zone to minimize reflows.

### Required HTML Structure

```html
<div class="page-decorations">
  <div class="deco-zone deco-left"></div>
  <div class="deco-zone deco-right"></div>
</div>
```

This container should be a direct child of the scrollable area, positioned absolutely so it spans the full content height.

### Required CSS

```css
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
.deco-left {
  left: 0;
  width: calc(50% - 37rem);
}
.deco-right {
  right: 0;
  width: calc(50% - 37rem);
}
.deco-item {
  position: absolute;
  opacity: 0.8;
}
@media (max-width: 1280px) {
  .page-decorations {
    display: none;
  }
}
```

### Notes

- Decorations are hidden on viewports narrower than 1280px since there is no margin space.
- The `calc(50% - 37rem)` width matches the main content column width (74rem total). Adjust if the content max-width changes.
- Call `renderDecorations()` again after any layout change that significantly alters `#main-scroll` height (e.g., dynamic content load).

## Back-to-Top Button

Scroll-to-top button that listens on the `#main-scroll` container instead of `window`. This is necessary because the page uses a scrollable container layout rather than native document scroll.

### Full Implementation

```js
const btn = document.getElementById("back-to-top");
const mainScroll = document.getElementById("main-scroll");
mainScroll.addEventListener(
  "scroll",
  () => {
    btn.classList.toggle("visible", mainScroll.scrollTop > 300);
  },
  { passive: true },
);
btn.addEventListener("click", () => {
  mainScroll.scrollTo({ top: 0, behavior: "smooth" });
});
```

### How It Works

1. **Scroll listener** on `#main-scroll` (not `window`) toggles a `.visible` class when scrolled past 300px.
2. **Click handler** calls `scrollTo` with `behavior: 'smooth'` on the same container.
3. The `{ passive: true }` option on the scroll listener ensures no jank from the browser waiting to see if `preventDefault()` is called.

### Required CSS

```css
#back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 50;
}
#back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
}
```

## i18n (Internationalization)

Attribute-based i18n system using `data-en` and `data-zh` attributes. No build step, no JSON files, no framework required.

### Pattern

```html
<h1 data-en="Hello World" data-zh="你好世界">Hello World</h1>
```

The default text content serves as fallback. JavaScript reads the appropriate `data-{lang}` attribute and replaces the element's content.

### Full Implementation

```js
let currentLang =
  localStorage.getItem("lang") ||
  (navigator.language.startsWith("zh") ? "zh" : "en");

function toggleLang() {
  currentLang = currentLang === "en" ? "zh" : "en";
  localStorage.setItem("lang", currentLang);
  applyLang();
}

function applyLang() {
  document.querySelectorAll("[data-en][data-zh]").forEach((el) => {
    const text = el.getAttribute(`data-${currentLang}`);
    // Preserve child elements (e.g., <br> in titles)
    if (el.children.length === 0) {
      el.textContent = text;
    } else {
      el.innerHTML = text;
    }
  });

  // Update toggle button label
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.textContent = currentLang === "en" ? "中文" : "English";
  }

  // Update document lang attribute
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
}
```

### Usage Notes

- **HTML inside attributes**: Use `<br>` in `data-zh="第一行<br>第二行"` — the `innerHTML` branch handles this when the element has child nodes
- **Dynamic elements**: Call `applyLang()` after inserting new DOM elements with `data-en`/`data-zh` attributes
- **Title tag**: Update `document.title` separately in `applyLang()` since `<title>` doesn't support data attributes easily
- **Extending to more languages**: Add `data-ja`, `data-ko` etc., and modify the toggle cycle accordingly

### Language Detection Priority

1. `localStorage.getItem('lang')` — user's explicit choice (survives page reloads)
2. `navigator.language.startsWith('zh')` — browser language auto-detection
3. `'en'` — default fallback

### Dynamic Demo Images (Optional)

For apps with theme-aware screenshots, construct the image path from current state:

```js
function updateDemoImage() {
  const img = document.querySelector(".demo-img");
  if (!img) return;
  const theme = document.documentElement.getAttribute("data-theme") || "dark";
  img.src = `preview-${theme}-${currentLang}.webp`;
}
```

This requires 4 image variants: `preview-light-en.webp`, `preview-light-zh.webp`, `preview-dark-en.webp`, `preview-dark-zh.webp`.

## Initialization Order

The timing of initialization is critical to prevent visual glitches:

```
1. <head> inline script    — Theme FOUC prevention (synchronous, before CSS)
2. CSS loads               — Styles apply with correct theme already set
3. DOMContentLoaded        — renderDecorations() + initCardTilt() + applyLang()
4. Optional                — Blobity cursor (async import, non-blocking)
```

```js
// In <head> — runs synchronously before first paint
(function () {
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();

// At end of <body> or in deferred script
document.addEventListener("DOMContentLoaded", () => {
  renderDecorations();
  initCardTilt();
  applyLang();
});

// Blobity — async, non-critical
import("https://esm.sh/blobity@0.2.3")
  .then(({ default: Blobity }) => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    // ... init
  })
  .catch(() => {});
```
