# PARSH'S Diner 3D

A motion + 3D upgrade of the PARSH'S Diner website, built by Pardha (PARSH). It is also Pardha's portfolio showpiece.

> **PARSH'S Diner is a real restaurant:** a 100% halal diner, Est. 2024, Near Church Square centre, Jagannaickpur, Kakinada, Andhra Pradesh 533002. Map: https://maps.app.goo.gl/GvMQWYbLxqMJfsXBA

- Old version (reference): https://parshsdiner.vercel.app
- New version (live link): to be added at launch.

## 1. What this site is, and who it is for
- **For:** customers in Kakinada (mostly on phones). Also restaurant owners who might hire me, as my portfolio showpiece.
- **What visitors can do:** browse the menu, add dishes to a cart, choose Pickup at the restaurant or Delivery within 5 km in Kakinada, and send the order on WhatsApp. A copy of each order is logged to a Google Sheet.
- **Type of site:** static (finished pages only). No logins, no database of our own, no server of our own.

## 2. Tools used to build it
- Motion: GSAP + Lenis (smooth scrolling).
- 3D: model-viewer.
- Built with Claude Code, with these helpers: frontend-design, modern-web-guidance, GSAP skills, chrome-devtools.
- Hosting: GitHub + a host chosen at launch — Vercel Pro, or a free host that allows business use (Vercel's free Hobby plan does not allow business sites).

## 3. How to run it on your computer
The site is plain files. There is no build step.

1. Install [Node.js](https://nodejs.org) (it includes `npx`).
2. Open a terminal in the project folder.
3. Run `npx serve -l 3000`. This downloads the small "serve" tool for that run only; nothing is added to the project.
4. Open http://localhost:3000 in your browser.
5. When you are done, stop the preview server with Ctrl + C in the terminal.

## 4. How to put it online (deploy)
Plain files, no build step. The host is chosen at launch (Vercel's free Hobby plan does not allow business sites). Settings on any host: no build command; the site is the project folder itself. Every push to the `main` branch on GitHub updates the live site.

## 5. Settings and secrets (environment variables)
None. This site uses no passwords, keys or tokens.
If one is ever needed, it goes in a `.env` file (never uploaded — see `.gitignore`) and in Vercel's settings, never in the code.

## 6. Outside services
| Service | What it is used for | Account | Cost |
|---|---|---|---|
| GitHub | Stores the code and its history | Pardha-Narayana | Free |
| Vercel (or another host) | Puts the site online | Pardha's account | Chosen at launch: Vercel Pro (paid), or a free host that allows business use. Vercel's free Hobby plan does not allow business sites. |
| WhatsApp (wa.me link) | Customers send their order | Pardha's WhatsApp | Free |
| Google Apps Script + Google Sheet | Logs a copy of each order | Pardha's Google account | Free |

## 7. Recurring costs and renewals
None yet. Hosting is chosen at launch: if it is Vercel Pro, note its monthly cost and renewal date here. If a custom domain is added later, note its yearly renewal date here.

## 8. Things that are unusual on purpose
- Only real facts. No made-up reviews, awards, press or numbers.
- Dish photos are free stock photos (Unsplash) for now. They must be replaced with real photos of our own dishes.
- The Google Sheet order address is visible in the page code (normal for a static site). The Apps Script behind it only adds order rows and checks the data. See SECURITY.md.

## 9. Project files
- `CLAUDE.md` — standing rules for Claude Code.
- `SITE-PLAN.md` — pages, design system, motion map, and the "Later" list (created in Phase 1).
- `README.md` — this file.
- `PROMPTS.md` — every prompt given to Claude Code.
- `CHANGELOG.md` — what changed, and when.
- `CREDITS.md` — images, fonts, icons, 3D models and libraries, with licences.
- `SECURITY.md` — how secrets and orders are kept safe.
- `.gitignore` — files Git must never save.
- `vercel.json` — Vercel settings.
- `.claude/skills/` and `skills-lock.json` — the GSAP skills used by Claude Code.
