// PARSH'S Diner — the Add buttons on the menu cards.
// On tap: the button presses in, the header count ticks up once
// (js/cart.js), and a small "Added" note shows for a moment.
// Screen readers hear "Added <dish>. <n> items in your order."

import { MENU, MAX_PER_DISH, addItem, countItems } from "/js/cart.js";

const NOTE_TIME = 1400; // how long the "Added" note stays (ms) before it fades (0.2 s)
const PRESS_TIME = 200; // the press-in lasts 0.2 s

const status = document.querySelector("[data-cart-status]");
const timers = new WeakMap();

function flash(button, note, text) {
  clearTimeout(timers.get(button));
  note.textContent = text;
  note.classList.add("is-shown");
  button.classList.add("is-pressed");
  const pressTimer = setTimeout(() => button.classList.remove("is-pressed"), PRESS_TIME);
  const noteTimer = setTimeout(() => {
    note.classList.remove("is-shown");
    clearTimeout(pressTimer);
  }, NOTE_TIME);
  timers.set(button, noteTimer);
}

document.querySelector(".menu__list")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const id = button.dataset.add;
  const note = button.closest(".dish")?.querySelector("[data-note]");
  const added = addItem(id);
  const count = countItems();
  const itemsWord = count === 1 ? "item" : "items";

  if (added) {
    if (note) flash(button, note, "Added");
    if (status) status.textContent = `Added ${MENU[id].name}. ${count} ${itemsWord} in your order.`;
  } else {
    if (note) flash(button, note, `Max ${MAX_PER_DISH}`);
    if (status) status.textContent = `You can add up to ${MAX_PER_DISH} of ${MENU[id].name}.`;
  }
});
