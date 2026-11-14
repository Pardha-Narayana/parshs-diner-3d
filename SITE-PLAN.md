# SITE-PLAN.md — PARSH'S Diner 3D blueprint
The WHAT of the site. CLAUDE.md holds the working rules. If the two ever disagree, ask Pardha.
Every decision here was made in Claude Chat during Phase 1. Change it only with Pardha's approval.

## 1. Project and honesty
- A motion + 3D upgrade of the PARSH'S Diner website. PARSH'S Diner is a real 100% halal diner in Kakinada, Andhra Pradesh, Est. 2024.
- Audience: (1) customers in Kakinada, mostly on phones; (2) people looking at my portfolio — this site is also my portfolio showpiece.
- The one main action: build an order and send it on WhatsApp.
- Honesty: only real facts. No made-up reviews, awards, press or numbers. No owner story, no "We're open now", no "Booked a table for eight". No Google Analytics.

## 2. Technical setup (decided: "A+")
- Plain files: HTML, CSS and JavaScript. No build tool, no package.json.
- Modern JavaScript modules, with an import map in each page so code can write `import gsap from "gsap"`, exactly like the GSAP skills and modern-web-guidance show.
- Libraries (GSAP, Lenis, model-viewer) are downloaded ONCE from their official sources (greensock/GSAP, darkroomengineering/lenis, google/model-viewer) and saved in `vendor/`, with exact versions recorded in CREDITS.md. The site never loads them from another company's server.
- Preview on my computer: Claude Code starts a small local preview server and gives me the address.
- Hosting: chosen at launch. Vercel's free Hobby plan does not allow business sites, so it will be Vercel Pro, or a free host that allows business use. If Vercel: framework "Other", no build command.

Planned folders:
- `index.html`, `privacy.html`, `404.html`
- `css/` — styles
- `js/` — scripts (site, cart, 3D, motion)
- `vendor/` — GSAP, Lenis, model-viewer
- `assets/models/` — the 3D burger
- `assets/images/` — photos, backup burger image, share image, favicon
- `assets/fonts/` — the two fonts, saved in the project

## 3. Design system
Mood: dark night diner (a night street), with calm spacing and big capital headings.

Colours (each has one job):
| Name | Hex | Job |
|---|---|---|
| Night | #1A1220 | Page background |
| Griddle | #2A1C2E | Cards, panels, cart |
| Neon sign | #FF4F6D | Things you tap (buttons, actions) — only these |
| Streetlight | #F7B538 | Prices and highlights — only these |
| Bun cream | #F6E9D8 | All text |

Fonts:
- Big Shoulders Display (700, 900) — big capital headings, like city shop signs.
- Figtree (400, 600) — body text and buttons.

Depth (the site must NOT look flat):
- Real 3D burger with studio light and a soft shadow under it.
- Soft neon glow on buttons and small badges; amber "streetlight" pools of light behind sections.
- Raised cards: lit top edge and deep soft shadow.
- Very fine grain texture over the page.
Reference: the approved depth preview (Design canvas "PARSH'S Diner 3D — Depth preview").

Rule: NOT FLAT, NOT ANIMATED.
- Depth comes from light, shadow, glow and texture — never flat single colours.
- Nothing moves on its own: no bouncing, floating, flickering or auto-spinning.
- Motion only answers the visitor (tap, drag, open, close), plus ONE quiet scroll moment (section 6).
- No slide-in or fade-in on sections as you scroll.

## 4. Pages and sections
Pages: Home (one scrolling page), Privacy, 404.

Home sections, in order:
1. Header — PARSH'S logo, links (Menu, How to order, Visit), "Your order" button with item count.
2. Hero — big heading, one short line, two buttons ("See the menu", "How ordering works"), the 3D burger (drag to spin).
3. Menu — the 4 dishes; each dish: photo, name, short line, price, Add button.
4. How ordering works — 3 steps: pick your food → add your details → send on WhatsApp.
5. Why order direct — for customers: order straight from the restaurant on WhatsApp, no app needed.
6. Hours and visit — real address, map link, hours, "Delivery within 5 km".
7. Final call to action — one big line and an "Order now" button.
8. Footer — "Website by PARSH" (links to my portfolio), privacy link.

Always on screen: a "Your order" button that opens the cart panel (section 8).

Feature — Your last order: after sending, the order is saved in the browser; next time the cart shows "Reorder your last order".

## 5. Content
Menu: ONLY these 4 dishes. Use these exact names — the Google Sheet uses them. Short lines are from the old site.

| No. | Dish name (exact) | Short line | Price |
|---|---|---|---|
| 01 | Griddle-Smashed Burger | Juicy, edge-charred patties stacked with melted cheese on a toasted bun. | ₹220 |
| 02 | Hand-Spun Milkshake | Thick, cold, and made-to-order in classic diner flavors. | ₹150 |
| 03 | Homemade Pasta | Slow-simmered sauces tossed fresh, served hot off the pan. | ₹260 |
| 04 | Caramelized Banana French Toast | Golden brioche toast topped with warm, caramelized banana. | ₹190 |

Note: the old site also showed a small tag on each card ("House favorite", "Crowd pleaser", "Chef's pick", "Signature"). These are not copied here; whether to keep them is for Pardha to decide.

