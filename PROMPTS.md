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
