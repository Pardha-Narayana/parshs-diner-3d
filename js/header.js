// PARSH'S Diner — header turns solid after a little scroll.
// css/site.css (header part) also tries to do this with CSS alone (a very new browser
// feature). That feature did not switch on reliably in Chrome, so this
// script now runs in EVERY browser: it adds the "is-solid" class itself.

const header = document.querySelector(".site-header");

if (header) {
  // A tiny invisible marker at the very top of the page.
  // When it leaves the screen, the page has scrolled: make the header solid.
  const marker = document.createElement("div");
  marker.setAttribute("aria-hidden", "true");
  marker.style.cssText =
    "position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none;visibility:hidden";
  document.body.prepend(marker);

  new IntersectionObserver(([entry]) => {
    header.classList.toggle("is-solid", !entry.isIntersecting);
  }).observe(marker);
}
