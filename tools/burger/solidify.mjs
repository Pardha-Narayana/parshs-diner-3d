// Make every burger layer look solid when the burger opens.
// Usage: node solidify.mjs <in.glb> <out.glb>
// Run it on the shrunk, layered burger BEFORE animate.mjs (the input must have no animation).
//
// Why: the original model only has the outside of each layer. The middles were never made,
// because they are hidden when the burger is closed. Opened, the layers look like empty rings.
// What it adds (each piece is a child of its layer, so it moves with it):
//   top_bun    - a soft bread-coloured cut side closing the bottom of the dome
//   lettuce    - a lettuce-green disc with real thickness filling the middle of the leaf ring
//   filling    - a tomato-red top and a patty-brown bottom closing the filling
//   bottom_bun - a bread-coloured cut side closing any hole on top
// Lettuce, tomato and patty colours are measured from the model's own texture, so they match.
// All new pieces sit inside the closed burger, so the closed burger looks exactly the same.
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { getPixels } from 'ndarray-pixels';

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) throw new Error('Usage: node solidify.mjs <in.glb> <out.glb>');

const SECTORS = 96;              // how many slices around the circle the new discs have
const BREAD = [0.93, 0.80, 0.60]; // soft bread colour for the cut sides of the buns (sRGB 0-1)

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(inPath);
const root = doc.getRoot();
if (root.listAnimations().length) throw new Error('Run solidify.mjs before animate.mjs (this file already has an animation).');
const buffer = root.listBuffers()[0];
const layerNode = (name) => {
  const n = root.listNodes().find((x) => x.getName() === name);
  if (!n) throw new Error(`Layer "${name}" not found. Run split.mjs and group.mjs first.`);
  return n;
};

// ---------- reading the model ----------
function mul(m, v) { // 4x4 column-major matrix x point
  return [m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12], m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13], m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14]];
}
// All points of a layer, in the layer's own space (raw Z is "up"), with their texture position.
function layerPoints(layer) {
  const pts = [];
  for (const piece of layer.listChildren()) {
    const mesh = piece.getMesh(); if (!mesh) continue;
    const m = piece.getMatrix();
    for (const prim of mesh.listPrimitives()) {
      const pos = prim.getAttribute('POSITION'); const uv = prim.getAttribute('TEXCOORD_0');
      for (let i = 0; i < pos.getCount(); i++) pts.push({ p: mul(m, pos.getElement(i, [])), uv: uv ? uv.getElement(i, []) : null, prim, piece, i });
    }
  }
  return pts;
}
// Open edges (edges used by only one triangle) of one primitive, joined into loops.
function openLoops(prim) {
  const pos = prim.getAttribute('POSITION'); const idx = prim.getIndices();
  const key = (i) => pos.getElement(i, []).map((x) => x.toFixed(4)).join(',');
  const weld = new Map(); const id = [];
  for (let i = 0; i < pos.getCount(); i++) { const k = key(i); if (!weld.has(k)) weld.set(k, i); id.push(weld.get(k)); }
  const count = new Map(); const tris = idx ? idx.getCount() / 3 : pos.getCount() / 3;
  for (let t = 0; t < tris; t++) {
    const v = [0, 1, 2].map((k) => id[idx ? idx.getScalar(3 * t + k) : 3 * t + k]);
    for (const [a, b] of [[v[0], v[1]], [v[1], v[2]], [v[2], v[0]]]) { const e = a < b ? `${a}_${b}` : `${b}_${a}`; count.set(e, (count.get(e) || 0) + 1); }
  }
  const next = new Map();
  for (const [e, c] of count) if (c === 1) { const [a, b] = e.split('_').map(Number); (next.get(a) || next.set(a, []).get(a)).push(b); (next.get(b) || next.set(b, []).get(b)).push(a); }
  const loops = []; const seen = new Set();
  for (const start of next.keys()) {
    if (seen.has(start)) continue;
    const loop = [start]; seen.add(start); let prev = -1, cur = start;
    for (;;) { const nxt = (next.get(cur) || []).find((n) => n !== prev && !seen.has(n)); if (nxt === undefined) break; loop.push(nxt); seen.add(nxt); prev = cur; cur = nxt; }
    loops.push(loop.map((i) => pos.getElement(i, [])));
  }
  return loops;
}

