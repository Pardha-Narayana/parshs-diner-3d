/**
 * @OnlyCurrentDoc
 *
 * PARSH'S Diner — order log for the 3D site's own Google Sheet,
 * "PARSH'S Orders (3D site)". (SITE-PLAN.md section 8, SECURITY.md)
 * The old site keeps its own "PARSH'S Orders" Sheet; this script never touches it.
 * Set up and updated with clasp: see apps-script/README.md.
 *
 * The line "@OnlyCurrentDoc" above tells Google this script may touch ONLY
 * the one Sheet it lives in — none of your other files.
 *
 * What this script does, and nothing more:
 * - The web part (doPost, the only part the website can reach):
 *   - receives one order from the website,
 *   - checks it (a bad order is dropped quietly),
 *   - ADDS one row at the bottom of the orders tab.
 *   The web part never reads, changes or deletes any row.
 * - A separate monthly job (deleteOldOrders, at the bottom of this file):
 *   deletes order rows older than 6 months, as the privacy page promises.
 *   It runs ONLY from a monthly timer in Google (see apps-script/README.md).
 *   The website cannot start it: a web address only ever runs doPost or doGet.
 *
 * Columns, in this exact order (the dashboard reads A to I — never move them):
 *  A full timestamp | B date | C time | D name | E phone | F Pickup/Delivery
 *  G address | H items | I total | J Site | K Order no. | L Notes
 */

// ---------- Settings ----------

// The name of the tab (at the bottom of the Sheet) where orders go.
// Leave it empty ("") to use the first tab.
var ORDERS_TAB_NAME = "";

// Our 4 dishes and their real prices in ₹. Must match js/cart.js on the site.
var MENU = {
  "burger": { name: "Griddle-Smashed Burger", price: 220 },
  "milkshake": { name: "Hand-Spun Milkshake", price: 150 },
  "pasta": { name: "Homemade Pasta", price: 260 },
  "french-toast": { name: "Caramelized Banana French Toast", price: 190 }
};

var MAX_PER_DISH = 10;            // at most 10 of one dish
var PHONE_LIMIT = 3;              // at most 3 orders per phone number…
var PHONE_WINDOW_SECONDS = 600;   // …in 10 minutes
var ORDERS_PER_MINUTE_LIMIT = 20; // at most 20 orders per minute from everyone
var MAX_BODY_LENGTH = 3000;       // a real order is far smaller than this
var SITE_LABEL = "3D";
var TIME_ZONE = "Asia/Kolkata";   // India time, for the Date (B) and Time (C) columns

// ---------- Receiving an order ----------

function doPost(e) {
  try {
    var order = readOrder_(e);
    if (!order) return reply_(false);

    // Spam limits use Google's short-term memory (cache), not the Sheet.
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) return reply_(false);
    try {
      if (!withinLimits_(order.phone)) return reply_(false);
      addRow_(order);
    } finally {
      lock.releaseLock();
    }
    return reply_(true);
  } catch (err) {
    return reply_(false); // never show details to the outside world
  }
}

// Opening the web address in a browser just shows this line.
function doGet() {
  return ContentService.createTextOutput("PARSH'S Diner order log is running.");
}

function reply_(ok) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: ok }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---------- Checking the order ----------

// Returns a clean order, or null if anything is wrong.
function readOrder_(e) {
  if (!e || !e.postData || typeof e.postData.contents !== "string") return null;
  if (e.postData.contents.length > MAX_BODY_LENGTH) return null;

  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return null;
  }
  if (!data || typeof data !== "object") return null;

  // The hidden trap box: people never see it, spam robots fill it.
  if (data.website) return null;

  var orderNumber = text_(data.orderNumber);
  if (!/^PD-\d{4}$/.test(orderNumber)) return null;

  var name = text_(data.name);
  if (name.length < 2 || name.length > 40) return null;
  if (!/^[\p{L}\p{M} .'\-]+$/u.test(name)) return null;
  if ((name.match(/\p{L}/gu) || []).length < 2) return null;

  var phone = text_(data.phone);
  if (!/^[6-9]\d{9}$/.test(phone)) return null; // 10-digit Indian mobile

  var way = text_(data.way);
  if (way !== "pickup" && way !== "delivery") return null;

  var address = text_(data.address);
  if (way === "delivery") {
    if (address.length < 5 || address.length > 200) return null;
  } else {
    address = ""; // pickup never keeps an address
  }

  var notes = text_(data.notes);
  if (notes.length > 200) return null;

  // Items: only our 4 dishes, whole numbers from 1 to 10
  var items = data.items;
  if (!items || typeof items !== "object" || Array.isArray(items)) return null;
  var ids = Object.keys(items);
  if (ids.length < 1 || ids.length > Object.keys(MENU).length) return null;

  var parts = [];
  var total = 0;
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    var qty = items[id];
    if (!Object.prototype.hasOwnProperty.call(MENU, id)) return null;
    if (typeof qty !== "number" || Math.floor(qty) !== qty) return null;
    if (qty < 1 || qty > MAX_PER_DISH) return null;
    var lineTotal = MENU[id].price * qty;
    total += lineTotal;
    parts.push(qty + "x " + MENU[id].name + " (" + rupees_(lineTotal) + ")");
  }

  // The total the site sent must match our own real prices
  if (data.total !== total) return null;

  return {
    orderNumber: orderNumber,
    name: name,
    phone: phone,
    way: way,
    address: address,
    notes: notes,
    itemsText: parts.join(", "),
    total: total
  };
}

