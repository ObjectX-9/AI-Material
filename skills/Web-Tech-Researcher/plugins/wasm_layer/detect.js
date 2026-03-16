/**
 * WASM Layer — WebAssembly 模块检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

const detectWasm = () => {
  const r = {};

  // 已知 WASM 模块检测
  if (window.PathKit) r.pathkit = true;
  if (window.CanvasKitInit) r.canvaskit = true;
  if (window.cv) r.opencv = true;
  if (window.FFmpeg || window.createFFmpegCore) r.ffmpeg = true;
  if (window.Module?._malloc) r.emscripten = true;
  if (window.Go) r.goWasm = true;

  // Rust wasm-bindgen 检测
  const scripts = [...document.querySelectorAll('script[src]')].map(s => s.src);
  r.possibleRust = scripts.some(s => /wasm_bindgen|wasm-bindgen/.test(s));

  // 并行能力
  r.sharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined';
  r.crossOriginIsolated = window.crossOriginIsolated;

  return r;
};
