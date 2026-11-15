// Split the merged burger mesh into separate pieces (one node per piece).
// Usage: node split.mjs <in.glb> <out.glb>
// Pieces = groups of triangles that share vertex indices (no welding, so touching layers stay apart).
// Tiny fragments are attached to the nearest big piece. Each piece's average texture colour is
// printed so the layers can be identified (bun = tan, lettuce = green, tomato = red, cheese = yellow, patty = dark).
import { NodeIO } from '@gltf-transform/core';
import { prune, compactPrimitive } from '@gltf-transform/functions';
import { getPixels } from 'ndarray-pixels';

const [, , inPath, outPath] = process.argv;
const io = new NodeIO();
const doc = await io.read(inPath);
const root = doc.getRoot();

const meshNode = root.listNodes().find((n) => n.getMesh());
const prim = meshNode.getMesh().listPrimitives()[0];
const idx = prim.getIndices().getArray();
const pos = prim.getAttribute('POSITION').getArray();
const uv = prim.getAttribute('TEXCOORD_0').getArray();
const vCount = pos.length / 3;

// union-find over raw vertex indices
const parent = new Int32Array(vCount).map((_, i) => i);
const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
for (let t = 0; t < idx.length; t += 3) {
  const a = find(idx[t]);
  parent[find(idx[t + 1])] = a;
  parent[find(idx[t + 2])] = a;
}
const comps = new Map();
for (let t = 0; t < idx.length; t += 3) {
  const r = find(idx[t]);
  if (!comps.has(r)) comps.set(r, { tris: [], verts: new Set() });
  const c = comps.get(r);
  c.tris.push(idx[t], idx[t + 1], idx[t + 2]);
  c.verts.add(idx[t]); c.verts.add(idx[t + 1]); c.verts.add(idx[t + 2]);
}
const bbox = (verts) => {
  const b = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  for (const v of verts) for (let k = 0; k < 3; k++) {
    b.min[k] = Math.min(b.min[k], pos[v * 3 + k]); b.max[k] = Math.max(b.max[k], pos[v * 3 + k]);
  }
  b.center = b.min.map((m, k) => (m + b.max[k]) / 2);
  return b;
};
const list = [...comps.values()].map((c) => ({ ...c, box: bbox(c.verts) })).sort((a, b) => b.verts.size - a.verts.size);
const big = list.filter((c) => c.verts.size >= 100);
const small = list.filter((c) => c.verts.size < 100);
for (const s of small) {
  const inside = big.filter((b) => [0, 1, 2].every((k) => s.box.center[k] >= b.box.min[k] - 0.02 && s.box.center[k] <= b.box.max[k] + 0.02));
  const pool = inside.length ? inside : big;
  const dist = (b) => Math.hypot(...[0, 1, 2].map((k) => b.box.center[k] - s.box.center[k]));
  const target = pool.reduce((best, b) => (dist(b) < dist(best) ? b : best));
  target.tris.push(...s.tris); for (const v of s.verts) target.verts.add(v);
}

// average texture colour per piece
const baseTex = prim.getMaterial().getBaseColorTexture();
const px = await getPixels(baseTex.getImage(), baseTex.getMimeType());
const [W, H] = px.shape;
const avgColour = (verts) => {
  let r = 0, g = 0, b = 0, n = 0;
  for (const v of verts) {
    const x = Math.min(W - 1, Math.max(0, Math.floor((uv[v * 2] % 1 + 1) % 1 * W)));
    const y = Math.min(H - 1, Math.max(0, Math.floor((uv[v * 2 + 1] % 1 + 1) % 1 * H)));
    r += px.get(x, y, 0); g += px.get(x, y, 1); b += px.get(x, y, 2); n++;
  }
  return [r / n, g / n, b / n].map(Math.round);
};

// "up" in this file is the raw Z axis (the parent node rotates Z to Y). Sort top to bottom.
for (const b of big) { b.box = bbox(b.verts); b.colour = avgColour(b.verts); }
big.sort((a, b) => b.box.center[2] - a.box.center[2]);

const indicesBuffer = prim.getIndices().getBuffer();
big.forEach((b, i) => {
  const name = `piece_${String(i + 1).padStart(2, '0')}`;
  const p = prim.clone();
  p.setIndices(doc.createAccessor(`${name}_indices`).setType('SCALAR').setArray(new Uint32Array(b.tris)).setBuffer(indicesBuffer));
  const m = doc.createMesh(name).addPrimitive(p);
  meshNode.addChild(doc.createNode(name).setMesh(m));
  b.name = name; b.prim = p;
});
const oldMesh = meshNode.getMesh();
meshNode.setMesh(null);
oldMesh.dispose();
for (const b of big) compactPrimitive(b.prim);
await doc.transform(prune());
await io.write(outPath, doc);

console.log('pieces:', big.length, '(fragments merged in:', small.length + ')');
for (const b of big) {
  const h = (b.box.max[2] - b.box.min[2]).toFixed(2), w = (b.box.max[0] - b.box.min[0]).toFixed(2);
  console.log(b.name, '| up from', b.box.min[2].toFixed(2), 'to', b.box.max[2].toFixed(2), '| height', h, '| width', w,
    '| verts', b.verts.size, '| avg colour rgb(' + b.colour.join(',') + ')');
}
