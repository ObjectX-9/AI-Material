# 图形编辑器 UI 特征指纹

> 激活条件：`hasCanvas = true` 且页面有编辑器 UI 特征

---

## UI 结构特征

| 特征 | 识别方式 |
|:---|:---|
| 工具栏 | `[class*="toolbar"]` / `[role="toolbar"]` |
| 图层面板 | 页面文本含 `layer` / `图层` |
| 属性面板 | 页面文本含 `property` / `属性` / `opacity` / `透明` |
| 时间轴 | 页面文本含 `timeline` / `时间轴` |
| 标尺 | `[class*="ruler"]` |
| 颜色选择器 | `input[type="color"]` / `[class*="color-picker"]` |
| 缩放控件 | 页面文本含 `zoom` / `缩放` |

---

## 图形编辑能力矩阵

| 能力 | 关注点 |
|:---|:---|
| 选择与变换 | 选框/套索、Transform Handle 实现 |
| 路径编辑 | 贝塞尔曲线、路径布尔运算（PathKit / Paper.js） |
| 图层系统 | 图层面板、混合模式、分组/蒙版 |
| 历史记录 | Undo/Redo（Command Pattern / Immutable Snapshots） |
| 对齐与标尺 | 智能参考线、吸附对齐、网格 |
| 滤镜与特效 | CSS Filters / WebGL Shader / Canvas 像素操作 |
| 导出格式 | PNG / SVG / PDF / PSD |
| 协同编辑 | 多人实时编辑（CRDT + WebSocket） |
| 插件架构 | 是否支持插件扩展 |
