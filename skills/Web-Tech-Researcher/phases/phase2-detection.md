# Phase 2：逐层检测 — 截图驱动的 ReAct Loop

**目标**：按任务清单逐层执行插件检测，每次检测前必须截图判断页面状态。

## 执行循环

```
对每个激活的插件：
  0. Screenshot — 截图当前页面，分析页面状态
  1. Thought   — 基于截图判断：目标功能是否可见？是否需要交互？
  2. Interact  — 如需交互：click/hover/scroll，再次截图确认
  3. Act       — 执行检测脚本（evaluate_script）
  4. Observe   — 检查返回值 + 截图变化 + Network 请求变化
  5. Reason    — 判断置信度，决定是否需要更多探测
  6. Record    — 更新 findings.md
```

## 截图分析检查清单

| 检查项 | 后续动作 |
|:---|:---|
| 目标功能入口不可见 | 点击导航/展开面板 |
| 有遮挡弹窗 | 先关闭弹窗 |
| 功能未激活 | 点击激活 |
| 目标在视口外 | 滚动 |
| 有懒加载 loading | 等待加载完成 |

## 交互决策矩阵

| 页面状态 | 交互 | 示例 |
|:---|:---|:---|
| 按钮可见未点击 | `click` | 点击"超清"按钮 |
| 面板收起 | `click` 展开 | 展开工具栏 |
| 需要 tooltip | `hover` | 悬停查看说明 |
| 内容在视口外 | `scroll` | 滚动到编辑器 |
| 弹窗遮挡 | `click` 关闭 | 关闭引导弹窗 |
| Tab 未切换 | `click` 切换 | 切换到"编辑"Tab |

## 失败分类决策表

| 失败现象 | 根因 | 修复策略 | 最大重试 |
|:---|:---|:---|:---|
| 返回 null 但 Network 有请求 | 时序问题 | 延迟 2s 重试 / `wait_for` | 2 |
| 全局变量不存在但 DOM 有特征 | 混淆/私有化 | 改用 DOM 特征检测 | 2 |
| 全局/DOM 均无但 Canvas 存在 | 模块化打包 | 源码指纹检测（fetch chunk 扫描特征字符串） | 1 |
| `SecurityError` / cross-origin | iframe 隔离 | `select_page` 切换 / 从 Network 分析 | 1 |
| `X is not defined` | API 变更 | 通过 chunk 确认版本，调整脚本 | 2 |
| 返回空对象 `{}` | 条件未触发 | 截图→找触发按钮→交互→重检 | 1 |
| 无任何信号 | 确认不存在 | 标记"未检测到"，下一个插件 | 0 |

> 每个插件总重试上限 3 次。达到上限后写入已收集信息，标注置信度，继续下一个。

## 截图驱动的互动式探测

对难以在静止状态验证的深度能力（导出、懒加载 WASM 等），必须通过截图分析确定交互路径：

1. 截图 → 识别触发入口
2. 规划 → 确定交互序列
3. 执行 → 逐步交互，每步后截图确认
4. 捕获 → 检测脚本 + Network 抓包 + 截图对比

交互后必须执行：
- `take_screenshot` 确认交互生效
- `list_network_requests` 检查新资源加载
- `evaluate_script` 重新检测

## 三级置信度模型

| 等级 | 含义 | 判定条件 |
|:---|:---|:---|
| **L1** — 打包存在 | 库代码在某个 chunk 中 | chunk 源码匹配到库名/特征字符串 |
| **L2** — 运行时实例化 | 库被加载并创建实例 | 全局对象/DOM 特征节点/performance entries |
| **L3** — 当前页面活跃使用 | 核心功能中被实际调用 | 活跃实例/网络请求/用户可见 UI 产出 |

### 升级验证流程

```
发现 chunk 中存在库 X（L1）
  → 检查 window.X 或相关全局对象
  → 检查 DOM 特征节点
  → 检查 performance.getEntriesByType('resource')
  → 均无 → 维持 L1，追问：属于哪个上层模块？什么场景激活？
  → 有 → 升级 L2，继续检查活跃实例
  → 有活跃实例 → 升级 L3
```

### 典型陷阱

| 陷阱 | 错误结论 | 正确做法 |
|:---|:---|:---|
| FFmpeg.wasm 在 chunk 中 | "使用 FFmpeg.wasm 转码" | 查 .wasm 请求、全局对象；追溯属于哪个上层模块 |
| Fabric.js 全局存在 | "使用 Fabric.js 渲染" | 检查是否有活跃 canvas 实例 |
| chunk 有 timeline/track 字符串 | "包含时间线逻辑" | 区分业务 timeline vs HLS segment / CSS animation |

## 归属分析（库的上下文溯源）

发现一个库时，必须回答：

1. **属于谁？** — 业务直接依赖，还是某个上层库的内部依赖？
2. **什么场景激活？** — 页面加载时？用户触发特定操作时？从未激活？
3. **当前页面是否触发了该场景？** — 没有则标注 L1 并说明触发条件

**归属分析方法**：在 chunk 源码中搜索库名上下文 → switch/case 或 plugin 注册表 = 可选插件 → import 顶层 = 直接依赖 → 条件分支 = 按需加载

## 数据流溯源

对每个用户可见的功能，必须追溯数据来源：

| 功能 | 必须确认 | 验证方法 |
|:---|:---|:---|
| 帧缩略图 | 客户端抽帧 or 服务端预生成？ | Network 缩略图 URL / API 响应 sprite 字段 |
| 视频预览 | video DOM or Canvas 合成 or WebCodecs？ | DOM 检查 / Canvas source |
| 波形显示 | Web Audio 解码 or 服务端预计算？ | AudioContext 实例 / API 波形数据 |
| 视频导出 | 客户端合成 or 服务端渲染？ | 导出时网络请求 / .wasm 加载 / 任务轮询 |
| AI 能力 | 客户端推理 or 服务端 API？ | .onnx/.wasm 请求 / AI API 调用 |

**溯源方法**：UI 出发 → 查 Network → 查 API 响应 → 查运行时实例 → 结论标注来源

## 外化输出格式

Phase 2 的推理过程必须可见：

```
【调研skill====>】[{plugin}] 截图分析：{描述}
【调研skill====>】[{plugin}] Thought: {推理}
【调研skill====>】[{plugin}] Act: {操作}
【调研skill====>】[{plugin}] Observe: {观察}
【调研skill====>】[{plugin}] Reason: {判断}
【调研skill====>】[{plugin}] 结论: {技术发现 + 置信度}
```

数据流溯源时：

```
【调研skill🚀====>】帧缩略图溯源：
  → UI 上看到了帧缩略图条
  → 检查 Network：发现 keyFrameSprite webp 从 CDN 加载
  → 结论：服务端预生成，非客户端抽帧
```
