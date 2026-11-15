# PROMPTS.md — prompt log

Every prompt given to Claude Code for this project, in order.
Format for each entry: number, date, phase and step, what it was for, and the prompt (or a short summary if it was very long).

---

## Phase 0 — Setup

### 1 · 2026-11-14 · Step 22 · Create CLAUDE.md
Summary: Created CLAUDE.md, the standing rules for Claude Code (12 sections: project, tools, site type, quality bar, build loop, ordering checks, how to talk to me, when something breaks, safety and Git rules, helpers, how to run, project files). Written in Claude Chat first, then replaced in one go as the final version.

### 2 · 2026-11-14 · Step 23 · Create .gitignore
Summary: Created .gitignore so Git never saves secrets (.env), downloaded code (node_modules), build output, Vercel's local folder, personal Claude Code settings, logs and system files.

### 3 · 2026-11-14 · Step 24 · Create 5 project files
Summary: Created README.md, PROMPTS.md, CHANGELOG.md, CREDITS.md and SECURITY.md.

### 4 · 2026-11-14 · Step 25 · Create vercel.json
Summary: Created vercel.json with clean web addresses (no .html at the end, no trailing slash) and 4 security settings: no file-type guessing, private link sharing, no embedding by other sites, and camera/microphone/location/payment switched off.

### 5 · 2026-11-14 · Side task · Always ask before commit and push
Summary: Updated CLAUDE.md so Claude Code asks "Shall I commit and push now?" and waits for my yes before every save and upload.

## Phase 1 — Planning

### 6 · 2026-11-14 · Phase 1, Step 1 · Old site content and honesty decisions
Summary: Read the old site's content. Decided: remove fake reviews, owner story and "real restaurant" claims; add a sample banner; keep my real number for test orders; keep Pickup or Delivery (address only for Delivery); remove the unused Google Analytics tag. Updated CLAUDE.md and SECURITY.md for the delivery address.

### 7 · 2026-11-14 · Phase 1, Step 8 · Write SITE-PLAN.md
Summary: Wrote SITE-PLAN.md from the decisions made in Claude Chat (Steps 1–7). Menu, prices, address and hours copied from the old site.

### 8 · 2026-11-14 · Phase 1, Step 9 · Switch to a real restaurant
Summary: PARSH'S Diner is real (Kakinada, 100% halal, Est. 2024). Updated the plan, rules and README: real address, map link, hours, delivery within 5 km, 4-dish menu, stock photos for now, hosting chosen at launch.

### 9 · 2026-11-15 · Phase 1, Step 10 · How to run
Summary: Filled in how to preview the site (npx serve on port 3000) and how deploying works.

## Phase 2 — Assets

### 10 · 2026-11-15 · Phase 2, Steps 1–2 · Choose and save 6 dish photos
Summary: Searched Unsplash for photo options over several rounds (asked for sharper, food-focused shots on a matching dark background). Chose 6 free photos: burger, chocolate shake, cherry shake, banana French toast, ribbon pasta and penne. Saved them in assets/images/, shrank each to 1200 px wide and under 250 KB, and added a credit line for each to CREDITS.md. Skipped one paid Unsplash+ photo and deleted one unapproved photo.

### 11 · 2026-11-15 · Phase 2, Step 3 · Choose and prepare the 3D burger
Summary: Compared free CC-BY burgers on Sketchfab (Poly Pizza only had cartoon ones). Chose "Hamburger" by Simal Mai (double patty). Downloaded the 4k GLB. Fixed a shrinking error (gltf-transform 4.1.1 mixed two image-library versions; 4.5.1 works). Split the merged model into 4 layers (top bun, lettuce, filling, bottom bun) and shrank it from 12.6 MB to 1.76 MB. Saved as assets/models/burger.glb; updated CREDITS.md, SITE-PLAN.md section 7 and README.md.

### 12 · 2026-11-15 · Phase 2, Step 3 follow-up · Footer credit and burger tools
Summary: Planned a small CC-BY credit line for the burger in the website footer, plus a before-launch check (SITE-PLAN.md). Saved the burger-splitting scripts and rebuild steps in tools/burger/; tested that they rebuild an identical burger.glb.

### 13 · 2026-11-15 · Phase 2, Step 4 · Burger animation and still image
Summary: Changed CLAUDE.md so Claude Code adds PROMPTS.md entries itself, and added entries 11–12. Then finished SITE-PLAN.md section 7: shrinking was already done; added the gentle "open" animation to burger.glb (1.77 MB) and made the backup still image hero-burger.webp (78 KB). Saved the scripts and steps in tools/burger/.

### 14 · 2026-11-15 · Phase 2, Step 5 · Save the two fonts
Summary: Downloaded Big Shoulders Display and Figtree from Google Fonts as Latin-only .woff2 files (one variable file per font covers all weights). Found that the Latin files have no ₹ sign, so on request also added Google's official one-character ₹ files for both fonts. Saved both OFL licence texts and added everything to CREDITS.md.

### 15 · 2026-11-15 · Phase 2, Step 6 · Save the 3 libraries in vendor/
Summary: Downloaded the latest stable GSAP (3.15.1, core + ScrollTrigger), Lenis (1.3.27, with its CSS) and model-viewer (4.4.0, self-contained build) from their official npm packages, as ES modules for an import map. Saved them unchanged in vendor/ with their licences, checked each licence allows a business website, tested them together in a browser, and added them to CREDITS.md.

## Phase 3 — Build

### 16 · 2026-11-15 · Phase 3, Step 1 · Base page, design system and header
Summary: Built index.html (page frame, import map to vendor/, header only), the design system in css/tokens.css (5 colours, 2 fonts with ₹ files, spacing, corners, glow, motion times), the night background with amber and pink pools of light and fine grain (css/base.css), and the header (css/header.css + js/header.js): logo, Menu / How to order / Visit links, "Your order" button with count 0, turns solid after a little scroll. Checked at 360px, 375px and desktop with chrome-devtools.

### 17 · 2026-11-15 · Phase 3, Step 2 · Hero with the 3D burger
Summary: Chose the hero words over several rounds: no "100% halal" in the text (shown once as a small badge instead), no "Est. 2024", no place name. Final: "Hot off the griddle." / "Smash burgers and hand-spun shakes." Built the hero (index.html, css/buttons.css, css/hero.css, js/hero-burger.js): halal badge, heading, line, two buttons, and the 3D burger that loads after the page appears and replaces the matching still image. Drag or arrow keys to spin, no zoom, no auto-spin, phone scrolling not blocked. Checked at 360px, 375px and desktop; page appears in about 2.5–2.9 s on a simulated slow phone.
