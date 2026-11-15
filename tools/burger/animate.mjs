// Add the "open" animation to the layered burger. Usage: node animate.mjs <in.glb> <out.glb>
// One clip called "open", 1 second long, straight-line (the website eases it with GSAP ScrollTrigger).
// Time 0 = closed burger (exactly as modelled). Time 1 = layers gently apart.
// The layers move along their local Z axis, which is "up" once the Sketchfab parent rotation is applied.
// The bottom bun stays still; each layer above it rises a little more than the one below.
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';

const [, , inPath, outPath] = process.argv;
// model units; the burger is about 3 units tall. Kept small so the open burger still reads as one burger.
const LIFT = { top_bun: 0.85, lettuce: 0.55, filling: 0.25, bottom_bun: 0 };

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(inPath);
const root = doc.getRoot();
if (root.listAnimations().length) throw new Error('This file already has an animation. Use the file without one.');

const buffer = root.listBuffers()[0];
const times = doc.createAccessor('open_times').setType('SCALAR').setArray(new Float32Array([0, 1])).setBuffer(buffer);
const anim = doc.createAnimation('open');

for (const [name, lift] of Object.entries(LIFT)) {
  const node = root.listNodes().find((n) => n.getName() === name);
  if (!node) throw new Error(`Layer "${name}" not found. Run split.mjs and group.mjs first.`);
  const [x, y, z] = node.getTranslation();
  const values = doc.createAccessor(`open_${name}`).setType('VEC3')
    .setArray(new Float32Array([x, y, z, x, y, z + lift])).setBuffer(buffer);
  const sampler = doc.createAnimationSampler().setInput(times).setOutput(values).setInterpolation('LINEAR');
  const channel = doc.createAnimationChannel().setTargetNode(node).setTargetPath('translation').setSampler(sampler);
  anim.addSampler(sampler).addChannel(channel);
}

await io.write(outPath, doc);
console.log('added animation "open" (1 s) to', Object.keys(LIFT).join(', '));
