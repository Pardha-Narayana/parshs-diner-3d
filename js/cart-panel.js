// PARSH'S Diner — the cart panel and the WhatsApp order (SITE-PLAN.md section 8).
// 1. "Your order" opens the panel (a native modal <dialog>).
// 2. Items: − / + (1 to 10), Remove, total in ₹. Empty: a line, "See the menu",
//    and "Reorder your last order" when there is one.
// 3. Details: name, mobile, Pickup or Delivery, address (Delivery only), notes.
//    Errors show after the visitor leaves a box or presses Send.
// 4. Send: makes an order number (PD-1432), opens WhatsApp with the order
//    typed, empties the cart and saves the dishes as "last order".
// 5. At the same moment, a copy goes to the Google Sheet with the SAME order
//    number (apps-script/Code.gs). The site never waits for it, and the
//    customer never sees an error from it.

import {
  MENU,
  MAX_PER_DISH,
  getItems,
  countItems,
  totalPrice,
  formatRupees,
  setQuantity,
  removeItem,
  clearCart,
  getLastOrder,
  saveLastOrder,
  reorderLast,
  onCartChange,
} from "/js/cart.js";

const WHATSAPP_NUMBER = "917780530607"; // +91 77805 30607, no + or spaces for wa.me

// The Google Sheet order log: the "Web app URL" from apps-script/README.md, Step 6.
// Empty = nothing is sent to the Sheet (WhatsApp ordering still works).
const SHEET_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbz9mCcRkep2_2li4JtTnVh5JEkCB1LwZEKMWyRsadH7CgOU9BaQBazYXu6zNKCFDyfGJQ/exec";

const dialog = document.querySelector("#cart");
const openButton = document.querySelector("[data-open-cart]");

