# CLAUDE.md — PARSH'S Diner 3D
Standing rules for Claude Code. Read this at the start of every session.
If anything here stops being true, tell me so we can update it.

## 1. What this project is
- A motion + 3D upgrade of the PARSH'S Diner website.
- PARSH'S Diner is a REAL 100% halal diner, Est. 2024, at: Near Church Square centre, Jagannaickpur, Kakinada, Andhra Pradesh 533002.
- Purpose: the restaurant's website, and my main portfolio showpiece to win web-design clients. It must look made by senior front-end designers, and it must be honest.
- Old site for reference: https://parshsdiner.vercel.app
- Me: complete beginner, Windows 11, working alone.

## 2. My tools and how I use them
- Claude (Claude Chat, on claude.ai / the Claude desktop app, Pro plan): my mentor and planner. I plan, ask questions and write prompts there, inside my "PARSH'S DINER" Claude Project. Many prompts I give you are written there first.
- Claude Code (Code tab in the Claude desktop app): you. You build and edit the files in this folder. Permission mode: Auto.
- Git: the save-history of this project. I do not type Git commands. When I say "commit" or "commit and push", you do the Git work for me (see the Git rules in section 9).
- GitHub (account: Pardha-Narayana): the online copy (backup) of this project, and where Vercel takes the site from.
- Vercel: puts the website online at a public address. Its free Hobby plan does not allow business sites, so at launch we choose Vercel Pro or a free host that allows business use.
- Git Bash (terminal): only for quick checks if needed.
- Google Chrome: where I check the site on desktop. My phone: where I check the mobile view.
- Google Sheets + Google Apps Script: the order log for the cart.
- WhatsApp: where orders are sent from the cart.

How the tools work together:
Plan in Claude Chat → build with Claude Code → check in Chrome and on my phone → I approve → I say "commit and push" → Claude Code saves to Git and uploads to GitHub → Vercel puts it online.

