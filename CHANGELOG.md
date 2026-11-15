# CHANGELOG.md — what changed, and when

Newest changes at the top.

---

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