if (dialog && openButton) {
  const $ = (selector) => dialog.querySelector(selector);
  const orderViews = dialog.querySelectorAll('[data-view="order"]');
  const sentView = $('[data-view="sent"]');
  const emptyBox = $("[data-empty]");
  const filledParts = dialog.querySelectorAll("[data-filled]");
  const list = $("[data-items]");
  const totalEl = $("[data-total]");
  const reorderButton = $("[data-reorder]");
  const lastOrderLine = $("[data-last-order]");
  const status = $("[data-panel-status]");
  const form = $("[data-order-form]");
  const addressBox = $("[data-address]");
  const address = form.elements.address;

  // ---------- Opening and closing ----------

  function showView(name) {
    orderViews.forEach((el) => (el.hidden = name !== "order"));
    sentView.hidden = name !== "sent";
  }

  openButton.addEventListener("click", () => {
    status.textContent = ""; // no old messages from last time
    showView("order");
    render();
    dialog.showModal();
  });

  // Firefox and Safari can't animate a dialog closing by themselves:
  // play the slide-out first, then close (see css/cart.css).
  let canTransitionDisplay;
  function supportsTopLayerExit() {
    if (canTransitionDisplay === undefined) {
      canTransitionDisplay = false;
      if (window.CSS?.supports?.("transition-behavior", "allow-discrete")) {
        const probe = document.createElement("div");
        probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
        document.body.append(probe);
        getComputedStyle(probe).display;
        probe.style.display = "none";
        canTransitionDisplay = getComputedStyle(probe).display === "block";
        probe.remove();
      }
    }
    return window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay;
  }

  async function closePanel() {
    if (!dialog.open) return;
    if (!supportsTopLayerExit()) {
      dialog.setAttribute("data-closing", "");
      const animations = dialog.getAnimations({ subtree: false });
      if (animations.length) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((resolve) => setTimeout(resolve, 600)),
        ]);
      }
      dialog.removeAttribute("data-closing");
    }
    dialog.close();
  }

  // Esc (and a tap outside, where the browser supports closedby="any")
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closePanel();
  });

  // A tap outside, for browsers without closedby="any" (Safari)
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    const outside = (e) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    let pressedOutside = false;
    dialog.addEventListener("pointerdown", (e) => (pressedOutside = outside(e)));
    dialog.addEventListener("pointerup", (e) => {
      if (pressedOutside && outside(e)) closePanel();
    });
  }

  // Close button, "Done", and "See the menu" (which then jumps to the menu)
  dialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-cart]")) closePanel();
  });

  // ---------- The items ----------

  const rows = new Map(); // dish id → its row, reused so keyboard focus is never lost

  function makeRow(id) {
    const { name } = MENU[id];
    const li = document.createElement("li");
    li.className = "cart-item";
    li.dataset.id = id;
    li.innerHTML = `
      <span class="cart-item__name"></span>
      <span class="cart-item__price" data-line-price></span>
      <span class="stepper" role="group">
        <button class="stepper__button" type="button" data-step="-1">−</button>
        <span class="stepper__qty" data-qty></span>
        <button class="stepper__button" type="button" data-step="1">+</button>
      </span>
      <button class="cart-item__remove" type="button" data-remove>Remove</button>`;
    li.querySelector(".cart-item__name").textContent = name;
    li.querySelector(".stepper").setAttribute("aria-label", `How many ${name}`);
    li.querySelector('[data-step="-1"]').setAttribute("aria-label", `One less ${name}`);
    li.querySelector('[data-step="1"]').setAttribute("aria-label", `One more ${name}`);
    li.querySelector("[data-remove]").setAttribute("aria-label", `Remove ${name}`);
    return li;
  }

  function render() {
    const items = getItems();
    const ids = Object.keys(MENU).filter((id) => items[id]); // menu order
    const empty = ids.length === 0;

    emptyBox.hidden = !empty;
    filledParts.forEach((el) => (el.hidden = empty));

    // rows: remove the ones no longer in the cart, add or update the rest
    for (const [id, row] of rows) {
      if (!items[id]) {
        row.remove();
        rows.delete(id);
      }
    }
    ids.forEach((id, index) => {
      let row = rows.get(id);
      if (!row) {
        row = makeRow(id);
        rows.set(id, row);
      }
      // keep menu order; only move a row when needed (moving drops keyboard focus)
      if (list.children[index] !== row) list.insertBefore(row, list.children[index] ?? null);
      const qty = items[id];
      row.querySelector("[data-qty]").textContent = String(qty);
      row.querySelector("[data-line-price]").textContent = formatRupees(MENU[id].price * qty);
      row.querySelector('[data-step="-1"]').setAttribute("aria-disabled", String(qty <= 1));
      row.querySelector('[data-step="1"]').setAttribute("aria-disabled", String(qty >= MAX_PER_DISH));
    });

    totalEl.textContent = formatRupees(totalPrice(items));

    // "Reorder your last order" only when the cart is empty and there is one
    const last = empty ? getLastOrder() : null;
    reorderButton.hidden = !last;
    lastOrderLine.hidden = !last;
    if (last) {
      const summary = Object.entries(last.items)
        .map(([id, qty]) => `${qty} × ${MENU[id].name}`)
        .join(", ");
      lastOrderLine.textContent = `Last order${last.orderNumber ? ` ${last.orderNumber}` : ""}: ${summary}.`;
    }
  }

  list.addEventListener("click", (event) => {
    const row = event.target.closest(".cart-item");
    if (!row) return;
    const id = row.dataset.id;
    const name = MENU[id].name;
    const qty = getItems()[id] ?? 0;

    const step = event.target.closest("[data-step]");
    if (step) {
      if (step.getAttribute("aria-disabled") === "true") {
        status.textContent =
          Number(step.dataset.step) > 0
            ? `You can order up to ${MAX_PER_DISH} of ${name}.`
            : `Use Remove to take ${name} out of your order.`;
        return;
      }
      setQuantity(id, qty + Number(step.dataset.step));
      status.textContent = `${name}: ${getItems()[id]}. Total ${formatRupees(totalPrice())}.`;
      return;
    }

    if (event.target.closest("[data-remove]")) {
      // move focus somewhere sensible before the row disappears
      const next = row.nextElementSibling || row.previousElementSibling;
      removeItem(id);
      status.textContent = `Removed ${name}.`;
      (next?.querySelector("[data-remove]") || dialog.querySelector(".cart__close")).focus();
    }
  });

  reorderButton.addEventListener("click", () => {
    reorderLast();
    status.textContent = `Your last order is back in the cart. ${countItems()} items.`;
    list.querySelector("[data-step]")?.focus();
  });

  onCartChange(() => dialog.open && render());

  // ---------- Pickup or Delivery: the address box ----------

  function updateWay() {
    const delivery = form.elements.way.value === "delivery";
    addressBox.classList.toggle("is-open", delivery);
    addressBox.inert = !delivery;
    address.required = delivery;
  }
  form.addEventListener("change", (event) => {
    if (event.target.name === "way") updateWay();
  });

  // ---------- Errors: shown after leaving a box or pressing Send ----------
  // (the error text shows through CSS :user-invalid; this keeps screen readers in step)

  const fields = [...form.querySelectorAll("input:not([name='website']), textarea")];

  function linkError(el, shown) {
    const errorId = el.dataset.error;
    if (!errorId) return;
    const ids = (el.getAttribute("aria-describedby") || "").split(/\s+/).filter((x) => x && x !== errorId);
    if (shown) ids.push(errorId);
    if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
    else el.removeAttribute("aria-describedby");
  }

  function syncAria(el) {
    if (!fields.includes(el)) return;
    const invalid = el.matches(":user-invalid");
    el.setAttribute("aria-invalid", String(invalid));
    linkError(el, invalid);
  }

  fields.forEach((el) => el.setAttribute("aria-invalid", "false"));
  form.addEventListener("blur", (e) => syncAria(e.target), true);
  form.addEventListener("input", (e) => syncAria(e.target));
  form.addEventListener("change", (e) => {
    if (e.target.name === "way") form.querySelectorAll('[name="way"]').forEach(syncAria);
    else syncAria(e.target);
  });

  // Our own error lines replace the browser's pop-up bubbles.
  // After a failed Send, the first box with a problem gets the focus.
  let firstInvalid = null;
  form.addEventListener(
    "invalid",
    (event) => {
      event.preventDefault();
      syncAria(event.target);
      if (!firstInvalid) {
        firstInvalid = event.target;
        firstInvalid.focus();
        queueMicrotask(() => (firstInvalid = null));
      }
    },
    true
  );

  // ---------- Sending the order ----------

  function makeOrderNumber() {
    const [n] = crypto.getRandomValues(new Uint16Array(1));
    return `PD-${1000 + (n % 9000)}`; // PD-1000 to PD-9999
  }

  // "+91 98765 43210", "098765-43210" … → "9876543210"
  function cleanPhone(raw) {
    const digits = raw.replace(/\D/g, "");
    return digits.slice(-10);
  }

  const oneLine = (text) => text.replace(/\s+/g, " ").trim();

  function buildMessage(order) {
    const lines = [`*New order ${order.orderNumber}*`, "From the PARSH'S Diner website", ""];
    for (const [id, qty] of Object.entries(order.items)) {
      lines.push(`${qty} × ${MENU[id].name} — ${formatRupees(MENU[id].price * qty)}`);
    }
    lines.push("", `*Total: ${formatRupees(order.total)}*`, "");
    lines.push(`Name: ${order.name}`);
    lines.push(`Phone: ${order.phone.slice(0, 5)} ${order.phone.slice(5)}`);
    if (order.way === "delivery") {
      lines.push("Delivery", `Address: ${order.address}`);
    } else {
      lines.push("Pickup at the restaurant");
    }
    if (order.notes) lines.push(`Notes: ${order.notes}`);
    return lines.join("\n");
  }

  // Sends a copy to the Google Sheet in the background. Fire and forget:
  // - "keepalive" lets it finish even if the visitor leaves the page.
  // - "no-cors" + plain text: Google's script accepts it with no extra checks,
  //   and the site never reads the answer, so it never waits for it.
  // - Any failure is swallowed: the customer never sees a Sheet error.
  function sendToSheet(order) {
    if (!SHEET_WEB_APP_URL) return;
    try {
      fetch(SHEET_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        body: JSON.stringify({
          orderNumber: order.orderNumber,
          items: order.items,
          total: order.total,
          name: order.name,
          phone: order.phone,
          way: order.way,
          address: order.address,
          notes: order.notes,
          website: form.elements.website.value, // the trap box (empty for people)
        }),
      }).catch(() => {});
    } catch {
      // never block the order
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const items = getItems();
    if (!countItems()) return;

    // Spam robot filled the hidden trap box: do nothing at all
    if (form.elements.website.value) return;

    const way = form.elements.way.value;
    const order = {
      orderNumber: makeOrderNumber(),
      items,
      total: totalPrice(items),
      name: oneLine(form.elements.name.value),
      phone: cleanPhone(form.elements.phone.value),
      way,
      address: way === "delivery" ? oneLine(address.value) : "",
      notes: oneLine(form.elements.notes.value),
    };

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(order))}`;
    window.open(url, "_blank", "noopener");
    sendToSheet(order);

    // After sending: save as "last order", empty the cart, show "Order ready"
    saveLastOrder(order);
    clearCart();
    form.reset();
    updateWay();
    fields.forEach((el) => {
      el.setAttribute("aria-invalid", "false");
      linkError(el, false);
    });

    $("[data-sent-number]").textContent = `Order ${order.orderNumber}`;
    $("[data-sent-link]").href = url;
    showView("sent");
    $("[data-sent-title]").focus();
  });
}