## 3. Site type (decided — do not change without asking me)
- This is a STATIC site: finished pages only. No logins, no user accounts, no admin area, no database of our own, no server of our own.
- Ordering: a cart in the browser → the order is sent as a WhatsApp message (wa.me link) → a copy of the order is logged to a Google Sheet through a Google Apps Script web address.
- Motion: GSAP + Lenis (smooth scrolling). 3D: model-viewer. Three.js only if I agree it is truly needed.
- Hosting: GitHub + a host chosen at launch — Vercel Pro, or a free host that allows business use (Vercel's free Hobby plan does not allow business sites).
- Whether we use plain files or a build tool (like Vite) is decided in Phase 1. Always pick the simplest option that meets the quality bar, and tell me what each extra tool will need from me in a year.

## 4. Quality bar
- Bold and eye-catching, never template-looking.
- ONE design system (colours, fonts, spacing, corner style, motion style), decided once in SITE-PLAN.md. Every page uses it. Do not invent new styles unless I ask.
- Mobile-first: must look perfect at 360px and 375px wide first, then tablet and desktop.
- Smooth on low-cost Android phones. Keep animations light.
- Fast: home page loads in under 3 seconds on mobile data. Compress images, keep 3D models small, load 3D only when it is needed.
- Accessible: readable colour contrast, works with a keyboard, alt text on images, one main heading per page. When the visitor's device has "reduce motion" on, turn off smooth scrolling and big animations.
- Search basics on every page: a page title (under 60 characters), a description (under 155 characters), a share image, a favicon. Our own 404 (page not found) page.
- Prices in Indian Rupees, written like ₹1,499.
- No "lorem ipsum", "TODO" or placeholder text left anywhere visible.
- Honesty: Only real facts. Never invent reviews, awards, press mentions or numbers. Stock photos are temporary and must be replaced with real photos of our dishes.
- Only use images, fonts, icons and 3D models we have the right to use. Record every one in CREDITS.md.

## 5. How we work (the build loop)
1. One small change per request. If I ask for several things, do only the first, then stop.
2. Before any big change, explain your plan in 3–5 simple bullet points and wait for my "go".
3. Read the relevant files first. Do not assume what is in them.
4. Touch only the files needed. Never mix a redesign and a logic change in the same step.
5. Check your own work with the chrome-devtools tool: at phone width (375px) and desktop width, and look for errors in the console.
6. Report back (see section 7), then STOP and wait for my "approved".
7. After I approve: update CHANGELOG.md and remind me to add my prompt to PROMPTS.md. Then ASK me: "Shall I commit and push now?" and wait for my "yes". Never commit or push without my yes.
- Follow SITE-PLAN.md once it exists. If the plan should change, ask me first.
- New ideas that are not in the plan go into the "Later" list in SITE-PLAN.md, not into the build.
- If a session gets long and you start repeating mistakes, tell me to commit and start a fresh session.

## 6. Things that must never silently break
After ANY change, even a design-only change, re-check the ordering flow:
- Add to cart, change quantity, remove an item, cart total is correct.
- The WhatsApp button opens a message with the correct items, total, name, phone, Pickup or Delivery, and the address only for Delivery.
- The Google Sheet receives a test order row (or tell me exactly how to check it).
After any restructure, search the project for "TODO", "placeholder" and "lorem" and tell me what you found.

## 7. How to talk to me
I am a complete beginner. Every time:
- Use plain, simple English and short sentences.
- Avoid technical words. If one is needed, explain it in brackets the first time. Example: "commit (a saved snapshot of the project)".
- Give the full form of short forms the first time. Example: "HTML (HyperText Markup Language — the file that holds the page content)".
- Before changing anything, tell me WHAT you will do and WHY.
- Do not show long code unless I ask. Describe what it does instead.
- Start each reply with a status line: phase, current part, parts left.

After every change, report in this order:
1. Every file you created, changed or deleted — what you added and what you REMOVED, and why.
2. Anything you changed that I did not ask for (flag it clearly).
3. Whether any new library or tool was added (should be "no" unless I agreed).
4. How I can check it myself: exact steps to click, on phone and laptop.
5. What you could NOT check yourself.
6. One line: what I should watch out for next time.
Only say "tested" if you actually ran a check. Otherwise say "not tested yet".

## 8. When something breaks
- Use the exact error text (from the console or from me). Never guess.
- Diagnose first: explain what the error means and list 3 likely causes, most likely first. Do not change code until I agree.
- Apply the smallest fix only. Change nothing else.
- 3-strike rule: if the same problem survives 3 fix attempts, stop. Suggest going back to the last commit and starting a fresh session.
- Never add a new library as a fix without explaining why it is needed and what it costs to maintain.

## 9. Safety rules
- Only work inside this project folder. Never touch other folders (like parsh-portfolio).
- Never write passwords, keys or tokens into any file. If one is needed, use a .env file (which must be in .gitignore) and put a placeholder until I give the real value.
- The Google Sheet order address will be visible in the page code (normal for a static site). So the Apps Script must ONLY add order rows, must check the data (required fields, length limits, sensible totals), and must limit spam. It must never get access to anything else.
- Collect only what an order needs: name, phone, items, notes, and Pickup or Delivery. Ask for the delivery address ONLY when Delivery is chosen. The privacy page will explain this.
- Ask me before installing any tool, library, skill or plugin. Do not add another design skill — we use frontend-design only.
- Ask me before deleting any file.
- If you are unsure about something, say so. Do not guess.

Git rules (I do not type Git commands — you do the Git work, but ALWAYS ask me first and wait for my "yes", never on your own):
- Before saving: show me a short list of the files that will be saved, and check that no password, key, token or .env file is included. If you find one, stop and tell me. Then ask "Commit and push these files?" and wait for my "yes".
- Write a clear commit message that a stranger could understand (for example "Add hero section with 3D burger"), not "update" or "fix".
- Commit to the main branch. Push to GitHub only when I say "push" or "commit and push".
- After pushing, tell me the commit message and confirm it reached GitHub.
- Never force-push, never rewrite or delete history, never delete branches, never undo commits without asking me first.
- Ask me before creating a new GitHub repository or changing any GitHub settings.

## 10. Helpers to use
- frontend-design: for design decisions and building the UI (user interface — what visitors see).
- modern-web-guidance: check it before writing HTML, CSS (Cascading Style Sheets) or JavaScript, so the code is up to date.
- GSAP skills (core, timeline, scrolltrigger, plugins, utils, performance): for all animations.
- chrome-devtools: to open the site, check phone and desktop views, read errors and check speed.

## 11. How to run the site
To be filled in during Phase 1 (how to preview the site on my computer).

## 12. Project files
- CLAUDE.md — these standing rules.
- SITE-PLAN.md — pages, sections, design system, motion map, and the "Later" list.
- README.md — how a stranger runs, previews and deploys this project.
- PROMPTS.md — every prompt I gave Claude Code, in order.
- CHANGELOG.md — what changed, and when.
- CREDITS.md — every image, font, icon and 3D model, with its source and licence.
- SECURITY.md — how secrets and the order flow are kept safe.
- .gitignore — files Git must never save (like .env).
- vercel.json — settings for putting the site online with Vercel.
