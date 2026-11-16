# CHANGELOG.md — what changed, and when

Newest changes at the top.

---

## 2026-11-16 — Phase 4, Step 5 follow-up: Search Console tag, WhatsApp preview checked
Pardha checked the live site: the WhatsApp preview shows "PARSH'S" fully, and new Sheet rows show India time in Date and Time. The test rows were deleted.

### Added
- `index.html`: the Google Search Console verification tag (`google-site-verification`), in the head next to the other meta tags. It proves to Google that we own the site. It is not a secret. The privacy and 404 pages don't have it, because Google needs it only on the home page.

### Changed
- `SITE-PLAN.md` before-launch checklist: one line held two checks, so it is now two lines. "Check the share preview by sending the link in WhatsApp" is ticked. "Test the home page in Google's Rich Results Test" is still open.

### Checked
- Local preview, in the app's built-in browser: the tag is in the head exactly once, no console errors. Ordering flow correct: totals ₹590 and ₹440, and the Delivery and Pickup WhatsApp messages and Sheet data are right. The sends were captured in the test, so no row was added.
- Not yet checked: verification in Search Console. That works only after the push, and Pardha clicks **Verify** there.

## 2026-11-16 — Phase 4, Step 5: Final-address items, India time in the Sheet, new share image
Uses the live address https://parshs-diner-3d.vercel.app.

