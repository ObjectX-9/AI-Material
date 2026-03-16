# Plugins 插件索引

> 根据用户需求按需选取插件。读取插件目录下的 README.md、detect.js 和 knowledge.md 执行检测。

---

## 插件清单

| 插件目录 | 职责 | 报告章节 |
|:---|:---|:---|
| `view_layer/` | 渲染框架：React/Vue/Svelte/Angular/SSR | §3 |
| `build_layer/` | 构建工具：Webpack/Vite/esbuild/分包策略 | §3 |
| `network_layer/` | 网络与部署：CDN/HTTP头/API架构/WebSocket | §4 |
| `state_layer/` | 状态管理：Redux/Zustand/Pinia/MobX | §2 |
| `style_layer/` | 样式方案：Tailwind/CSS Modules/SC | §3 |
| `monitor_layer/` | 监控埋点：Sentry/GA/PostHog | §2 |
| `performance_layer/` | 性能评估：Lighthouse/CWV | §13 |
| `canvas_layer/` | 画布与 2D 渲染引擎 | §5 |
| `webgl_layer/` | 3D 渲染与 WebGL | §6 |
| `wasm_layer/` | WebAssembly 模块 | §7 |
| `worker_layer/` | Web Worker 并行计算 | §8 |
| `video_layer/` | 视频播放与编解码 | §9 |
| `audio_layer/` | 音频处理 | §10 |
| `text_editor_layer/` | 文本编辑器 | §11 |
| `graphics_editor_layer/` | 图形编辑能力 | §12 |

---

## 插件文件约定

每个插件目录包含：
- `README.md` — 激活条件、检测策略、输出字段
- `detect.js` — 可注入浏览器执行的纯函数检测脚本集合
- `knowledge.md` — 该技术层的指纹知识库（激活插件时一并读取）
