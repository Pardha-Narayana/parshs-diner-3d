// PARSH'S Diner — the "Order now" button in the final call to action.
// Cart has items → opens the cart panel (same as the "Your order" button).
// Cart is empty  → goes to the menu, and keyboard focus moves to the first
//                  Add button, so the next Tab or Enter continues from there.

import { countItems } from "/js/cart.js";

const button = document.querySelector("[data-order-now]");

button?.addEventListener("click", () => {
  if (countItems() > 0) {
    // reuse the header button, so the panel opens exactly the same way
    document.querySelector("[data-open-cart]")?.click();
    return;
  }

  const menu = document.querySelector("#menu");
  if (!menu) return;
  menu.scrollIntoView({ block: "start" }); // stops below the header (scroll-padding-top in base.css)
  menu.querySelector("[data-add]")?.focus({ preventScroll: true });
});