### Added
- `sitemap.xml`: the home page and the privacy page, with their full addresses.
- `robots.txt`: a "Sitemap:" line with the sitemap's full address.
- `index.html` and `privacy.html`: a canonical link (the page's main address), `og:url`, `og:image:type`, `twitter:image` and `twitter:image:alt`.
- `index.html` Restaurant details for Google: `"url"`.

### Changed
- `apps-script/Code.gs`: the Date (B) and Time (C) columns are now India time (Asia/Kolkata), using a new `TIME_ZONE` setting. Before, they were UTC, so a 2:35 pm order showed as 09:05. Column A (full timestamp) keeps its UTC format, so the monthly clean-up still reads it the same way. `appsscript.json` already said Asia/Kolkata, so it did not change. Uploaded with clasp; the same deployment "3D site orders" now runs version 4, so the web address did not change. The old Sheet and old script were not touched.
- `apps-script/README.md`: the column notes, the settings-file note and the status line say the above.
- `index.html` and `privacy.html`: `og:image` is now the full address of the share image, and its alt text describes the new layout. `index.html`: `"image"` and `"hasMenu"` in the Restaurant details are full addresses.
- `tools/share-image/share.html` and `assets/images/share.jpg`: new layout. WhatsApp shows the share image as a small square cut from the middle, which cut off "PARSH'S". Now the name, "Diner", the 100% halal badge and the burger all sit inside the centre 630 × 630 square; "Kakinada / Jagannaickpur / Est. 2024" and "Order on WhatsApp / Pickup, or delivery within 5 km" sit at the sides as extras. Same colours, fonts and burger image. Still 1200 × 630, now 69 KB (was 76 KB). Exported with Chrome's headless screenshot mode, because the chrome-devtools browser was busy in another chat.
- `SITE-PLAN.md`: ticked 4 before-launch items (canonical link, full share-image address and og:url, full addresses in the Restaurant details, sitemap) and noted that all of them must change if the web address changes. "Check the share preview in WhatsApp" stays open.

### Checked
- Local preview, in the app's built-in browser: home and privacy pages have the right canonical, og:url, og:image and twitter:image addresses; the Restaurant details still read correctly; sitemap.xml and robots.txt open; no console errors.
- The ordering flow: add, change quantity, remove, totals (₹630, ₹850, ₹590, ₹190), and the Delivery and Pickup WhatsApp messages and Sheet data are correct; the address box closes for Pickup. The WhatsApp and Sheet sends were captured in the test, so no row was added.
- The order web address still answers "PARSH'S Diner order log is running." after the update.
- Not yet checked: the new share image and sitemap.xml on the live site (they go online after the push), WhatsApp's preview, and the India time in a real Sheet row (Pardha tests that).

## 2026-11-16 — Phase 4, Step 4: The site is online (Vercel, free Hobby plan, demo only)
Live address: https://parshs-diner-3d.vercel.app. A new Vercel project "parshs-diner-3d" (Framework: Other, no build), connected to the GitHub repository Pardha-Narayana/parshs-diner-3d, so every push to main updates the site. The old Vercel project (parsh_s_diner) was not touched. The free Hobby plan does not allow business sites, so this is a demo until launch.

### Added
- `.vercelignore`: keeps everything that is not the website off the internet: `tools/`, `apps-script/`, `.claude/`, `skills-lock.json`, every `.md` notes file, `.gitignore` and any `.env` file.
- SITE-PLAN.md before-launch checklist: "Before real customers use the site, move it to Vercel Pro or a free host that allows business use."

### Checked on the live site
- With chrome-devtools at 375 px and desktop: home, /privacy and a made-up address (our 404 page) work, with no console errors and no sideways scrolling. The 3D burger loads after the first scroll.
- The ordering flow: add, change quantity, remove, totals (₹590, ₹520, ₹300, ₹450), and the Pickup and Delivery WhatsApp messages and Sheet data are correct. The WhatsApp and Sheet sends were blocked in the test, so no row was added.
- Not reachable online (all give 404): `tools/` pages and files, `apps-script/Code.gs`, `CLAUDE.md`, `PROMPTS.md`, `.claude/`, `skills-lock.json`, `.env.local`, `.vercel/`.

## 2026-11-16 — Phase 4, Step 3: Full test before launch, and 4 fixes
Full test with chrome-devtools at 360, 375, 768 and 1440 px: every section, link and button, header, 3D burger, cart, form checks, Pickup and Delivery, WhatsApp message, Sheet data (sends blocked, no row added), reorder, footer, privacy and 404 pages, reduce motion, keyboard only, no sideways scrolling, no console errors, no "TODO/placeholder/lorem". Main heading at about 2.2 s on a simulated slow phone with slow 4G. Lighthouse at phone size: Accessibility, Best Practices and SEO 100. It found 3 problems and 1 colour-rule slip, fixed below.

### Added
- `apps-script/Code.gs`: a separate monthly job, `deleteOldOrders`, that deletes order rows older than 6 months, as the privacy page promises. It looks only at column A (timestamp), never touches row 1, and keeps any row whose date it cannot read. It runs only from a monthly timer in Google (1st of the month, 3–4 am), never from the website: the web address only runs `doPost` and `doGet`, which never call it. No new Google permission. Uploaded with clasp; the same deployment was updated (version 3), so the web address did not change. The timer was added by hand by Pardha.
- `apps-script/README.md`: what the monthly job does, how to add its timer, how to see its runs, and its status.

### Changed
- `apps-script/Code.gs` (top comment), `apps-script/README.md`, `SECURITY.md`, `SITE-PLAN.md` section 8, `CLAUDE.md` section 9 and `README.md`: "the script only adds rows / never deletes" now says the web part only adds rows, and a separate monthly job, started only by a Google timer, deletes rows older than 6 months.
- `index.html` and `js/cart.js`: screen readers now hear "1 item" instead of "1 items" on the "Your order" button.
- `css/home.css`: the footer phone number is neon pink (it can be tapped) instead of streetlight amber.
- `SITE-PLAN.md`: the 3D burger size is the real 1.79 MB in both places (was 1.76 MB and 1.37 MB). README.md has no size, so nothing to change there.

## 2026-11-16 — Phase 4, Step 2: Faster main heading
Lighthouse at phone size, home page: Performance about 90 → 96 (3 runs: 96, 92, 96); the main heading appears at about 2.7 s instead of about 3.0 s (simulated slow phone). Accessibility, Best Practices and SEO stay 100. Privacy page stays 100 / 100 / 100 / 100. Screenshots of the home, privacy and 404 pages at phone and desktop size are pixel-identical before and after.

### Added
- `css/site.css`: the shared styles for every page (tokens, base page, header, buttons), joined unchanged and in the same order.
- `css/home.css`: the home page styles (hero, menu, more sections, cart, footer and the Lenis styles), joined unchanged and in the same order.
- SITE-PLAN.md "Later" list: smaller 3D burger textures.

### Changed
- `index.html`: 2 style files instead of 10. Only the heading font (Big Shoulders Display) is downloaded early; the body font loads normally. No layout shift.
- `privacy.html` and `404.html`: `css/site.css` instead of the 4 shared files (`css/page.css` stays).
- `js/hero-burger.js`: the "can this device show 3D?" check now runs at the visitor's first action, not when the page opens. The check starts the phone's graphics engine, which took about 0.5 s even on a fast computer.
- `js/cart-panel.js`, `js/cart.js`, `js/header.js`, `js/order-now.js`: comments now name `css/site.css` or `css/home.css` instead of the old files. No code change.
- `tools/share-image/share.html` (design tool, not part of the website): links `css/site.css` instead of `css/tokens.css`, with a note that the text now sits a few px lower, so a remade share.jpg should be compared with the current one first. `assets/images/share.jpg` is unchanged.

### Removed
- The 9 old style files, after asking: `css/tokens.css`, `base.css`, `header.css`, `buttons.css`, `hero.css`, `menu.css`, `sections.css`, `cart.css`, `footer.css`. `vendor/lenis/lenis.css` is kept with the Lenis library, unused.

### Found
- The "RangeError: Invalid typed array length: 4" seen in earlier tests came from the test itself: the test blocker answered every download (including the burger file) with 2 bytes. A clean tab shows no console errors, and the 3D burger loads.

## 2026-11-16 — Phase 4, Step 1: Speed and quality fixes
Lighthouse at phone size, home page: Performance 58 → about 90 (3 runs: 69, 94, 90). Accessibility, Best Practices and SEO stay 100. Privacy page stays 100 / 100 / 100 / 100. First-load size of the home page: 2,736 KB → 676 KB. Blocking time: 6,340 ms → 0 ms (2 of 3 runs).

### Added
- 12 smaller WebP copies of the 4 menu photos in `assets/images/` (`menu-…-480.webp`, `-800.webp`, `-1200.webp`), made with the existing image tool in `tools/burger`. Same photos and crop.
- `vercel.json`: browser "keep this" rules (cache): fonts for 30 days; photos, the 3D burger and the vendor libraries for 7 days. Pages, CSS and JS are not cached long, so updates show at once. Only works once the site is online.

### Changed
- `js/hero-burger.js`: the 3D burger now starts loading at the visitor's first scroll, touch, mouse move or key press, not by itself after the page appears. Until then the matching still image shows. Drag-to-spin and the scroll opening are unchanged.
- `index.html`: the 4 menu photos use the WebP copies, and the browser picks the size it needs (`srcset` and `sizes`). The wider burger and pasta photos get a larger size hint so they stay sharp.
- `CREDITS.md`: the 4 photo rows now name the WebP copies.

### Not changed
- `assets/models/burger.glb`: a smaller "quantized" copy came out bigger (1.42 MB vs 1.37 MB), and stronger compression would need an extra decoder library. Left as it is.

### Removed
- The 4 original JPEG menu photos (`menu-burger.jpg`, `menu-milkshake-chocolate.jpg`, `menu-pasta-tagliatelle.jpg`, `menu-french-toast.jpg`), no longer used on the page, after asking. CREDITS.md now lists the WebP copies only.

## 2026-11-16 — Phase 3, Step 9: Search and sharing basics
### Added
- Browser-tab icon `assets/images/icon.svg`: a cream "P" with a warm amber glow, like a lit shop sign, on the Griddle colour. The P is drawn as a shape, so it looks the same everywhere.
- Phone home-screen icons `assets/images/apple-touch-icon.png` (180 px), `icon-192.png` and `icon-512.png`: the same P with more space around it, so Android can cut it into a circle.
- `site.webmanifest`: tells Android phones the site's name, colours and icons.
- Share image `assets/images/share.jpg` (1200 × 630, 76 KB): the closed burger with the site's amber and pink glow, the "100% Halal" badge, "PARSH'S DINER", "Kakinada" and "Order on WhatsApp for pickup or delivery".
- `tools/share-image/share.html` and `icon.html`: the design pages the share image and PNG icons were screenshotted from. They are not part of the website.
- Share tags (Open Graph and X/Twitter) on `index.html` and `privacy.html`: share title, description, image, image size and image description, locale en_IN.
- Restaurant details for Google (schema.org Restaurant) in `index.html`: name, description, address, phone, opening hours, servings (burgers, milkshakes, pasta, French toast), price range ₹150–₹260, Est. 2024, menu link, Google Maps link, 100% halal, Pickup, Delivery within 5 km, and ordering on WhatsApp.
- `robots.txt`: allows all search engines.
- SITE-PLAN.md before-launch checklist: 5 items that need the final web address (canonical link; full addresses for the share image and Google details; sitemap.xml with a Sitemap line in robots.txt; testing the WhatsApp preview and Google's Rich Results Test).
- CREDITS.md: rows for the icons and the share image.

### Changed
- `index.html`, `privacy.html`, `404.html`: page language is now "en-IN" (English, India). The empty placeholder tab icon is replaced by the real icons and the manifest.
- `privacy.html`: title is now "Privacy | PARSH'S Diner, Kakinada".

### Removed
- `assets/images/menu-milkshake-cherry.jpg` and `assets/images/menu-pasta-penne.jpg` (unused photos) and their CREDITS.md lines.

## 2026-11-16 — Phase 3, Step 8: Footer, 404 page, privacy page and header fix
### Added
- Footer in `index.html`: a big "PARSH'S Diner" sign, the address, "Phone / WhatsApp: +91 77805 30607" (tap to call), "Chat on WhatsApp", a Privacy link, "Website by PARSH" (links to https://parsh-ai.vercel.app), the 3D burger credit — "Hamburger" by Simal Mai, CC BY 4.0, changed by us — with links to the model page and the licence, and © 2026 PARSH'S Diner. Outside links open in a new tab.
- `css/footer.css` — the footer look: Griddle panel with a lit top edge, a still amber pool of light behind the sign, amber phone number, neon-pink links. One column on phones, three on wide screens. Nothing moves.
- `404.html` — our own "page not found" page: "This page isn't on the menu.", "The link may be old, or the address may have a typo." and a "Back to the home page" button. Marked `noindex`, so search engines don't list it.
- `privacy.html` — the privacy page in plain English: what we collect and why, where it goes (the restaurant's WhatsApp and Google Sheet), what stays in the visitor's own browser (only dishes and order number), no tracking, no analytics, no ads, no selling, the hosting company's basic technical records, order records deleted after 6 months, how to ask for deletion on WhatsApp, and "Last updated: 16 November 2026". Same header style, with "Back to home".
- `css/page.css` — shared look for the privacy and 404 pages (header with "Back to home", raised reading panel, big 404 sign).

### Changed
- `js/header.js` — the header now turns solid after a little scroll in EVERY browser. Before, the script only ran in browsers without the new CSS "scroll-state" feature, and in Chrome that feature did not switch on reliably, so the header stayed see-through. `privacy.html` and `404.html` load it too.
- `index.html` — links `css/footer.css`; removed the "Next step adds: the footer" note.

## 2026-11-16 — Phase 3, Step 7: The rest of the home sections
### Added
- 4 sections in `index.html`, below the menu:
  - How ordering works (`id="how-to-order"`): "Three steps. No app, no sign-up." and 3 numbered steps (Pick your food, Add your details, Send on WhatsApp).
  - Why order direct: "Order straight from us" and 3 points (No app to download, Straight to the restaurant with +91 77805 30607, Pickup or delivery within 5 km in Kakinada). No made-up claims or numbers.
  - Hours and visit (`id="visit"`): the address, an "Open in Google Maps" link (opens in a new tab), Pickup at the restaurant, Delivery within 5 km, the hours (Mon – Fri 11:00 AM – 10:00 PM, Saturday 10:00 AM – 11:00 PM, Sunday 10:00 AM – 10:00 PM), and two small tags: 100% halal, Est. 2024.
  - Final call to action: "Order straight from the griddle." and an "Order now" button.
  The header links "How to order" and "Visit" (and the hero's "How ordering works" button) now land on these sections.
- `css/sections.css` — styles for the 4 sections, using only the design-system tokens. One raised Griddle panel holding the 3 steps, each number in a round amber-lit socket (stacked on phones, side by side from 832 px). Small lit amber "bulbs" before the direct-order points and the Pickup/Delivery lines. A raised Visit board with the hours like a diner menu board (dotted line from day to amber time). Still pools of light behind Why order direct (pink), Visit and the final section (amber). A very large sign-style final line. Nothing moves on its own.
- `js/order-now.js` — "Order now": opens the cart when it has items; when it is empty, goes to the menu and puts keyboard focus on the first Add button.

### Changed
- `index.html` — links `css/sections.css` and `js/order-now.js`; the end-of-page note now says only the footer is still to come.

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
