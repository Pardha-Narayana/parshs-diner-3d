# Order log script — what is set up, and how to update it

This folder holds the script that copies each website order into the 3D site's own Google Sheet.

- `Code.gs`: the script. It has two separate parts:
  - **The web part** (`doPost`): the only part the website can reach. It can only ADD rows to its own Sheet. It never reads, changes or deletes anything.
  - **The monthly clean-up** (`deleteOldOrders`): deletes order rows older than 6 months, as the privacy page promises. It runs only from a monthly timer in Google (see "The monthly clean-up" below). The website cannot start it.
- `appsscript.json`: the script's settings (see "The settings file" below).
- This file: what is online, and how to update it.

---

## What is set up on Google

- **Sheet:** "PARSH'S Orders (3D site)", in the Google account that owns the restaurant's Sheets. It is a NEW Sheet, made only for this 3D site.
- **Old site:** keeps its own "PARSH'S Orders" Sheet, script and web address. Nothing here touches them.
- **Dashboard:** still reads the old Sheet. Pointing it to the new Sheet is on the before-launch checklist (SITE-PLAN.md section 9).
- **Script:** attached to the new Sheet. Script ID: `1_Q-FumatvVOEYGvkKMIoNdo4ss1Tk75tKcpBj75XoaJ3duL2-zrFvbYW`
  - To open it: https://script.google.com/d/1_Q-FumatvVOEYGvkKMIoNdo4ss1Tk75tKcpBj75XoaJ3duL2-zrFvbYW/edit
  - Or, in the Sheet, click **Extensions → Apps Script**.
- **Web app deployment:** "3D site orders" (Execute as: me, Access: anyone).
  - Deployment ID: `AKfycbz9mCcRkep2_2li4JtTnVh5JEkCB1LwZEKMWyRsadH7CgOU9BaQBazYXu6zNKCFDyfGJQ`
  - Its web address is the `SHEET_WEB_APP_URL` setting near the top of `js/cart-panel.js`.
  - Opening that address in a browser shows "PARSH'S Diner order log is running."

### The columns (row 1 of the Sheet)

```
A Timestamp | B Date | C Time | D Name | E Phone | F Pickup/Delivery | G Address | H Items | I Total | J Site | K Order no. | L Notes
```

A to I are in the same order as the old Sheet, so the dashboard can read both. Never move them.

- Timestamp (A) uses the old rows' format, in UTC (India time minus 5 h 30 min). Example: `2026-07-09T10:32:40.031Z`.
- Date (B) and Time (C) are in India time (Asia/Kolkata), for the same moment. Example: `2026-07-09`, `16:02:40`. (Since 16 November 2026. Rows before that have B and C in UTC.)
- Site is always `3D`.
- Order no. matches the WhatsApp message (like `PD-1432`).

The web part never reads the Sheet, so it cannot write these headings itself. They were typed in by hand. If row 1 is ever empty, the first order lands in row 1.

### The monthly clean-up (`deleteOldOrders`)

- **Why:** the privacy page says "We delete order records from our order list after 6 months."
- **What it does:** looks at column A (Timestamp) from row 2 down, and deletes every row older than 6 months. Row 1 (the headings) is never touched. A row whose timestamp it cannot read is kept, never deleted.
- **When:** once a month, from a time-driven trigger (a timer inside Google).
- **Safe from the website:** a web address can only run `doPost` or `doGet`, and neither of them calls `deleteOldOrders`.
- **Permission:** none extra. It uses the same one permission as before ("this one Sheet only").
- **To see what it did:** Apps Script editor → **Executions** (left side). Each run says how many rows it deleted.

**Setting up the timer (done once, by hand):**
1. Open the script (link above) → click the **clock icon, Triggers** (left side).
2. Click **+ Add Trigger** (bottom right).
3. Choose which function to run: **deleteOldOrders**.
4. Which runs at deployment: **Head**.
5. Select event source: **Time-driven**. Type of time based trigger: **Month timer**. Day of month: **1st**. Time of day: **3am to 4am** (India time; the restaurant is closed then).
6. Failure notification settings: **Notify me immediately**. Click **Save**.
7. If Google asks for permission: **Advanced → Go to PARSH'S Orders (3D site) (unsafe)**, tick **only** "View and manage spreadsheets that this application has been installed in", then **Continue**.

