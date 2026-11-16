# PARSH'S Diner 3D

A motion + 3D upgrade of the PARSH'S Diner website, built by Pardha (PARSH). It is also Pardha's portfolio showpiece.

> **PARSH'S Diner is a real restaurant:** a 100% halal diner, Est. 2024, Near Church Square centre, Jagannaickpur, Kakinada, Andhra Pradesh 533002. Map: https://maps.app.goo.gl/GvMQWYbLxqMJfsXBA

- **Live site (new version):** https://parshs-diner-3d.vercel.app — online as a demo on Vercel's free Hobby plan (see section 4).
- Old version (reference): https://parshsdiner.vercel.app

## 1. What this site is, and who it is for
- **For:** customers in Kakinada (mostly on phones). Also restaurant owners who might hire me, as my portfolio showpiece.
- **Pages:** the home page (hero with a 3D burger you can spin, the menu of 4 dishes, how ordering works, why order direct, address, map link and hours), a privacy page, and our own "page not found" (404) page.
- **What visitors can do:** browse the menu, add dishes to a cart, choose Pickup at the restaurant or Delivery within 5 km in Kakinada, and send the order on WhatsApp.
- **Type of site:** static (finished pages only). No logins, no database of our own, no server of our own.

## How orders work
1. The visitor taps **Add** on dishes. The cart is saved in their own browser.
2. In the cart they enter their name, mobile number, Pickup or Delivery, and notes (optional). The site asks for a delivery address only when Delivery is chosen.
3. **Send order on WhatsApp** opens WhatsApp (a wa.me link to the restaurant's number, +91 77805 30607) with the order typed out, including an order number like PD-1432. The customer presses Send in WhatsApp to finish.
4. At the same moment, a copy of the order goes in the background to the Google Sheet **"PARSH'S Orders (3D site)"** through a Google Apps Script web address. The site never waits for the Sheet.
5. Known limit: the Sheet shows orders *started*; WhatsApp shows orders actually *sent*.
6. The Apps Script only adds rows and checks every order (real dishes and prices, length limits, spam limits). A separate monthly job inside Google deletes rows older than 6 months. Details: `apps-script/README.md` and `SECURITY.md`.

## 2. Tools used to build it
- Motion: GSAP + Lenis (smooth scrolling).
- 3D: model-viewer.
- Preparing 3D files (not used by the live site): gltf-transform, run with `npx @gltf-transform/cli@4.5.1`. Use version 4.5.1 — version 4.1.1 fails on Windows with the error "colourspace: parameter space not set" (it mixes two versions of its image library).
- Built with Claude Code, with these helpers: frontend-design, modern-web-guidance, GSAP skills, chrome-devtools.
- Hosting: GitHub (code) + Vercel (live site). Now on Vercel's free Hobby plan as a demo; before real customers use it, it must move to Vercel Pro or a free host that allows business use (the Hobby plan does not allow business sites).

## 3. How to run it on your computer
The site is plain files. There is no build step.

1. Install [Node.js](https://nodejs.org) (it includes `npx`).
2. Open a terminal in the project folder.
3. Run `npx serve -l 3000`. This downloads the small "serve" tool for that run only; nothing is added to the project.
4. Open http://localhost:3000 in your browser.
5. When you are done, stop the preview server with Ctrl + C in the terminal.

## 4. How to put it online (deploy)
Plain files, no build step.
- **Now:** Vercel project "parshs-diner-3d" (Framework: Other, no build command), connected to the GitHub repository `Pardha-Narayana/parshs-diner-3d`. Every push to the `main` branch updates https://parshs-diner-3d.vercel.app automatically.
- `vercel.json` holds clean web addresses (no `.html`), safety headers and cache rules. `.vercelignore` keeps `tools/`, `apps-script/`, `.claude/`, the `.md` notes files and `.env` files off the live site.
- **Before real customers:** move to Vercel Pro or a free host that allows business use (Vercel's free Hobby plan does not allow business sites). On any host the settings are the same: no build command; the site is the project folder itself. If the web address changes, update the full addresses listed in `SITE-PLAN.md` (section 9).
- Google Search Console is verified for the live address, and `sitemap.xml` is submitted.

## 5. Settings and secrets (environment variables)
None. This site uses no passwords, keys or tokens.
If one is ever needed, it goes in a `.env` file (never uploaded — see `.gitignore`) and in Vercel's settings, never in the code.

## 6. Outside services
| Service | What it is used for | Account | Cost |
|---|---|---|---|
| GitHub | Stores the code and its history | Pardha-Narayana | Free |
| Vercel | Puts the site online (https://parshs-diner-3d.vercel.app) | Pardha's account | Free Hobby plan for now (demo only). Must move to Vercel Pro (paid) or a free host that allows business use before real customers. |
| WhatsApp (wa.me link) | Customers send their order | The restaurant's WhatsApp, +91 77805 30607 | Free |
| Google Apps Script + Google Sheet "PARSH'S Orders (3D site)" | Logs a copy of each order; monthly clean-up of old rows | Pardha's Google account | Free |
| Google Search Console | Shows how Google finds the site | Pardha's Google account | Free |

## 7. Recurring costs and renewals
None yet (everything is on free plans). If the site moves to Vercel Pro, note its monthly cost and renewal date here. If a custom domain is added later, note its yearly renewal date here.

## 8. Things that are unusual on purpose
- Only real facts. No made-up reviews, awards, press or numbers.
- Dish photos are free stock photos (Unsplash) for now. They must be replaced with real photos of our own dishes.
- The Google Sheet order address is visible in the page code (normal for a static site). The Apps Script behind it only adds order rows and checks the data; a separate monthly job, started only by a timer inside Google, deletes orders older than 6 months. See SECURITY.md.

## 9. Project files
- `CLAUDE.md` — standing rules for Claude Code.
- `SITE-PLAN.md` — pages, design system, motion map, the before-launch checklist and the "Later" list.
- `README.md` — this file.
- `PROMPTS.md` — every prompt given to Claude Code.
- `CHANGELOG.md` — what changed, and when.
- `CREDITS.md` — images, fonts, icons, 3D models and libraries, with licences.
- `SECURITY.md` — how secrets and orders are kept safe.
- `.gitignore` — files Git must never save.
- `vercel.json` — Vercel settings. `.vercelignore` — files Vercel must never publish.
- `apps-script/` — the Google Apps Script for the order Sheet, and how to update it (not published on the site).
- `tools/` — helper pages for the burger still image and the share image (not published on the site).
- `.claude/skills/` and `skills-lock.json` — the GSAP skills used by Claude Code.
