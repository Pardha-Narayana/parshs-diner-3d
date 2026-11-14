# PARSH'S Diner 3D

A motion + 3D upgrade of the PARSH'S Diner sample website, built as a portfolio showpiece by Pardha (PARSH).

> **This is a sample/concept project.** PARSH'S Diner is a fictional diner in Madhapur, Hyderabad. It is not a real restaurant.

- Old version (reference): https://parshsdiner.vercel.app
- New version (live link): to be added at launch.

## 1. What this site is, and who it is for
- **For:** restaurant owners who might hire me, so they can see what their own website could look like.
- **What visitors can do:** browse the menu, add dishes to a cart, and send the order on WhatsApp. A copy of each order is logged to a Google Sheet.
- **Type of site:** static (finished pages only). No logins, no database of our own, no server of our own.

## 2. Tools used to build it
- Motion: GSAP + Lenis (smooth scrolling).
- 3D: model-viewer.
- Built with Claude Code, with these helpers: frontend-design, modern-web-guidance, GSAP skills, chrome-devtools.
- Hosting: GitHub + Vercel (free plan).

## 3. How to run it on your computer
To be filled in during Phase 1, once we decide between plain files and a build tool.

## 4. How to put it online (deploy)
To be filled in during Phase 1. In short: every push to the `main` branch on GitHub updates the live site on Vercel.

## 5. Settings and secrets (environment variables)
None. This site uses no passwords, keys or tokens.
If one is ever needed, it goes in a `.env` file (never uploaded — see `.gitignore`) and in Vercel's settings, never in the code.

## 6. Outside services
| Service | What it is used for | Account | Cost |
|---|---|---|---|
| GitHub | Stores the code and its history | Pardha-Narayana | Free |
| Vercel | Puts the site online | Pardha's Vercel account | Free (Hobby plan) |
| WhatsApp (wa.me link) | Customers send their order | Pardha's WhatsApp | Free |
| Google Apps Script + Google Sheet | Logs a copy of each order | Pardha's Google account | Free |

## 7. Recurring costs and renewals
None right now. Everything runs on free plans. If a custom domain is added later, note its yearly renewal date here.

## 8. Things that are unusual on purpose
- The site clearly says it is a sample. Do not remove that unless it becomes a real restaurant's site.
- No made-up reviews, awards or numbers.
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
