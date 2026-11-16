# CHANGELOG.md — what changed, and when

Newest changes at the top.

---

## 2026-11-16 — Phase 3, Step 6: Google Sheet order log
### Added
- `apps-script/Code.gs` — the new order-log script. Only adds rows (never reads, changes or deletes), limited to its own Sheet (`@OnlyCurrentDoc`). Checks every order: order number like PD-1432, name 2–40 letters, 10-digit Indian mobile, Pickup or Delivery, address only for Delivery (5–200), notes up to 200, only our 4 dishes at their real prices, 1–10 of each, and a total that matches. Drops orders with the hidden trap box filled. Spam limits in Google's cache: 3 orders per phone in 10 minutes, 20 orders a minute overall. Text starting with =, +, - or @ is made harmless. Columns A–I in the old order (full timestamp, date, time, name, phone, Pickup/Delivery, address, items, total), then Site ("3D"), Order no., Notes. Timestamp, date and time in the same format as the old rows (UTC, e.g. "2026-07-09T10:32:40.031Z", "2026-07-09", "10:32:40").
- `apps-script/appsscript.json` — the script's settings: only the one-spreadsheet permission, web app run as the owner and open to anyone, India time zone.
- `apps-script/README.md` — what is set up on Google (Sheet, script ID, deployment ID, columns), how it was set up with clasp, and how to update the script later without changing the web address.
- A new Google Sheet "PARSH'S Orders (3D site)" with Code.gs attached, set up with clasp (Google's Apps Script tool, run with npx, nothing added to the website), and a web app deployment "3D site orders" (Execute as: me, Access: anyone; asks only for "spreadsheets this app is installed in"). The old Sheet, script and deployment were not touched.

### Changed
- `js/cart-panel.js` — new setting `SHEET_WEB_APP_URL` (the "3D site orders" address). When "Send order on WhatsApp" is pressed, a copy of the order goes to the Sheet at the same moment with the same order number, in the background (fetch with keepalive, no-cors). The site never waits for it and never shows the customer an error from it.
- `SITE-PLAN.md` section 8 — the 3D site logs to its own new Sheet with 3 new columns at the end (Site, Order no., Notes); the old site keeps "PARSH'S Orders" and its dashboard.
- `SITE-PLAN.md` section 9 — new before-launch item: point the dashboard to the new Sheet.

## 2026-11-16 — Phase 3, Step 5: Cart panel and the WhatsApp order
### Added
- Cart panel in `index.html`: a native modal dialog with "Your order" heading and close button; the list of items; an empty state ("Your order is empty. Pick something from the menu.", "See the menu", and "Reorder your last order" when there is one); the details form (name, mobile number, Pickup or Delivery with "at the restaurant" / "within 5 km", delivery address only for Delivery, optional notes, and a hidden trap box for spam robots); a bottom bar with the total and "Send order on WhatsApp"; and an "Order ready in WhatsApp" view with the order number and an "Open WhatsApp" link in case it did not open. The header "Your order" button now opens it.
- `css/cart.css` — raised Griddle panel with a lit edge and deep shadow over a dimmed page. Slides up from the bottom on phones and in from the right from 640 px, in 0.3 s, both opening and closing (Firefox and Safari too); with "reduce motion" it just appears. − / quantity / + in a sunk pill, prices in amber, Pickup / Delivery as two choice boxes, the address box opens smoothly (0.25 s). Errors in amber with a "!" mark and written text, shown only after the visitor leaves a box or presses Send.
- `js/cart-panel.js` — opens and closes the panel (close button, Esc, tap outside, "Done"); shows items with − / + (1 to 10) and Remove without losing keyboard focus; total in ₹; screen readers hear each change. Form checks: name 2–40 letters (English or Telugu), a 10-digit Indian mobile starting 6–9 (+91, 0, spaces and dashes are allowed and cleaned), Pickup or Delivery, address required only for Delivery (max 200), notes max 200. Send makes an order number (PD-1000 to PD-9999) and opens WhatsApp to +91 77805 30607 with the order typed (order number, items, total, name, phone, Pickup or Delivery, address only for Delivery, notes only if written). Then the cart empties, the form clears, and the dishes are saved as the "last order". If the trap box is filled, nothing is sent. No Google Sheet yet.

### Changed
- `js/cart.js` — new shared functions for the panel: change quantity, remove, empty the cart, total price, ₹ formatting (₹1,499 style), "last order" save / read / reorder (dishes and order number only — no name, phone or address), and a change signal so the panel and header count stay in step.
- `index.html` — links `css/cart.css` and `js/cart-panel.js`; the "Your order" button says it opens a dialog.

## 2026-11-16 — Phase 3, Step 4: Menu section and the Add button
### Added
- Menu section in `index.html`, right below the hero (`id="menu"`, so the header "Menu" link and the hero "See the menu" button jump here): heading "The menu", the line "Pick your dishes and tap Add. You send the order to us on WhatsApp.", and the 4 dishes with their exact names, short lines and prices (₹220, ₹150, ₹260, ₹190). Photos: burger, chocolate shake, ribbon pasta, French toast (the cherry shake and penne photos stay in `assets/images/`, unused). Photos load only when scrolled near (lazy loading). A hidden status line tells screen readers what was added.
- `css/menu.css` — raised Griddle cards with a lit top edge, thin outline and deep soft shadow; each photo cut to a square under its own still amber spotlight with darker edges. One card per row on phones, 2 from 640 px, 4 from 1088 px; names, lines and prices line up across a row. Price in streetlight amber; neon pink Add button that presses in. Cards lift a little on mouse-over (computers only, as in the motion map). The header count "ticks up" once (0.2 s).
- `js/cart.js` — the 4 dishes (exact names and prices for the order and the Google Sheet), the cart saved in the browser (survives a refresh; old or edited saved data is cleaned on load), at most 10 of one dish, and the header "Your order" count. Keeps the count the same across tabs.
- `js/menu.js` — Add buttons: press-in, count ticks up, small "Added" note (fades in and out in 0.2 s, stays about 1.4 s). At 10 of one dish it shows "Max 10" instead.

### Changed
- `index.html` — links `css/menu.css` and `js/menu.js`.
- `js/motion.js` — new end point for the burger opening, the same rule on phones and computers: fully open just before the open burger's top bun reaches the header (8 px below it), so the whole open burger is always in view. Measured: the open top bun sits 14.6% down the burger box; the rule uses 14%. Result: fully open after about 174 px of scrolling on a 1440 × 900 desktop (was 150 px) and about 490 px on a 375 px phone (was about 450 px). The 150 px minimum was removed.
- `js/motion.js` — computers only (from 832 px): while the burger opens, it and its "Drag to spin" hint drift gently down, moving up the screen at half the page's speed (a light depth effect, a GSAP transform; no pinning, the page never stops). This doubles the opening's scroll time on a 1440 × 900 desktop, from about 174 px to about 348 px, and it still ends fully open 8 px below the header. The drift stops when the burger is fully open; the burger then stays about 174 px lower and scrolls away normally. Phones: no drift. "Reduce motion": no drift, and switching it on mid-visit puts the burger back in place.
- `.gitignore` — `.claude/launch.json` (the preview server settings for Claude Code's preview tool, now on port 3000) is kept on this computer only and never saved to GitHub.

## 2026-11-15 — Phase 3, Step 3 fix: Solid burger layers
### Added
- `tools/burger/solidify.mjs` — fills the empty middles of the 3D burger's layers (the original model only had their outsides): bread-coloured cut sides on both buns, a lettuce disc with thickness, a tomato-red top and patty-brown bottom on the filling. Colours measured from the model's texture. Hidden when the burger is closed.

### Changed
- `assets/models/burger.glb` — rebuilt with solid layers and a smaller opening. 1.77 MB → 1.79 MB (1,851,120 → 1,875,328 bytes). Closed burger checked against the old one: 99.98% of pixels unchanged; the backup still image did not need remaking.
- `tools/burger/animate.mjs` — smaller opening: top bun 0.85 (was 1.1), lettuce 0.55 (was 0.7), filling 0.25 (was 0.35).
- `tools/burger/README.md` — new solidify step in the rebuild order, new expected size, and a check that the closed burger still matches the still image.
- `CREDITS.md` — the 3D burger's "changes made" now mentions the solid middles (the CC-BY licence asks us to say what we changed).

## 2026-11-15 — Phase 3, Step 3: Smooth scrolling and the burger opening
### Added
- `js/motion.js` — loads after the page has appeared. Starts light Lenis smooth scrolling for the mouse wheel (phones keep their own touch scrolling), sharing GSAP's clock with ScrollTrigger. Sets up the ONE scroll moment: once the 3D burger is ready, scrolling from the hero toward the next section moves its "open" animation forward; scrolling back closes it. Follows the scroll exactly, no pinning. While it opens, the 3D camera moves back 20% and aims slightly higher so the top bun stays in view; closed = the starting camera, matching the still image. Fully open when the burger box reaches just below the header (at least 150 px of scrolling on computers). Nothing runs with "reduce motion" on, and switching it on mid-visit closes the burger and stops smooth scrolling. Skipped quietly when the backup image is showing.

### Changed
- `js/hero-burger.js` — sends a "burger:ready" signal when the 3D burger is ready.
- `index.html` — links `vendor/lenis/lenis.css` and `js/motion.js`.

## 2026-11-15 — Phase 3, Step 2: Hero with the 3D burger
### Added
- Hero section in `index.html`: small round "100% Halal" badge, heading "Hot off the griddle.", line "Smash burgers and hand-spun shakes.", buttons "See the menu" (→ #menu) and "How ordering works" (→ #how-to-order), the burger and a "Drag to spin" hint.
- `css/buttons.css` — shared button styles: solid pink (main action) and pink outline (second choice), glow brighter on mouse-over, press-in on tap.
- `css/hero.css` — hero layout (burger below the text on phones, on the right from 832 px), halal badge, big heading, still pink haze and amber glow behind the burger.
- `js/hero-burger.js` — shows the backup still image first; after the page has appeared, loads model-viewer and `burger.glb` and swaps them in once fully ready. Keeps the still image if the device has no 3D support, has "data saver" on, or loading fails. Drag or arrow keys spin it sideways only; no zoom, no auto-spin, no hint animation; up-and-down swipes on phones scroll the page. Same camera and light settings as the still image, so the swap does not jump.

### Changed
- `index.html` — links the 2 new CSS files and the new script.

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
