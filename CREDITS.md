# CREDITS.md — thank-you list

Everything used in this site that was made by someone else, with where it came from and its licence (permission to use it).
Add a line here the moment something new is used.

---

## Code libraries
| Name | What it does | Source | Licence |
|---|---|---|---|
| GSAP **3.15.1** (core + ScrollTrigger) — `vendor/gsap/` (`index.js`, `gsap-core.js`, `CSSPlugin.js`, `ScrollTrigger.js`, `Observer.js`; ES module files, unchanged) | Animations, and the scroll-controlled burger opening | Official `gsap` npm package (greensock/GSAP), by GreenSock / Webflow | GSAP Standard "No Charge" License — https://gsap.com/standard-license (free for commercial websites; copyright notices must stay in the files). Note in `vendor/gsap/LICENSE.md` |
| Lenis **1.3.27** — `vendor/lenis/lenis.mjs` (ES module) and `vendor/lenis/lenis.css`, unchanged | Light smooth scrolling | Official `lenis` npm package (darkroomengineering/lenis), by darkroom.engineering | MIT License — copy in `vendor/lenis/LICENSE` |
| model-viewer **4.4.0** — `vendor/model-viewer/model-viewer.min.js` (self-contained ES module build, unchanged) | Shows the 3D burger | Official `@google/model-viewer` npm package (google/model-viewer), by Google | Apache License 2.0 — copy in `vendor/model-viewer/LICENSE`. The file also contains three.js (MIT, Three.js Authors) and Lit (BSD-3-Clause, Google); their licence notices are kept inside the file |

## Fonts
| Name | Source | Licence |
|---|---|---|
| Big Shoulders Display (variable font, one file for all its weights; we use 700 and 900) — `assets/fonts/big-shoulders-display-latin.woff2`, Latin characters only | Google Fonts (fonts.google.com, file from fonts.gstatic.com, version v24). Made by The Big Shoulders Project Authors — https://github.com/xotypeco/big_shoulders | SIL Open Font License 1.1 — copy in `assets/fonts/OFL-BigShouldersDisplay.txt` |
| Figtree (variable font, one file for all its weights; we use 400 and 600) — `assets/fonts/figtree-latin.woff2`, Latin characters only | Google Fonts (fonts.google.com, file from fonts.gstatic.com, version v9). Made by The Figtree Project Authors — https://github.com/erikdkennedy/figtree | SIL Open Font License 1.1 — copy in `assets/fonts/OFL-Figtree.txt` |
| Big Shoulders Display, ₹ sign only — `assets/fonts/big-shoulders-display-rupee.woff2` (the Latin file has no ₹) | Google Fonts (official one-character file from fonts.gstatic.com, version v24). Same makers as above | SIL Open Font License 1.1 — copy in `assets/fonts/OFL-BigShouldersDisplay.txt` |
| Figtree, ₹ sign only — `assets/fonts/figtree-rupee.woff2` (the Latin file has no ₹) | Google Fonts (official one-character file from fonts.gstatic.com, version v9). Same makers as above | SIL Open Font License 1.1 — copy in `assets/fonts/OFL-Figtree.txt` |

## Images and icons
| What | Source / maker | Licence | Credit required? |
|---|---|---|---|
| Burger photo (temporary stock) — `assets/images/menu-burger.jpg` | amirali mirhashemian on Unsplash — https://unsplash.com/photos/burger-with-lettuce-and-tomatoes-sc5sTPMrVfk | Unsplash License (free to use) | No, but credit is kindly given |
| Chocolate milkshake photo (temporary stock) — `assets/images/menu-milkshake-chocolate.jpg` | Knight Duong on Unsplash — https://unsplash.com/photos/chocolate-ice-cream-on-brown-wooden-coaster-BjUq2rdl9_s | Unsplash License (free to use) | No, but credit is kindly given |
| Cherry milkshake photo (temporary stock) — `assets/images/menu-milkshake-cherry.jpg` | Ruwell Salatan on Unsplash — https://unsplash.com/photos/a-cup-of-ice-cream-with-a-cherry-on-top-L3okRM9e5AE | Unsplash License (free to use) | No, but credit is kindly given |
| French toast photo (temporary stock) — `assets/images/menu-french-toast.jpg` | Joseph Gonzalez on Unsplash — https://unsplash.com/photos/toast-bread-with-blueberry-on-black-plate-zcUgjyqEwe8 | Unsplash License (free to use) | No, but credit is kindly given |
| Ribbon pasta photo (temporary stock) — `assets/images/menu-pasta-tagliatelle.jpg` | sorin popa on Unsplash — https://unsplash.com/photos/pasta-with-green-leaf-on-black-plate-XAxvKp0tdwU | Unsplash License (free to use) | No, but credit is kindly given |
| Penne pasta photo (temporary stock) — `assets/images/menu-pasta-penne.jpg` | Brelyn Bashrum on Unsplash — https://unsplash.com/photos/a-fork-lifts-penne-pasta-coated-in-red-sauce-0CHWRa_ZqJ4 | Unsplash License (free to use) | No, but credit is kindly given |

## 3D models
| What | Source / maker | Licence | Credit required? |
|---|---|---|---|
| 3D burger — `assets/models/burger.glb` | "Hamburger" by Simal Mai on Sketchfab — https://sketchfab.com/3d-models/hamburger-346ebe0033ba48f7bc2e10d44a5b482f | CC Attribution 4.0 (CC-BY) — https://creativecommons.org/licenses/by/4.0/ | **Yes** — credit must also be shown on the website. Changes made: split into 4 layers (top_bun, lettuce, filling, bottom_bun), textures shrunk to 2048 px WebP, solid middles added inside each layer, and an "open" animation added. |
| Backup still image of the 3D burger — `assets/images/hero-burger.webp` | Rendered by us from the same "Hamburger" model by Simal Mai (see the row above) | CC Attribution 4.0 (CC-BY) | **Yes** — same credit as the 3D burger. |

## Claude Code skills used to build this site
| Name | Source |
|---|---|
| GSAP skills (6) | github.com/greensock/gsap-skills |
| frontend-design | Anthropic (claude-plugins-official) |
| modern-web-guidance | Google Chrome team (claude-plugins-official) |
| chrome-devtools MCP | Google Chrome DevTools team (chrome-devtools-mcp) |
