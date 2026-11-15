# CHANGELOG.md — what changed, and when

Newest changes at the top.

---

## 2026-11-15 — Phase 3, Step 1: Base page, design system and header
### Added
- `index.html` — the page frame: title, description, empty favicon (real one comes later), early download of the two main fonts, the import map pointing to `vendor/` (gsap, gsap/ScrollTrigger, lenis, model-viewer), a "Skip to main content" link, the header, and an empty `<main>` for the next sections.
- `css/tokens.css` — the design system as named settings: the 5 colours, the 2 fonts (`@font-face` for the Latin files and the ₹ files; a ₹ file downloads only when a ₹ appears), type sizes, spacing, corner style (pill for tappable things, soft corners for cards), glow and shadow, motion times.
- `css/base.css` — Night background with still amber and pink pools of light, a very fine grain texture made in code, base text styles, a neon keyboard-focus ring, and "reduce motion" support (no transitions, no smooth scrolling).
- `css/header.css` — the header: PARSH'S logo, links (Menu, How to order, Visit), pink "Your order" button with a count of 0. Phones: two rows; from 832 px wide: one row. See-through at the top; turns solid Griddle with a quick fade after a little scroll.
- `js/header.js` — makes the header solid in browsers that cannot do it with CSS alone (older Safari and Firefox).

## 2026-11-15 — Phase 2, Step 6: Libraries saved in vendor/
### Added
- `vendor/gsap/` — GSAP 3.15.1 core + ScrollTrigger as ES module files (`index.js`, `gsap-core.js`, `CSSPlugin.js`, `ScrollTrigger.js`, `Observer.js`), plus `LICENSE.md` (link and summary of the GSAP Standard License; the package has no licence file).
- `vendor/lenis/` — Lenis 1.3.27 (`lenis.mjs`, `lenis.css`) and its MIT `LICENSE`.
- `vendor/model-viewer/` — model-viewer 4.4.0 self-contained module build (`model-viewer.min.js`) and its Apache 2.0 `LICENSE`.
- All files come unchanged from the official npm packages. Tested together through an import map: GSAP, ScrollTrigger and Lenis start, and model-viewer loads `burger.glb` with its "open" animation.

### Changed
- `CREDITS.md` — added the 3 libraries with exact version, source and licence.

## 2026-11-15 — Phase 2, Step 5: Fonts
### Added
- `assets/fonts/big-shoulders-display-latin.woff2` (34.6 KB) and `assets/fonts/figtree-latin.woff2` (19.7 KB) — official Google Fonts files, Latin characters only. Each is a variable font: one file holds all weights (we use 700/900 and 400/600).
- `assets/fonts/big-shoulders-display-rupee.woff2` (1.5 KB) and `assets/fonts/figtree-rupee.woff2` (1.1 KB) — official one-character files for the ₹ sign, which the Latin files do not include.
- `assets/fonts/OFL-BigShouldersDisplay.txt` and `assets/fonts/OFL-Figtree.txt` — the SIL Open Font License 1.1 texts (required by the licence).

### Changed
- `CREDITS.md` — added both fonts and both ₹ files, with source and licence.

## 2026-11-15 — Phase 2, Step 4: Burger animation and still image
### Added
- `assets/images/hero-burger.webp` — backup still image of the closed burger (1000 × 1000 px, 78 KB, see-through background).
- `tools/burger/animate.mjs` — adds the "open" animation; `tools/burger/still.html` + `still-server.cjs` — make the still image.

### Changed
- `assets/models/burger.glb` — added the "open" animation (1 second; bottom bun stays, filling, lettuce and top bun rise gently). Now 1.77 MB.
- `CREDITS.md` — burger row notes the added animation; new row for the still image (same CC-BY credit).
- `CLAUDE.md` section 5, step 7 — Claude Code now adds the PROMPTS.md entry itself after each approved step.
- `PROMPTS.md` — added entries 11 and 12 (3D burger, footer credit and tools) and 13 (this step).
- `tools/burger/README.md`, `package.json`, `package-lock.json` — steps for the animation and still image; added `@gltf-transform/extensions` 4.5.1 (tools only).

## 2026-11-15 — Phase 2: 3D burger
### Added
- `assets/models/burger.glb` — 3D burger, "Hamburger" by Simal Mai on Sketchfab (CC-BY). Split into 4 layers (top_bun, lettuce, filling, bottom_bun) and shrunk from 12.6 MB to 1.76 MB (2048 px WebP textures).

### Changed
- `CREDITS.md` — added the 3D burger: maker, link, licence, and the changes made.
- `SITE-PLAN.md` section 7 — the burger now has 4 layers; tomato, cheese and patties open together as "filling" (they are one connected shape in this model).
- `README.md` — prepare 3D files with gltf-transform 4.5.1 (4.1.1 fails on Windows).

- `SITE-PLAN.md` — footer gets a small CC-BY credit line for the 3D burger (with links); added a matching before-launch check.

### Added (tools)
- `tools/burger/` — the scripts that split the burger into 4 layers (`split.mjs`, `group.mjs`, test helper `explode.mjs`), exact library versions (`package.json`, `package-lock.json`) and `README.md` with rebuild steps. Tested: the steps rebuild an identical `burger.glb`. Not used by the live website.

### Notes
- The burger is not on any page yet. The hero is built in a later step.

## 2026-11-15 — Phase 2: Dish photos
### Added
- `assets/images/` — 6 temporary stock photos from Unsplash (free Unsplash License), each 1200 px wide and under 250 KB:
  - `menu-burger.jpg` — smash burger
  - `menu-milkshake-chocolate.jpg` — chocolate shake
  - `menu-milkshake-cherry.jpg` — shake with a cherry on top
  - `menu-french-toast.jpg` — banana French toast
  - `menu-pasta-tagliatelle.jpg` — ribbon pasta
  - `menu-pasta-penne.jpg` — penne pasta

### Changed
- `CREDITS.md` — added a credit line (photographer, link, licence) for each of the 6 photos.

### Notes
- These are stock photos. They will be replaced with real photos of our own dishes later.
- The photos are not on any page yet. The menu is built in a later step.

## 2026-11-14 — Phase 1: Planning
### Added
- `SITE-PLAN.md` — the full blueprint: design, pages, motion map, 3D plan, ordering plan.

### Changed
- PARSH'S Diner is now a real restaurant in Kakinada: updated CLAUDE.md, README.md and SITE-PLAN.md (address, map, hours, delivery, 4-dish menu, hosting note).
- `CLAUDE.md` and `README.md` — filled in how to preview and deploy the site.

## 2026-11-14 — Phase 0: Setup

### Added
- `CLAUDE.md` — standing rules for Claude Code.
- `.gitignore` — list of files Git must never save.
- `README.md`, `PROMPTS.md`, `CHANGELOG.md`, `CREDITS.md`, `SECURITY.md`.
- `vercel.json` — Vercel settings: clean web addresses and 4 basic security settings.
- GSAP skills for Claude Code (gsap-core, gsap-performance, gsap-plugins, gsap-scrolltrigger, gsap-timeline, gsap-utils) in `.claude/skills/`, listed in `skills-lock.json`.

### Changed
- `CLAUDE.md` — Claude Code now always asks before every commit and push.
- `CLAUDE.md` and `SECURITY.md` — orders can be Pickup or Delivery; the address is collected only for Delivery.

### Notes
- Helpers installed on this computer (not saved in the project): frontend-design, modern-web-guidance, chrome-devtools.
- No website pages yet. Building starts after Phase 1 (planning) is approved.
