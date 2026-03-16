# WebAssembly 模块指纹

> 激活条件：Network 中发现 `.wasm` 文件

---

## 已知 WASM 模块

| 模块 | 全局变量 | 源语言 | 用途 |
|:---|:---|:---|:---|
| PathKit (Skia) | `window.PathKit` | C++ | 路径计算、布尔运算 |
| CanvasKit (Skia) | `window.CanvasKitInit` | C++ | 高性能 2D 渲染 |
| OpenCV.js | `window.cv` | C++ | 图像处理 |
| FFmpeg.wasm | `window.FFmpeg` / `window.createFFmpegCore` | C | 视频编解码 |
| Emscripten 通用 | `window.Module._malloc` | C/C++ | 通用 C/C++ 编译产物 |
| wasm-bindgen (Rust) | 脚本 URL 含 `wasm_bindgen` / `wasm-bindgen` | Rust | 通用 Rust 编译产物 |
| AssemblyScript | — | TypeScript-like | 通用 |
| Go WASM | `window.Go` | Go | 通用 Go 编译产物 |

---

## 源语言推断

| 特征 | 推断 |
|:---|:---|
| `wasm_bindgen` / `wasm-bindgen` 关键词 | Rust |
| `Module._malloc` / `Module.ccall` | C/C++ (Emscripten) |
| `window.Go` + `wasm_exec.js` | Go |
| `.wasm` 文件极小 (< 100KB) | 可能是 AssemblyScript |

---

## 关注点

- 加载方式：主线程加载 vs Worker 中加载
- 内存管理：SharedArrayBuffer 支持、Memory 初始/最大大小
- `crossOriginIsolated` 状态（COOP/COEP 头）
