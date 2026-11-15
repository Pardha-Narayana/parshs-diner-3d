// PARSH'S Diner — motion (SITE-PLAN.md section 6).
// 1. Light smooth scrolling with Lenis (mouse wheel only; phones keep
//    their own touch scrolling).
// 2. The ONE scroll moment: the 3D burger opens as you scroll from the
//    hero toward the menu, and closes again when you scroll back up.
// Both only run when the visitor has NOT asked for reduced motion.
// This file loads after the page has appeared, so it never slows the first paint.

function afterPageAppears(task) {
  const start = () =>
    "requestIdleCallback" in window
      ? requestIdleCallback(task, { timeout: 2000 })
      : setTimeout(task, 200);
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
}

async function startMotion() {
  const [{ default: gsap }, { default: ScrollTrigger }, { default: Lenis }] =
    await Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]);

  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", (context) => {
    // ---------- 1. Smooth scrolling ----------
    // lerp 0.12 = a light glide that settles quickly (never slow or "floaty").
    // syncTouch stays off, so phones use their own native touch scrolling.
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true, syncTouch: false, autoRaf: false });

    // Lenis and ScrollTrigger share GSAP's clock, as the GSAP docs recommend
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // ---------- 2. The burger opening ----------
    const stage = document.querySelector("[data-burger]");
    let viewer = null;

    // Only once the 3D burger is ready. If the backup image stays, nothing happens.
    // Named context method, so GSAP still cleans it up when reduce motion turns on.
    context.add("setUpOpening", (readyViewer) => {
      viewer = readyViewer;
      // The "open" animation is 1 second long. Stop just before its very end:
      // at exactly the end, model-viewer jumps back to the start (closed).
      const length = (viewer.duration || 1) * 0.999;
      const state = { time: 0 };

      // The open burger is taller than the closed one. So while it opens, the
      // camera moves back a little (20%) and aims a little higher (0.4), keeping
      // the top bun inside the box. Closed = exactly the starting camera, which
      // matches the backup still image.
      const target = viewer.getCameraTarget();
      const startRadius = viewer.getCameraOrbit().radius;
      // allow the camera to move back that far (model-viewer limits it otherwise)
      viewer.maxCameraOrbit = `Infinity 78deg ${startRadius * 1.25}m`;

      gsap.to(state, {
        time: length,
        ease: "none", // the opening follows the scroll exactly
        onUpdate: () => {
          const open = state.time / length; // 0 = closed, 1 = open
          viewer.currentTime = state.time; // model-viewer redraws only when this changes
          const orbit = viewer.getCameraOrbit(); // keep the visitor's own spin angle
          viewer.cameraTarget = `${target.x}m ${target.y + 0.4 * open}m ${target.z}m`;
          viewer.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${startRadius * (1 + 0.2 * open)}m`;
          viewer.jumpCameraToGoal(); // no camera lag: it follows the scroll exactly
        },
        scrollTrigger: {
          trigger: stage,
          // clamp() keeps the start at the top of the page, so the burger is always
          // closed when the page opens, even when it is already on screen (computers)
          start: "clamp(top 85%)",
          // Fully open when the burger box's top is just below the header, so the
          // whole burger is still clearly in view. On computers the burger starts
          // high on the screen, so give it at least 150px of scrolling to open.
          end: (self) => {
            const header = document.querySelector(".site-header").offsetHeight;
            const boxTop = self.trigger.getBoundingClientRect().top + window.scrollY;
            return Math.max(boxTop - header - 8, 150);
          },
          scrub: true, // moves only while scrolling, stops when scrolling stops
        },
      });
    });

    const onReady = (event) => context.setUpOpening(event.detail.viewer);
    if (stage) {
      const readyNow = stage.classList.contains("is-3d") && stage.querySelector("model-viewer");
      if (readyNow) context.setUpOpening(readyNow);
      else stage.addEventListener("burger:ready", onReady, { once: true });
    }

    // Runs if "reduce motion" is switched on while the page is open
    return () => {
      stage?.removeEventListener("burger:ready", onReady);
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (viewer) {
        // burger back to closed, camera back to its starting place
        viewer.currentTime = 0;
        viewer.cameraTarget = "auto auto auto";
        viewer.cameraOrbit = "30deg 78deg auto";
        viewer.jumpCameraToGoal();
      }
    };
  });
}

afterPageAppears(startMotion);
