/**
 * Simple WebAssembly loader utility.
 * In a real-world scenario with Emscripten, you might use the
 * generated .js glue code, but for simple functions,
 * WebAssembly.instantiateStreaming is often enough.
 */
export async function loadWasm(url: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const module = await WebAssembly.instantiate(buffer);
  return module.instance.exports;
}
