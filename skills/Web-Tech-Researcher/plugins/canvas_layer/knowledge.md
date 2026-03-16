# 画布渲染引擎指纹

> 激活条件：`hasCanvas = true`

---

## Canvas 2D 渲染库

| 库 | 全局变量 | DOM 特征 | 版本获取 |
|:---|:---|:---|:---|
| Konva | `window.Konva` | `.konvajs-content` class | `window.Konva.version` |
| Fabric.js | `window.fabric` | `upper-canvas` / `lower-canvas` class | `window.fabric.version` |
| PixiJS | `window.PIXI` | canvas `data-pixijs` 属性 | `window.PIXI.VERSION` |
| Paper.js | `window.paper` | — | `window.paper.version` |
| CreateJS | `window.createjs` | — | — |
| D3.js | `window.d3` | 大量 SVG 元素 | `window.d3.version` |
| Rough.js | `window.Rough` | — | — |
| Two.js | `window.Two` | — | — |
| Snap.svg | `window.Snap` | — | — |

---

## Canvas 架构特征

| 特征 | 识别方式 | 含义 |
|:---|:---|:---|
| 多画布架构 | 页面存在 > 1 个 `<canvas>` | 主画布 + 缩略图/叠加层 |
| 高清适配 | `canvas.width / clientWidth` 比值 > 1 | DPR 高清渲染 |
| Context 类型 | `canvas.getContext('2d'/'webgl'/'webgl2')` | 渲染模式判定 |
| 分层策略 | 多个 canvas 叠加（z-index 不同） | 静态层/动态层/UI 层分离 |

---

## SVG 渲染特征

| 特征 | 识别方式 |
|:---|:---|
| 大量 SVG 元素 | `document.querySelectorAll('svg').length > 20` |
| SVG 编辑器 | SVG 内含 `<foreignObject>` / 交互事件绑定 |

---

## 源码级指纹检测（Webpack/Vite 模块化打包场景）

> **背景**：现代前端应用通过 Webpack/Vite/Rollup 打包后，渲染库通常被封装在模块作用域内，
> 不暴露全局变量（如 `window.PIXI = undefined`），也不添加 DOM 特征属性。
> 此时需要通过分析 JS chunk 源码中的库特征字符串来识别。

### 检测触发条件

当满足以下条件时，应启动源码级指纹检测：
1. 页面存在 `<canvas>` 元素（尤其是 WebGL/WebGL2 context）
2. 运行时全局变量检测未发现任何渲染库
3. DOM 特征检测也未命中

### 检测策略

1. 收集页面所有 `<script src>` 的 URL
2. 按优先级排序：含 `vendor`/`graph`/`lib`/`engine`/`render` 等关键词的 chunk 优先
3. 逐个 `fetch` chunk 源码，扫描指纹字符串
4. 按权重累加匹配分数，阈值 ≥ 4 判定为有效检测
5. 尝试从源码中提取版本号

### PixiJS 源码指纹

| 指纹字符串 | 权重 | 说明 | 版本范围 |
|:---|:---|:---|:---|
| `pixi.js/math` | 3 | 模块路径标识 | v7+ |
| `autoDetectRenderer` | 3 | 核心渲染器工厂 | v7+/v8+ |
| `__PIXI_APP_INIT__` | 3 | Application 初始化 hook | v7+ |
| `GlProgram` | 2 | WebGL 程序类 | v8+ |
| `GpuProgram` | 2 | WebGPU 程序类 | v8+ |
| `RenderPipe` | 2 | 渲染管线接口 | v8+ |
| `big-triangle` | 2 | 全屏三角形 Shader 优化 | v8+ |
| `BatchableSprite` | 2 | 批量精灵渲染 | v8+ |
| `pixi-gl-core` | 2 | WebGL 核心模块 | v5/v6 |
| `PIXI.VERSION` | 1 | 版本常量 | all |
| `DisplayObject` | 1 | 显示对象基类 | v5-v7 |

**版本提取模式**：
- `const i = "8.11.0"` — Webpack 压缩后的版本赋值
- `VERSION = "x.y.z"` — 直接赋值
- `"version": "x.y.z"` — JSON 格式

**版本范围判定**：
- 含 `GpuProgram` / `RenderPipe` / `BatchableSprite` → v8+
- 含 `autoDetectRenderer` 但无 v8 特征 → v7
- 含 `pixi-gl-core` → v5/v6

### Konva 源码指纹

| 指纹字符串 | 权重 | 说明 |
|:---|:---|:---|
| `Konva.Stage` | 3 | 舞台类 |
| `konvajs-content` | 3 | DOM 容器 class 名 |
| `Konva.Layer` | 2 | 图层类 |
| `Konva.Transformer` | 2 | 变换控件 |
| `Konva.Node` | 1 | 节点基类 |

### Fabric.js 源码指纹

| 指纹字符串 | 权重 | 说明 |
|:---|:---|:---|
| `fabric.Canvas` | 3 | 画布类 |
| `fabric.Object` | 2 | 对象基类 |
| `fabric.version` | 2 | 版本属性 |
| `fabric.StaticCanvas` | 2 | 静态画布 |
| `upper-canvas` | 1 | DOM class |
| `lower-canvas` | 1 | DOM class |

### Paper.js 源码指纹

| 指纹字符串 | 权重 | 说明 |
|:---|:---|:---|
| `paper.setup` | 3 | 初始化方法 |
| `paper.Path` | 2 | 路径类 |
| `paper.view` | 2 | 视图对象 |
| `PaperScope` | 2 | 作用域类 |

### Lottie 源码指纹

| 指纹字符串 | 权重 | 说明 |
|:---|:---|:---|
| `lottie.loadAnimation` | 3 | 加载动画 API |
| `bodymovin` | 2 | Lottie 原名 |
| `LottiePlayer` | 2 | 播放器组件 |
| `animationData` | 1 | 动画数据格式 |

---

## WebGL Shader 指纹

> 即使源码不可访问，WebGL Shader 程序名也可作为渲染库的间接指纹。

| Shader 特征 | 关联库 | 说明 |
|:---|:---|:---|
| `big-triangle` / `big-triangle-vertex` | PixiJS v8 | 全屏三角形优化，用于后处理 |
| `pixi-batch` / `batch-shader` | PixiJS | 批量渲染 Shader |
| `@pixi` 注释 | PixiJS | Shader 源码注释 |

---

## 检测优先级与回退策略

```
Step 1: 全局变量检测（最快，最可靠）
  ↓ 未命中
Step 2: DOM 特征检测（data-* 属性、特征 class）
  ↓ 未命中
Step 3: WebGL Shader 指纹检测（运行时，无需源码）
  ↓ 未命中
Step 4: JS Chunk 源码指纹检测（fetch + 字符串匹配）
  ↓ 未命中
Step 5: 标记"未检测到渲染库"，但记录 Canvas/WebGL 存在
```

> **注意**：Step 4 的结果置信度为 L1（打包存在），需要结合运行时验证升级到 L2/L3。
> 例如：源码中发现 PixiJS 指纹 → 检查 Canvas 是否使用 WebGL2 context → 检查是否有活跃渲染循环。
