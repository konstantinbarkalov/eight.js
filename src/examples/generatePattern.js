import { MetaPattern } from "../metaPattern.js";

export function generatePattern() {
  const spiked = MetaPattern.spiked(7);
  // spiked.logInfo('spiked');
  const spikedChances = spiked.remap((value, idx) => 2 ** (value * 4)).mul(0.05);
  // spikedChances.logInfo('spikedChances');
  const swooshed = MetaPattern.swooshed(7, 3);
  // swooshed.logInfo('swooshed');

  const spikedSwooshedViaDot = spikedChances.mul(swooshed);
  // spikedSwooshedViaDot.logInfo('spikedSwooshedViaDot');
  const spikedSwooshedViaDotNormalized = spikedSwooshedViaDot.mul(1 / spikedSwooshedViaDot.max);
  // spikedSwooshedViaDotNormalized.logInfo('spikedSwooshedViaDotNormalized');

  const handmadeKernel = MetaPattern.prefilled(2 ** 7, 0);
  handmadeKernel.values[0] = 0.5;
  handmadeKernel.values[32] = 0.1;
  handmadeKernel.values[64] = 0.3;
  handmadeKernel.values[96] = 0.1;
  // handmadeKernel.logInfo('handmadeKernel');

  const ccced = swooshed.ccc(handmadeKernel);
  // ccced.logInfo('ccced');

  const unity = MetaPattern.prefilled(2 ** 7);
  unity.values[0] = 1;
  // unity.logInfo('unity');
  
  const final = spikedSwooshedViaDotNormalized.remap((value) => value > Math.random() ? 0.8 : null);
  final.logInfo('final');
  return final;
}