Photos:
- For now: free stock photos from Unsplash. 3 options per dish, chosen in Phase 2. Each one recorded in CREDITS.md.
- Later: replace them with real photos of our own dishes.

Contact:
- WhatsApp and phone: +91 77805 30607.
- WhatsApp order link opens a chat with this number and the order pre-typed.

Hours and visit:
- Address: Near Church Square centre, Jagannaickpur, Kakinada, Andhra Pradesh 533002.
- Map: https://maps.app.goo.gl/GvMQWYbLxqMJfsXBA
- Hours:
  - Mon – Fri: 11:00 AM – 10:00 PM
  - Saturday: 10:00 AM – 11:00 PM
  - Sunday: 10:00 AM – 10:00 PM
- Pickup at the restaurant, or Delivery within 5 km in Kakinada.
- 100% halal. Est. 2024.

Words: plain, friendly, honest. No made-up claims, awards or numbers.

## 6. Motion map
| Where | What moves | When | Speed |
|---|---|---|---|
| Whole page | Light smooth scrolling (Lenis) — never slow or "hijacked" | While scrolling | Natural |
| Page opening | Nothing — content appears straight away | — | — |
| Header | Background turns solid so links stay readable | After a little scroll | Quick fade |
| 3D burger | Still at rest; drag to spin (finger, mouse, or arrow keys). Never spins by itself. No zoom. | When dragged | Follows the hand |
| ONE scroll moment | Burger layers gently separate as you scroll from the hero toward the menu; close again when scrolling back. Moves only while scrolling. | While scrolling | Follows the scroll |
| Sections | No slide-in | — | — |
| Add button | Presses in; order count ticks up once; small "Added" note | On tap | 0.2 s |
| Cart panel | Slides in from the right (from the bottom on phones) | Open / close | 0.3 s |
| Delivery address | Address box opens smoothly | When Delivery is chosen | 0.25 s |
| Hover (computer only) | Buttons glow slightly brighter; cards lift a little | Mouse over | 0.2 s |

Reduce motion ON: no smooth scrolling, no scroll moment (burger stays closed), panels appear instead of sliding.

## 7. 3D plan
- One semi-realistic burger model (not cartoon) with separate layers: top bun, lettuce, cheese, patty, bottom bun.
- Free licence that allows use (CC0, or CC-BY with credit). Sources: Poly Pizza, Sketchfab. Recorded in CREDITS.md.
- Under about 2 MB after shrinking.
- Claude Code adds the "opening" animation to the file once, with a free tool. The website only uses model-viewer.
- Scroll controls the opening animation (GSAP ScrollTrigger sets the animation's time).
- Placement: hero, right side on computers, below the heading on phones.
- Backup still image of the same burger shows first, and stays on phones that can't run 3D.
- The 3D file loads after the page appears.

## 8. Ordering plan
Journey:
1. Add items → cart saved in the browser (survives refresh).
2. Cart panel: items, + / − quantity, remove, total in ₹.
3. Details: name (2–40 letters), phone (10-digit Indian mobile), Pickup (at the restaurant) or Delivery — with "Delivery within 5 km" shown next to the Delivery choice — address ONLY for Delivery (max 200 characters), notes (optional, max 200).
4. "Send order on WhatsApp" → WhatsApp opens with the order typed: order number, items, total, name, phone, Pickup/Delivery, address (Delivery only), notes.
5. At the same moment a copy goes to the Google Sheet with the SAME order number (like PD-1432). The site never waits for the Sheet.
6. "Order sent" message → cart empties → order saved as "last order".
Errors show next to the box, for example "Enter a 10-digit mobile number."
Known limit: the customer must still press Send in WhatsApp. The Sheet shows orders started; WhatsApp shows orders sent.

Google Sheet: the same "PARSH'S Orders" Sheet and dashboard as the old site. Add ONE new column at the END: "Site" = "3D". Do not change existing columns.

Apps Script protections (a new, upgraded script):
- Only adds rows — cannot read, change or delete anything.
- Checks every order: required fields, length limits, max 10 of one item, sensible totals.
- Spam limits: at most 3 orders per phone number in 10 minutes, and a cap on orders per minute overall.
- Hidden trap box in the form: if filled, the order is ignored.
- Formula guard: text starting with =, +, - or @ is made harmless.
- The new script's web address is added in Phase 3.

## 9. Before launch (checklist)
- [ ] Every page checked on a real phone, on mobile data (not Wi-Fi)
- [ ] A test order sent: WhatsApp message correct AND a row arrived in the Sheet (then delete test rows)
- [ ] Cart, quantities, total, Pickup/Delivery all work
- [ ] No placeholder text, "TODO" or "lorem" anywhere
- [ ] Own 404 page works
- [ ] Every page has a title, description, share image and favicon
- [ ] Images and 3D model are small; page loads in under 3 seconds on mobile
- [ ] Reduce motion works; keyboard works; text easy to read
- [ ] Every image, font, model and library listed in CREDITS.md
- [ ] README and CHANGELOG are true
- [ ] Address, map link and hours are correct
- [ ] Hosting plan allows business use

## 10. Later list (not in this version)
- Second language (Telugu or Hindi), checked by a native speaker.
- Custom domain.
- A bigger custom 3D scene (Three.js).
- Menu filter: tap a group name to jump to it — when the menu grows.
- Real photos of our own dishes (to replace the stock photos).
