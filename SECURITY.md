# SECURITY.md — how this site stays safe

## Reporting a problem
If you find a security problem in this project, please do not post it publicly.
Report it privately through GitHub: open this repository's **Security** tab and choose **Report a vulnerability**, or contact the owner through the GitHub profile **Pardha-Narayana**.

## What this site does and does not do
- It is a **static site**: no logins, no user accounts, no database of our own, no server of our own.
- It uses **no passwords, keys or tokens** in the code.
- It only collects what an order needs: **name, phone, items, notes, and Pickup or Delivery**. The **delivery address** is asked only when Delivery is chosen.

## How orders are kept safe
- Orders are sent by the customer through **WhatsApp** (a wa.me link). The site never sees WhatsApp passwords or messages.
- A copy of each order is sent to a **Google Apps Script** that adds one row to a Google Sheet.
- That script's web address is visible in the page code (normal for a static site), so the script:
  - its web part (the only part the website can reach) can ONLY add order rows — it cannot read, change or delete anything,
  - a separate monthly job, started only by a timer inside Google (never by the website), deletes order rows older than 6 months, as the privacy page promises,
  - checks the data (required fields, length limits, sensible totals),
  - limits spam (too many orders in a short time are rejected).

## Secrets
- Secrets never go in the code. If one is ever needed, it lives in a `.env` file (never uploaded — see `.gitignore`) and in Vercel's settings.
- If a secret is ever saved by mistake, it must be **cancelled and replaced** (revoked) — deleting the line is not enough, because Git keeps the history.

## Outside code
- Every outside library is listed in `CREDITS.md`.
- No new library is added without the owner's approval.
