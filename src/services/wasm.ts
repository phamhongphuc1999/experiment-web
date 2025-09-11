let wasm: typeof import('../../public/pkg/crypt');

export async function initWasm() {
  if (!wasm) {
    wasm = await import('../../public/pkg/crypt');
    await wasm.default();
  }
  return wasm;
}
