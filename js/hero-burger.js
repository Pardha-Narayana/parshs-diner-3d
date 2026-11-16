// PARSH'S Diner — the 3D burger in the hero.
// 1. The backup still image is already on the page (it shows first).
// 2. After the page has appeared and the visitor first scrolls, touches,
//    moves the mouse or presses a key (and only if this device can run 3D),
//    we load model-viewer and the 3D burger in the background.
// 3. When the 3D burger is fully ready, it replaces the still image.
//    If anything goes wrong, the still image simply stays.

const stage = document.querySelector("[data-burger]");

// Settings shared with the still image (see tools/burger/README.md),
// so the 3D burger lines up exactly with the backup image.
const MODEL = {
  src: "/assets/models/burger.glb",
  "camera-orbit": "30deg 78deg auto",
  // only sideways spin: the up/down angle is locked
  "min-camera-orbit": "-Infinity 78deg auto",
  "max-camera-orbit": "Infinity 78deg auto",
  exposure: "1.05",
  "shadow-intensity": "1",
  "shadow-softness": "0.9",
  "environment-image": "neutral", // soft studio light
  "animation-name": "open", // stays at time 0 = closed (no autoplay)
  "interaction-prompt": "none", // no wiggling hand hint: nothing moves by itself
  "touch-action": "pan-y", // phones: vertical swipes scroll the page
  loading: "eager",
  reveal: "auto",
};

function canShow3D() {
  // Respect "data saver": keep the light still image
  if (navigator.connection && navigator.connection.saveData) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Setting up the 3D burger keeps a phone busy for a few seconds. So we wait
// for the visitor's first action (scroll, touch, mouse move, key press) after
// the page has appeared. Until then the still image shows, and it looks
// exactly like the closed 3D burger.
const FIRST_ACTIONS = ["scroll", "wheel", "touchstart", "pointerdown", "pointermove", "keydown"];

function onFirstAction(task) {
  let started = false;
  const go = () => {
    if (started) return;
    started = true;
    for (const name of FIRST_ACTIONS) window.removeEventListener(name, go);
    // start just after this action is handled, so the action itself stays quick
    setTimeout(task, 0);
  };
  const listen = () => {
    for (const name of FIRST_ACTIONS) window.addEventListener(name, go, { passive: true });
  };
  if (document.readyState === "complete") listen();
  else window.addEventListener("load", listen, { once: true });
}

async function load3D() {
  try {
    await import("@google/model-viewer");
  } catch {
    return; // could not load the 3D library: keep the still image
  }

  const still = stage.querySelector(".hero__still");
  const viewer = document.createElement("model-viewer");
  viewer.className = "hero__model";
  viewer.setAttribute("alt", still.alt); // model-viewer adds its own "use arrow keys" hint
  for (const [name, value] of Object.entries(MODEL)) viewer.setAttribute(name, value);
  viewer.toggleAttribute("camera-controls", true);
  viewer.toggleAttribute("disable-zoom", true);
  viewer.toggleAttribute("disable-pan", true);
  viewer.toggleAttribute("disable-tap", true);

  viewer.addEventListener(
    "load",
    () => {
      // wait two frames so the first 3D picture is drawn before we swap
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          stage.classList.add("is-3d");
          still.setAttribute("aria-hidden", "true");
          // tell js/motion.js the 3D burger is ready for the scroll opening
          stage.dispatchEvent(new CustomEvent("burger:ready", { detail: { viewer } }));
        })
      );
    },
    { once: true }
  );
  viewer.addEventListener("error", () => viewer.remove(), { once: true });

  stage.append(viewer);
}

if (stage && canShow3D()) onFirstAction(load3D);