There must be exactly **one** such trigger. Two would do no harm, but are untidy.

Status (16 November 2026): the clean-up code is uploaded (deployment version 3, same web address; version 4 later that day switched Date and Time to India time), and the monthly timer was added by Pardha in the account that owns the Sheet (pardhanarayanav@gmail.com).

### The settings file (`appsscript.json`)

- `oauthScopes`: the script may only use **the one spreadsheet it is attached to**, nothing else.
- `webapp`: run as the owner, open to anyone (needed so customers' browsers can send orders).
- `timeZone`: India (Asia/Kolkata). `Code.gs` also names it (`TIME_ZONE`) for the Date and Time columns. The Timestamp column stays in UTC like the old rows.

---

## How it was set up (for the record)

All done with **clasp**, Google's own tool for Apps Script. It runs with `npx`, so it adds nothing to the website.

1. On https://script.google.com/home/usersettings, **Google Apps Script API** was switched **On**.
2. `npx @google/clasp@3.4.1 login`: signed in to the Google account and clicked **Allow**. clasp saves the sign-in in `C:\Users\Admin\.clasprc.json`, which is outside the project and never goes to GitHub.
3. `clasp create-script --type sheets --title "PARSH'S Orders (3D site)"`: made the new Sheet with an attached script. This ran in a temporary folder outside the project.
4. Copied `Code.gs` and `appsscript.json` from this folder into the temporary folder, then ran `clasp push --force`.
5. `clasp create-deployment --description "3D site orders"`: made the web app.
6. In the script editor: chose **doGet**, clicked **Run**, then **Review permissions → Advanced → Go to PARSH'S Orders (3D site) (unsafe)**. Ticked **only** "View and manage spreadsheets that this application has been installed in", then clicked **Continue**.
7. Typed the 12 headings in row 1.
8. Sent one test order named "TEST ORDER" from the site, checked the row, then deleted it.

---

## How to update the script later

For example, after changing a price. A price must change in BOTH `js/cart.js` (the site) and `Code.gs` (here).

Claude Code does these steps for you. They are written here so anyone can repeat them.

1. Make an empty folder **outside** the project, for example in your Temp folder. Open a terminal there.
2. Download the script's link details:
   `npx @google/clasp@3.4.1 clone 1_Q-FumatvVOEYGvkKMIoNdo4ss1Tk75tKcpBj75XoaJ3duL2-zrFvbYW`
   (If clasp says you are not signed in, first run `npx @google/clasp@3.4.1 login`.)
3. Copy `Code.gs` and `appsscript.json` from this `apps-script/` folder into that folder, replacing the downloaded ones.
4. Upload them:
   `npx @google/clasp@3.4.1 push --force`
5. Update the SAME deployment, so the web address stays the same:
   `npx @google/clasp@3.4.1 update-deployment AKfycbz9mCcRkep2_2li4JtTnVh5JEkCB1LwZEKMWyRsadH7CgOU9BaQBazYXu6zNKCFDyfGJQ --description "3D site orders"`
6. Open the web address in a browser. It should say "PARSH'S Diner order log is running."
7. Send one test order from the site, check the row, then delete it.

**Never** run `clasp create-deployment` again. That makes a NEW web address, and the site would keep sending to the old one.

If Google ever asks for permission again (because the settings changed), repeat step 6 of "How it was set up".

---

## Good to know

- **What the script refuses (quietly):** missing details, a wrong total, dishes or prices that are not on our menu, more than 10 of one dish, a filled hidden trap box, more than 3 orders from one phone in 10 minutes, more than 20 orders a minute in total.
- **Formula guard:** text that starts with `=`, `+`, `-` or `@` gets a `'` in front, so the Sheet shows it as plain text and never runs it.
- **Removing clasp's access:** myaccount.google.com → Security → "Third-party apps & services" → clasp → remove. Then delete `C:\Users\Admin\.clasprc.json`.
