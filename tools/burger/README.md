# Burger tools — how `assets/models/burger.glb` and its still image were made

These scripts are only for preparing the 3D burger. The live website does not use them.

## What they do
1. `split.mjs` — Sketchfab delivers the burger as one merged part. This script splits it into its 8 unconnected pieces (`piece_01` … `piece_08`, top to bottom) and prints each piece's height and average colour.
2. `group.mjs` — groups the 8 pieces into 4 named layers:
   - `top_bun` = piece_01
   - `lettuce` = pieces 02–05
   - `filling` = pieces 06–07 (tomato, cheese and both patties are one connected shape in this model)
   - `bottom_bun` = piece_08
3. `animate.mjs` — adds the "open" animation (1 second): the bottom bun stays still, filling rises 0.35, lettuce 0.7, top bun 1.1 (the burger is about 3 units tall). Time 0 = closed, time 1 = gently open. The website sets the time from the scroll position.
4. `explode.mjs` — test only: pulls the pieces apart so you can see them. Its output is never used on the site.
5. `still.html` + `still-server.cjs` — make the backup still image `assets/images/hero-burger.webp` (closed burger, see-through background).

## How to rebuild the burger
You need Node.js (it includes `npm` and `npx`).

1. Download the source model from Sketchfab (free account needed):
   https://sketchfab.com/3d-models/hamburger-346ebe0033ba48f7bc2e10d44a5b482f
   → Download 3D Model → **GLB, texture size 4k** (about 12.6 MB). Save it as `hamburger-4k.glb` **outside** the project (it is too big to keep here).
2. Open a terminal in this folder (`tools/burger`) and run once:
   `npm install`
   (This creates a `node_modules` folder here. Git ignores it.)
3. Split and group (replace the paths with your own):
   `node split.mjs <path>/hamburger-4k.glb <path>/split-4k.glb`
   `node group.mjs <path>/split-4k.glb <path>/layers-4k.glb`
4. Shrink, keeping the layers apart (run from any folder outside the project):
   `npx @gltf-transform/cli@4.5.1 optimize <path>/layers-4k.glb <path>/burger.glb --compress false --join false --flatten false --instance false --simplify false --texture-compress webp --texture-size 2048`
5. Add the opening animation:
   `node animate.mjs <path>/burger.glb <path>/burger-animated.glb`
6. Copy `burger-animated.glb` to `assets/models/burger.glb`. Expected size: about 1.77 MB.

## How to remake the backup still image
1. Copy `assets/models/burger.glb` into this folder (`tools/burger/burger.glb`; delete the copy afterwards).
2. In this folder run `node still-server.cjs` (it serves this folder on http://localhost:3098).
3. Open http://localhost:3098/still.html in Chrome with the window visible (a hidden window draws nothing). Open the browser console and run `await makeStill()`.
4. The picture is saved as `tools/burger/saved/hero-burger.webp` (1000 × 1000 px). Copy it to `assets/images/hero-burger.webp`, then delete the `saved` folder and stop the server with Ctrl + C.
Camera and light used: `camera-orbit="30deg 78deg auto"`, `exposure="1.05"`, `shadow-intensity="1"`, `shadow-softness="0.9"`. If the hero's camera angle changes later, remake the still with the same angle.

**Use gltf-transform version 4.5.1.** Version 4.1.1 fails on Windows with "colourspace: parameter space not set".

## Optional check
`node group.mjs <path>/split-4k.glb <path>/exploded.glb 0.9` makes a test copy with the 4 layers pulled apart.

## Licence of the model
"Hamburger" by Simal Mai, CC BY 4.0. Credit must stay in CREDITS.md and in the website footer.
