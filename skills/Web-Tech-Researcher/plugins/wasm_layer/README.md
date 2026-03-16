# WASM Layer — WebAssembly 模块探测

## 激活条件
- Network 中发现 `.wasm` 文件

## 检测策略
1. 查全局变量：PathKit / CanvasKit / OpenCV / FFmpeg 等
2. 检查脚本 URL 中的 wasm-bindgen 特征（Rust）
3. 检查 SharedArrayBuffer / crossOriginIsolated 支持

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| modules | object[] | 检测到的 WASM 模块列表 |
| sourceLang | string | 推断的源语言 |
| sharedArrayBuffer | boolean | SAB 支持 |

## 对应报告章节
→ `templates/report-template.md` §7 WebAssembly 模块