// ---------- measuring colours from the texture ----------
const texture = root.listTextures()[0];
const pixels = texture ? await getPixels(texture.getImage(), texture.getMimeType()) : null;
// Average texture colour at these points. `keep` picks only matching colours
// (for example only red ones, so cheese next to the tomato is not mixed in).
function averageColour(points, keep = () => true) {
  if (!pixels) return [0.5, 0.5, 0.5];
  const [w, h] = pixels.shape; let r = 0, g = 0, b = 0, n = 0;
  for (const { uv } of points) {
    if (!uv) continue;
    const x = Math.min(w - 1, Math.max(0, Math.floor((uv[0] % 1) * w))), y = Math.min(h - 1, Math.max(0, Math.floor((uv[1] % 1) * h)));
    const c = [0, 1, 2].map((k) => pixels.get(x, y, k) / 255);
    if (!keep(c)) continue;
    r += c[0]; g += c[1]; b += c[2]; n++;
  }
  return n ? [r / n, g / n, b / n] : null;
}
const isTomato = ([r, g, b]) => r > 0.45 && g < r * 0.5 && b < r * 0.5;          // clearly red
const isPatty = ([r, g, b]) => r < 0.45 && r > g && g >= b * 0.8 && r + g + b < 1; // dark brown
const isLettuce = ([r, g, b]) => g > r && g > b;                                  // green
const toLinear = (c) => c.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
function material(name, srgb, roughness) {
  return doc.createMaterial(name).setBaseColorFactor([...toLinear(srgb), 1]).setRoughnessFactor(roughness).setMetallicFactor(0).setDoubleSided(true);
}

// ---------- building new pieces ----------
function addMesh(layer, name, positions, normals, indices, mat) {
  const acc = (type, arr) => doc.createAccessor().setType(type).setArray(arr).setBuffer(buffer);
  const prim = doc.createPrimitive()
    .setAttribute('POSITION', acc('VEC3', new Float32Array(positions)))
    .setAttribute('NORMAL', acc('VEC3', new Float32Array(normals)))
    .setIndices(acc('SCALAR', new Uint32Array(indices)))
    .setMaterial(mat);
  layer.addChild(doc.createNode(name).setMesh(doc.createMesh(name).addPrimitive(prim)));
}
// Close an open loop with a flat fan of triangles (used for the bun cut sides).
function capLoop(layer, name, loop, up, mat) {
  const c = loop.reduce((s, v) => [s[0] + v[0], s[1] + v[1], s[2] + v[2]], [0, 0, 0]).map((s) => s / loop.length);
  const positions = [...c], normals = [0, 0, up], indices = [];
  loop.forEach((v) => { positions.push(v[0], v[1], v[2]); normals.push(0, 0, up); });
  for (let i = 0; i < loop.length; i++) indices.push(0, 1 + i, 1 + ((i + 1) % loop.length));
  addMesh(layer, name, positions, normals, indices, mat);
}
// For each slice around the centre: the distance to the nearest point (= inner edge of a ring).
function innerRadius(points, cx, cy) {
  const r = new Array(SECTORS).fill(Infinity);
  for (const { p } of points) {
    const a = Math.atan2(p[1] - cy, p[0] - cx); const s = Math.floor(((a + Math.PI) / (2 * Math.PI)) * SECTORS) % SECTORS;
    r[s] = Math.min(r[s], Math.hypot(p[0] - cx, p[1] - cy));
  }
  const known = r.filter(Number.isFinite); const fallback = known.length ? Math.min(...known) : 0.5;
  return r.map((v) => (Number.isFinite(v) ? v : fallback));
}
// A flat disc (or a disc with thickness, when bottom !== top) following the per-slice radius.
function disc(layer, name, cx, cy, radius, top, bottom, mat) {
  const positions = [], normals = [], indices = [];
  const ring = (z, nz) => { const start = positions.length / 3; positions.push(cx, cy, z); normals.push(0, 0, nz);
    for (let s = 0; s < SECTORS; s++) { const a = -Math.PI + ((s + 0.5) / SECTORS) * 2 * Math.PI; positions.push(cx + radius[s] * Math.cos(a), cy + radius[s] * Math.sin(a), z); normals.push(0, 0, nz); }
    for (let s = 0; s < SECTORS; s++) indices.push(start, start + 1 + s, start + 1 + ((s + 1) % SECTORS));
    return start; };
  const t = ring(top, 1);
  if (bottom !== top) {
    const b = ring(bottom, -1);
    for (let s = 0; s < SECTORS; s++) { const s2 = (s + 1) % SECTORS; indices.push(t + 1 + s, b + 1 + s, t + 1 + s2, t + 1 + s2, b + 1 + s, b + 1 + s2); }
  }
  addMesh(layer, name, positions, normals, indices, mat);
}

