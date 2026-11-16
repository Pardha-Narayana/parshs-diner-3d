// PARSH'S Diner — the cart (the visitor's order), saved in this browser.
// SITE-PLAN.md sections 5 and 8.
// - MENU: the 4 dishes. Names must match the Google Sheet exactly.
// - The cart is saved in the browser's own storage (localStorage),
//   so it survives a refresh. Nothing is sent anywhere from here.
// - The "Your order" count in the header always shows the total items.
// - The last sent order is saved too, for "Reorder your last order".
// Used by js/menu.js (Add buttons) and js/cart-panel.js (the cart panel).

export const MENU = {
  burger: { name: "Griddle-Smashed Burger", price: 220 },
  milkshake: { name: "Hand-Spun Milkshake", price: 150 },
  pasta: { name: "Homemade Pasta", price: 260 },
  "french-toast": { name: "Caramelized Banana French Toast", price: 190 },
};

export const MAX_PER_DISH = 10; // the Apps Script also refuses more than 10 of one dish

const STORAGE_KEY = "parsh-cart-v1";
const LAST_ORDER_KEY = "parsh-last-order-v1";

// ---------- Reading and saving ----------

// keep only real dishes with sensible amounts (saved data could be old or edited)
function cleanItems(raw) {
  const clean = {};
  for (const [id, qty] of Object.entries(raw ?? {})) {
    const n = Math.floor(Number(qty));
    if (MENU[id] && n > 0) clean[id] = Math.min(n, MAX_PER_DISH);
  }
  return clean;
}

function readJSON(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null; // storage blocked or broken
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage blocked (for example some private windows): the cart still
    // works on this page, it just won't survive a refresh
  }
}

let items = cleanItems(readJSON(STORAGE_KEY)?.items);

// Everyone who wants to know when the cart changes (the header count, the panel)
const listeners = new Set();

export function onCartChange(listener) {
  listeners.add(listener);
}

function changed({ tick = false } = {}) {
  writeJSON(STORAGE_KEY, { items });
  updateHeaderCount({ tick });
  listeners.forEach((listener) => listener());
}

// ---------- Reading the cart ----------

export function getItems() {
  return { ...items };
}

export function countItems() {
  return Object.values(items).reduce((sum, qty) => sum + qty, 0);
}

export function totalPrice(list = items) {
  return Object.entries(list).reduce((sum, [id, qty]) => sum + MENU[id].price * qty, 0);
}

// Prices in Indian Rupees, written like ₹1,499
const rupees = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
export function formatRupees(amount) {
  return `₹${rupees.format(amount)}`;
}

// ---------- Changing the cart ----------

// Adds one of a dish. Returns false if that dish is already at the maximum.
export function addItem(id) {
  if (!MENU[id]) return false;
  const qty = items[id] ?? 0;
  if (qty >= MAX_PER_DISH) return false;
  items[id] = qty + 1;
  changed({ tick: true });
  return true;
}

// Sets how many of a dish (1 to 10). 0 or less removes it.
export function setQuantity(id, qty) {
  if (!MENU[id]) return;
  const n = Math.min(Math.floor(qty), MAX_PER_DISH);
  if (n > 0) items[id] = n;
  else delete items[id];
  changed();
}

export function removeItem(id) {
  delete items[id];
  changed();
}

export function clearCart() {
  items = {};
  changed();
}

// ---------- The last sent order ("Reorder your last order") ----------

export function getLastOrder() {
  const saved = readJSON(LAST_ORDER_KEY);
  const list = cleanItems(saved?.items);
  return Object.keys(list).length ? { items: list, orderNumber: saved.orderNumber } : null;
}

// Saves only the dishes and the order number: no name, phone or address
export function saveLastOrder(order) {
  writeJSON(LAST_ORDER_KEY, { items: cleanItems(order.items), orderNumber: order.orderNumber });
}

// Puts the last order's dishes back in the cart (today's prices)
export function reorderLast() {
  const last = getLastOrder();
  if (!last) return false;
  items = { ...last.items };
  changed({ tick: true });
  return true;
}

// ---------- The "Your order" count in the header ----------

const countEl = document.querySelector("[data-order-count]");

function updateHeaderCount({ tick = false } = {}) {
  if (!countEl) return;
  countEl.textContent = String(countItems());
  if (tick) {
    // restart the little "tick up" (the menu part of css/home.css). Reduce motion: no movement.
    countEl.classList.remove("is-ticking");
    void countEl.offsetWidth;
    countEl.classList.add("is-ticking");
  }
}

countEl?.addEventListener("animationend", () => countEl.classList.remove("is-ticking"));

// If the order is changed in another tab of this site, show the same here
window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY) return;
  items = cleanItems(readJSON(STORAGE_KEY)?.items);
  updateHeaderCount();
  listeners.forEach((listener) => listener());
});

// Show the saved count as soon as the page opens
updateHeaderCount();
