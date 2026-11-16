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

### 18 · 2026-11-15 · Phase 3, Step 3 · Smooth scrolling and the burger opening
Summary: Added js/motion.js: light Lenis smooth scrolling (mouse wheel only) linked to GSAP ScrollTrigger, and the one scroll moment — the 3D burger opens as you scroll down and closes as you scroll back, with no pinning. The camera eases back while it opens so the top bun stays visible. Off with "reduce motion" and skipped when the backup image shows. js/hero-burger.js now signals when the 3D is ready. Tested at 360px, 375px and desktop, reduce motion on/off/switched mid-visit, no-3D device, and a 4x slower phone (about 58 frames per second).

### 19 · 2026-11-15 · Phase 3, Step 3 fix · Solid burger layers
Summary: The opened burger looked hollow. Diagnosis: the 3D model only had the outside of each layer (the top bun had no bottom; lettuce, tomato and patties were only rings). Chose option A: new tools/burger/solidify.mjs fills each layer's middle (bread cut sides, thick lettuce disc, tomato top, patty bottom, colours taken from the texture) and animate.mjs opens a little less (0.85 / 0.55 / 0.25). burger.glb is now 1.79 MB. The closed burger still matches the backup image (99.98% of pixels unchanged). Updated the tools README and the CREDITS change note.

### 20 · 2026-11-16 · Phase 3, Step 4 · Menu section and the Add button
Summary: Showed the 2 shake and 2 pasta photos side by side; chose the chocolate shake and the ribbon pasta. Built the menu below the hero (index.html, css/menu.css, js/cart.js, js/menu.js): heading, 4 raised dish cards with exact names and ₹ prices, a still amber spotlight on each photo, and an Add button that presses in, ticks up the header count and shows a short "Added" note. The cart is saved in the browser and survives a refresh (max 10 of one dish). 1 card per row on phones, 2 on tablets, 4 on wide screens. Checked at 375px and 1440px: no console errors, Add and count work, refresh keeps the count, Menu link and "See the menu" scroll here, and the burger opening now finishes and closes again on phone and desktop.
Fixes before saving: on computers the burger now opens across the whole scroll from the hero to the menu (js/motion.js); stopped the old preview server and moved the preview to port 3000; added .claude/launch.json to .gitignore; tested reduce motion (no smooth scrolling, burger stays closed, Add still counts with no movement).
Then, because the slow desktop opening hid the top bun under the header: the burger is now fully open just before its top bun reaches the header, on phones and computers (js/motion.js), so the whole open burger is always visible. Measured the open top bun's position (14.6% down the burger box) and checked it: 9–11 px below the header when fully open, at 1440px and 375px.
Then, because the desktop opening felt too fast: on computers the burger now drifts gently down while it opens (half the page's speed, no pinning), so the opening takes about twice the scrolling (about 348 px at 1440 × 900) while the whole burger stays in view. Phones unchanged. Fixed one error found while testing ("Cannot access 'opening' before initialization"). Checked at 1440px, 1024px and 375px, with reduce motion on, and with reduce motion switched on mid-visit.

### 21 · 2026-11-16 · Phase 3, Step 5 · Cart panel and the WhatsApp order
Summary: Planned the panel and showed an example WhatsApp message; decided not to remember the customer's name and phone, and to use 4 random digits for the order number until the Google Sheet step. Built the cart panel (index.html, css/cart.css, js/cart-panel.js, more functions in js/cart.js): a native modal dialog that slides up on phones and in from the right on computers (0.3 s, appears instantly with reduce motion), items with − / + and Remove, ₹ total, empty state with "See the menu" and "Reorder your last order", the details form with errors next to each box, a hidden spam trap, and "Send order on WhatsApp" with an order number like PD-1432. After sending: "Order ready in WhatsApp", the cart empties and the order is saved as the last order. Testing found and fixed two form problems: the mobile number rule was ignored by the browser (a wrongly written symbol), and Telugu names were refused. Checked at 375px and 1440px with chrome-devtools. No Google Sheet yet.

### 22 · 2026-11-16 · Phase 3, Step 6 · Google Sheet order log
Summary: Wrote apps-script/Code.gs (only adds rows; checks every order against our 4 dishes and real prices; spam limits; trap box; formula guard; old column order plus Site, Order no., Notes) and apps-script/README.md, and made the site send a copy of each order to the Sheet in the background with the same order number (js/cart-panel.js). Matched the old rows' date and time format exactly (UTC timestamp, YYYY-MM-DD, HH:MM:SS). Then, on request, did the Google setup with clasp instead of the README: fixed a broken npx download folder, signed in, and — on request — created a fresh Sheet "PARSH'S Orders (3D site)" instead of using the old one. Uploaded the script, limited it to the one spreadsheet permission, deployed "3D site orders", put its address in SHEET_WEB_APP_URL, updated SITE-PLAN.md, and sent one TEST ORDER (PD-4786) from the site. Old Sheet and deployment untouched.
Then: kept the new Sheet, added "Point the dashboard to the new Sheet" to the before-launch checklist, rewrote apps-script/README.md for the new Sheet and clasp, fixed the comment at the top of Code.gs, and saved apps-script/appsscript.json.

### 23 · 2026-11-16 · Phase 3, Step 7 · The rest of the home sections
Summary: Showed a plan and the exact words for How ordering works, Why order direct, Hours and visit and the final call to action, using only facts from SITE-PLAN.md, and suggested the unused cherry shake and penne photos don't fit (delete before launch, after asking). After "go", built the 4 sections (index.html, new css/sections.css, new js/order-now.js): one raised panel with 3 numbered steps, 3 direct-order points, a Visit board with address, Google Maps link (new tab), Pickup / Delivery within 5 km, hours, and 100% halal / Est. 2024 tags, and a big final line with "Order now" (opens the cart when it has items, otherwise goes to the menu). Checked at 360px, 375px and 1440px with chrome-devtools: no console errors, no sideways scrolling, header links land below the header, Order now works both ways, and the ordering flow still works (Pickup and Delivery messages correct; the WhatsApp and Sheet sends were captured in the test, not really sent). Fixed one thing found while testing: the step headings didn't line up on desktop.
