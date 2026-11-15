# CHANGELOG.md — what changed, and when

Newest changes at the top.

---

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
