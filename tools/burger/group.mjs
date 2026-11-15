// Group split pieces into named layers. Usage: node group.mjs <in> <out> [explodeGap]
// Layers (top to bottom): top_bun = piece_01, lettuce = 02-05, filling = 06-07, bottom_bun = 08.
import { NodeIO } from '@gltf-transform/core';
const [, , inPath, outPath, gapArg] = process.argv;
const gap = Number(gapArg || 0);
const io = new NodeIO();
const doc = await io.read(inPath);
const nodes = doc.getRoot().listNodes();
const byName = (n) => nodes.find((x) => x.getName() === n);
const parent = byName('piece_01').getParentNode();
const layers = [
  ['top_bun', ['piece_01']],
  ['lettuce', ['piece_02', 'piece_03', 'piece_04', 'piece_05']],
  ['filling', ['piece_06', 'piece_07']],
  ['bottom_bun', ['piece_08']],
];
layers.forEach(([name, pieces], i) => {
  const layer = doc.createNode(name).setTranslation([0, 0, (layers.length - 1 - i) * gap]); // raw Z is "up"
  parent.addChild(layer);
  for (const p of pieces) { const n = byName(p); parent.removeChild(n); layer.addChild(n); }
});
await io.write(outPath, doc);
console.log('layers:', layers.map((l) => l[0]).join(', '));