// Text on one line, trimmed. Anything that is not text becomes "".
function text_(value) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
}

// ₹1,499 style (Indian grouping: ₹1,00,000)
function rupees_(amount) {
  var s = String(amount);
  var last3 = s.slice(-3);
  var rest = s.slice(0, -3);
  if (rest) last3 = "," + last3;
  return "₹" + rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + last3;
}

// ---------- Spam limits ----------

function withinLimits_(phone) {
  var cache = CacheService.getScriptCache();
  var now = Date.now();

  // 1. Everyone together: at most ORDERS_PER_MINUTE_LIMIT this minute
  var minuteKey = "minute-" + Math.floor(now / 60000);
  var minuteCount = Number(cache.get(minuteKey)) || 0;
  if (minuteCount >= ORDERS_PER_MINUTE_LIMIT) return false;

  // 2. One phone number: at most PHONE_LIMIT in the last 10 minutes
  var phoneKey = "phone-" + phone;
  var times = [];
  try {
    times = JSON.parse(cache.get(phoneKey)) || [];
  } catch (err) {
    times = [];
  }
  times = times.filter(function (t) {
    return now - t < PHONE_WINDOW_SECONDS * 1000;
  });
  if (times.length >= PHONE_LIMIT) return false;

  times.push(now);
  cache.put(phoneKey, JSON.stringify(times), PHONE_WINDOW_SECONDS);
  cache.put(minuteKey, String(minuteCount + 1), 120);
  return true;
}

// ---------- Adding the row ----------

// Text that starts with = + - or @ could run as a formula in the Sheet.
// A leading ' makes the Sheet show it as plain text.
function safe_(value) {
  var s = String(value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function addRow_(order) {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var tab = ORDERS_TAB_NAME ? book.getSheetByName(ORDERS_TAB_NAME) : book.getSheets()[0];
  if (!tab) throw new Error("Orders tab not found");

  // All three come from the same moment.
  // A: full timestamp in UTC, same format as the old rows ("2026-07-09T10:32:40.031Z").
  // B and C: India time (Asia/Kolkata), so the restaurant reads its own clock:
  // that same moment is "2026-07-09" and "16:02:40".
  var now = new Date();
  tab.appendRow([
    now.toISOString(),                                           // A full timestamp (UTC)
    Utilities.formatDate(now, TIME_ZONE, "yyyy-MM-dd"),          // B date, India (YYYY-MM-DD)
    Utilities.formatDate(now, TIME_ZONE, "HH:mm:ss"),            // C time, India (HH:MM:SS, 24-hour)
    safe_(order.name),                                           // D name
    order.phone,                                                 // E phone
    order.way === "delivery" ? "Delivery" : "Pickup",            // F Pickup/Delivery
    safe_(order.address),                                        // G address
    order.itemsText,                                             // H items
    order.total,                                                 // I total
    SITE_LABEL,                                                  // J Site
    order.orderNumber,                                           // K Order no.
    safe_(order.notes)                                           // L Notes
  ]);
}

// ---------- Monthly clean-up: delete orders older than 6 months ----------
// The privacy page (privacy.html) promises: "We delete order records from
// our order list after 6 months." This job keeps that promise.
// - It runs ONLY from a time-driven trigger (once a month), set up by hand
//   in the Apps Script editor: see apps-script/README.md.
// - Nothing in doPost or doGet calls it, so the website can never start it.
// - It looks only at column A (the timestamp). Rows whose timestamp it
//   cannot read are KEPT, never deleted. Row 1 (the headings) is never touched.

var KEEP_MONTHS = 6;

function deleteOldOrders() {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // never at the same moment as a new order being added
  try {
    var book = SpreadsheetApp.getActiveSpreadsheet();
    var tab = ORDERS_TAB_NAME ? book.getSheetByName(ORDERS_TAB_NAME) : book.getSheets()[0];
    if (!tab) throw new Error("Orders tab not found");

    var lastRow = tab.getLastRow();
    if (lastRow < 2) return; // only the headings, nothing to delete

    var cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - KEEP_MONTHS);

    var stamps = tab.getRange(2, 1, lastRow - 1, 1).getValues(); // column A, from row 2
    var deleted = 0;

    // Work from the bottom up, so the row numbers above stay correct.
    // Old rows next to each other are deleted together, in one step.
    var i = stamps.length - 1;
    while (i >= 0) {
      if (!isOlderThan_(stamps[i][0], cutoff)) {
        i--;
        continue;
      }
      var last = i;
      while (i - 1 >= 0 && isOlderThan_(stamps[i - 1][0], cutoff)) i--;
      tab.deleteRows(i + 2, last - i + 1); // +2: the list starts at row 2
      deleted += last - i + 1;
      i--;
    }

    console.log("Deleted " + deleted + " order row(s) from before " + cutoff.toISOString());
  } finally {
    lock.releaseLock();
  }
}

// true only when the timestamp is a real date before the cutoff
function isOlderThan_(value, cutoff) {
  var when = value instanceof Date ? value : new Date(String(value));
  if (isNaN(when.getTime())) return false; // cannot read it: keep the row
  return when.getTime() < cutoff.getTime();
}
