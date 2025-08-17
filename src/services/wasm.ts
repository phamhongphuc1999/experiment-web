let wasm: typeof import('../../public/pkg');

export async function initWasm() {
  if (!wasm) {
    wasm = await import('../../public/pkg/aes');
    await wasm.default();
  }
  return wasm;
}