// ---------- the four layers ----------
const all = ['top_bun', 'lettuce', 'filling', 'bottom_bun'].flatMap((n) => layerPoints(layerNode(n)));
const xs = all.map((q) => q.p[0]), ys = all.map((q) => q.p[1]);
const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2; // burger's middle line
const bread = material('cut_bread', BREAD, 0.95);
const zOf = (pts) => pts.map((q) => q.p[2]);
const report = [];

// Buns: close each open loop with a bread-coloured cut side.
for (const [name, up] of [['top_bun', -1], ['bottom_bun', 1]]) {
  const layer = layerNode(name); let n = 0;
  for (const piece of layer.listChildren()) for (const prim of piece.getMesh()?.listPrimitives() || []) {
    for (const loop of openLoops(prim)) {
      if (loop.length < 8) continue; // ignore tiny slivers
      capLoop(layer, `${name}_cut_${++n}`, loop.map((v) => mul(piece.getMatrix(), v)), up, bread);
      report.push(`${name}: closed a hole of ${loop.length} edges at height ${(loop.reduce((s, v) => s + v[2], 0) / loop.length).toFixed(2)}`);
    }
  }
}

// Lettuce: a green disc with real thickness, tucked a little under the leaf ring.
{
  const layer = layerNode('lettuce'); const pts = layerPoints(layer);
  // only a small overlap: a wider disc pokes out between the leaf frills on the closed burger
  const r = innerRadius(pts, cx, cy).map((v) => v + 0.03);
  const innerPts = pts.filter((q) => Math.hypot(q.p[0] - cx, q.p[1] - cy) < Math.min(...r) + 0.15);
  // sit slightly below the leaves' inner edge, so the closed burger hides it completely
  const z = zOf(innerPts).reduce((s, v) => s + v, 0) / innerPts.length - 0.03;
  const colour = averageColour(innerPts, isLettuce) || [0.6, 0.72, 0.3];
  disc(layer, 'lettuce_middle', cx, cy, r, z + 0.02, z - 0.02, material('lettuce_middle', colour, 0.6));
  report.push(`lettuce: disc at height ${z.toFixed(2)}, 0.04 thick, colour ${colour.map((v) => v.toFixed(2))}`);
}

// Filling: a tomato-red top and a patty-brown bottom.
{
  const layer = layerNode('filling'); const pts = layerPoints(layer); const z = zOf(pts);
  const zMax = Math.max(...z), zMin = Math.min(...z);
  for (const [name, band, isTop] of [['filling_top', pts.filter((q) => q.p[2] > zMax - 0.12), true], ['filling_bottom', pts.filter((q) => q.p[2] < zMin + 0.15), false]]) {
    const raw = innerRadius(band, cx, cy);
    // Cheese drips can make a slice look wider than it is: keep each slice
    // close to the typical (median) size so the disc never pokes out.
    const median = [...raw].sort((a, b) => a - b)[Math.floor(raw.length / 2)];
    const r = raw.map((v) => Math.min(v, median * 1.08));
    const lip = band.filter((q) => { const a = Math.atan2(q.p[1] - cy, q.p[0] - cx); const s = Math.floor(((a + Math.PI) / (2 * Math.PI)) * SECTORS) % SECTORS; return Math.hypot(q.p[0] - cx, q.p[1] - cy) < r[s] + 0.12; });
    const zc = zOf(lip).reduce((s, v) => s + v, 0) / lip.length;
    const colour = isTop ? averageColour(band, isTomato) || [0.8, 0.15, 0.1] : averageColour(pts, isPatty) || [0.3, 0.17, 0.1];
    // top: tuck a little under the tomato ring; bottom: stay just inside the patty edge so it never shows as a band
    disc(layer, name, cx, cy, r.map((v) => (isTop ? v + 0.08 : Math.min(v, median) * 0.97)), zc + (isTop ? -0.01 : 0.01), zc + (isTop ? -0.01 : 0.01), material(name, colour, isTop ? 0.4 : 0.8));
    report.push(`filling: ${isTop ? 'top' : 'bottom'} at height ${zc.toFixed(2)}, colour ${colour.map((v) => v.toFixed(2))}`);
  }
}

await io.write(outPath, doc);
console.log(report.join('\n'));
