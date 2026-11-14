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
