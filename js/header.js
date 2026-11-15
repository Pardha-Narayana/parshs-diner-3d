// PARSH'S Diner — header turns solid after a little scroll.
// Newer browsers already do this in css/header.css with no script.
// This file only helps browsers that cannot do it in CSS yet.

const header = document.querySelector(".site-header");

if (header && !CSS.supports("container-type", "scroll-state")) {
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
