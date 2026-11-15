// Test-only: move each piece_NN up by a gap so the layers can be seen apart. Usage: node explode.mjs <in> <out> [gap]
import { NodeIO } from '@gltf-transform/core';
const [, , inPath, outPath, gapArg] = process.argv;
const gap = Number(gapArg || 0.6);
const io = new NodeIO();
const doc = await io.read(inPath);
const pieces = doc.getRoot().listNodes().filter((n) => /^piece_\d+/.test(n.getName())).sort((a, b) => a.getName().localeCompare(b.getName()));
const total = pieces.length;
pieces.forEach((n, i) => n.setTranslation([0, 0, (total - 1 - i) * gap])); // raw Z is "up"
await io.write(outPath, doc);
console.log('exploded', total, 'pieces');
