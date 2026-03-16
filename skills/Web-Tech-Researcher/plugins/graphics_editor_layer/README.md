# Graphics Editor Layer — 图形编辑能力探测

## 激活条件
- `hasCanvas = true` 且页面有编辑器 UI 特征（工具栏/图层面板/属性面板）

## 检测策略
1. 通过 DOM snapshot 分析编辑器 UI 结构
2. 检测工具栏、图层面板、属性面板、时间轴等特征元素
3. 结合 canvas_layer 的渲染引擎结果综合判断

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| hasToolbar | boolean | 工具栏 |
| hasLayerPanel | boolean | 图层面板 |
| hasPropertyPanel | boolean | 属性面板 |
| hasTimeline | boolean | 时间轴 |

## 对应报告章节
→ `templates/report-template.md` §12 图形编辑能力
