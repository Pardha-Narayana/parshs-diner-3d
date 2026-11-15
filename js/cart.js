// PARSH'S Diner — the cart (the visitor's order), saved in this browser.
// SITE-PLAN.md sections 5 and 8.
// - MENU: the 4 dishes. Names must match the Google Sheet exactly.
// - The cart is saved in the browser's own storage (localStorage),
//   so it survives a refresh. Nothing is sent anywhere from here.
// - The "Your order" count in the header always shows the total items.
// The cart panel (next step) will use the same functions.

export const MENU = {
  burger: { name: "Griddle-Smashed Burger", price: 220 },
  milkshake: { name: "Hand-Spun Milkshake", price: 150 },
  pasta: { name: "Homemade Pasta", price: 260 },
  "french-toast": { name: "Caramelized Banana French Toast", price: 190 },
};

export const MAX_PER_DISH = 10; // the Apps Script also refuses more than 10 of one dish

const STORAGE_KEY = "parsh-cart-v1";

// ---------- Reading and saving ----------

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const items = {};
    // keep only real dishes with sensible amounts (the saved data could be old or edited)
    for (const [id, qty] of Object.entries(saved?.items ?? {})) {
      const n = Math.floor(Number(qty));
      if (MENU[id] && n > 0) items[id] = Math.min(n, MAX_PER_DISH);
    }
    return items;
  } catch {
    return {}; // storage blocked or broken: start with an empty cart
  }
}

let items = load();

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
  } catch {
    // storage blocked (for example some private windows): the cart still
    // works on this page, it just won't survive a refresh
  }
}

// ---------- Reading the cart ----------

export function getItems() {
  return { ...items };
}

export function countItems() {
  return Object.values(items).reduce((sum, qty) => sum + qty, 0);
}

// ---------- Changing the cart ----------

// Adds one of a dish. Returns false if that dish is already at the maximum.
export function addItem(id) {
  if (!MENU[id]) return false;
  const qty = items[id] ?? 0;
  if (qty >= MAX_PER_DISH) return false;
  items[id] = qty + 1;
  save();
  updateHeaderCount({ tick: true });
  return true;
}

// ---------- The "Your order" count in the header ----------

const countEl = document.querySelector("[data-order-count]");

function updateHeaderCount({ tick = false } = {}) {
  if (!countEl) return;
  countEl.textContent = String(countItems());
  if (tick) {
    // restart the little "tick up" (css/menu.css). Reduce motion: no movement.
    countEl.classList.remove("is-ticking");
    void countEl.offsetWidth;
    countEl.classList.add("is-ticking");
  }
}

countEl?.addEventListener("animationend", () => countEl.classList.remove("is-ticking"));

// If the order is changed in another tab of this site, show the same count here
window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY) return;
  items = load();
  updateHeaderCount();
});

// Show the saved count as soon as the page opens
updateHeaderCount();
