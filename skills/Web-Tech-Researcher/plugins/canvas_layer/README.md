# Canvas Layer — 画布与 2D 渲染引擎探测

## 激活条件
- `hasCanvas = true`

## 检测策略
1. 查全局变量：`window.Konva` / `window.fabric` / `window.PIXI` 等
2. 查 DOM 特征：`.konvajs-content` / `data-pixijs` / `upper-canvas` 等
3. 分析 Canvas 元素：数量、尺寸、DPR、Context 类型
4. 判断多画布架构和分层策略
5. **WebGL Shader 指纹检测**：通过 `WEBGL_debug_shaders` 扩展检查 Shader 程序名（如 `big-triangle` = PixiJS v8）
6. **JS Chunk 源码指纹检测（回退策略）**：当步骤 1-2 未命中任何渲染库，但页面存在 Canvas/WebGL 元素时，自动触发源码分析：
   - 收集页面 `<script src>` URL，按 `vendor`/`graph`/`engine` 等关键词优先排序
   - `fetch` chunk 源码，扫描库特征字符串（如 `pixi.js/math`、`autoDetectRenderer`、`Konva.Stage` 等）
   - 按权重累加匹配分数，提取版本号
   - 结果标注为 L1（打包存在），需结合运行时验证升级置信度

## 检测脚本

| 函数 | 类型 | 用途 |
|:---|:---|:---|
| `detectCanvas2D` | 同步 | 全局变量 + DOM 特征 + Canvas 元素分析 |
| `detectWebGLShaderFingerprints` | 同步 | WebGL Shader 指纹 + GPU 信息 |
| `detectCanvasBySourceAnalysis` | **异步** | JS Chunk 源码指纹扫描（回退策略） |

> ⚠️ `detectCanvasBySourceAnalysis` 是异步函数，注入时需使用 `async () => { ... }` 包装。

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| engine | string | 渲染引擎名称 |
| version | string? | 版本号 |
| canvasCount | number | Canvas 元素数量 |
| canvasDetails | object[] | 每个 Canvas 的详细信息 |
| shaderPrograms | string[]? | WebGL Shader 程序名 |
| sourceAnalysis | object? | 源码指纹检测结果（libraries/chunks/confidence） |

## 对应报告章节
→ `templates/report-template.md` §5 画布与渲染引擎
