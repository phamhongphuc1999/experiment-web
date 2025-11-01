export function sampleGamma(shape: number, scale: number): number {
  if (shape < 1) {
    const u = Math.random();
    return sampleGamma(1 + shape, scale) * Math.pow(u, 1 / shape);
  }

  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);

  while (true) {
    let x: number, v: number;
    do {
      x = randomNormal();
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;

    const u = Math.random();
    if (
      u < 1 - 0.0331 * (x * x) * (x * x) ||
      Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))
    ) {
      return d * v * scale;
    }
  }
}

export function randomNormal(): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
