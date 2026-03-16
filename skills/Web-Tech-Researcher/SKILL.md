---
name: tech-researcher
description: 通用 Web 技术栈逆向探测引擎，自动分析任意网站的底层技术实现
---

# Tech Researcher — 通用技术栈探测引擎

## 技能概述

你是一个通用的 Web 技术栈逆向探测引擎。通过浏览器 DevTools 自动检测任意目标网站的底层技术实现，按技术层级逐层分析，输出标准化的技术调研报告。

**架构**：Pipeline + Plugin。本文件只做调度大脑，各 Phase 详细指令和检测逻辑在子文件中按需加载。

---

## MCP 依赖（前置条件）

本技能依赖 `chrome-devtools` MCP 服务器提供浏览器自动化能力。**在进入 Phase 0 之前，必须先检查并确保 MCP 已配置。**

### 自动检查流程

1. 读取 `.kiro/settings/mcp.json`（工作区级）
2. 检查是否存在 `chrome-devtools` 服务器配置
3. 如果不存在 → **自动写入配置**，然后提示用户等待 MCP 连接成功
4. 如果已存在 → 直接进入 Phase 0

### 需要写入的配置

当 `chrome-devtools` 不存在时，在 `.kiro/settings/mcp.json` 的 `mcpServers` 中追加以下配置（保留已有的其他 MCP 服务器）：

```json
"chrome-devtools": {
  "command": "npx",
  "args": ["-y", "chrome-devtools-mcp@latest", "--isolated"],
  "autoApprove": [
    "take_screenshot", "take_snapshot", "click", "press_key",
    "evaluate_script", "navigate_page", "wait_for", "new_page",
    "list_console_messages", "select_page", "list_pages",
    "list_network_requests", "lighthouse_audit",
    "get_network_request", "hover", "fill", "type_text"
  ]
}
```

### 配置后的提示

```
【调研skill🚀====>】检测到缺少 chrome-devtools MCP 配置，已自动添加到 .kiro/settings/mcp.json。
请等待 MCP 服务器连接成功（左侧面板 MCP Servers 显示绿色），然后告诉我"已连接"继续。
```

> 如果用户的 `.kiro/settings/mcp.json` 不存在，则创建完整文件。
> 如果文件已存在但没有 `chrome-devtools`，则只追加该服务器配置，不覆盖其他配置。

---

## 强制约束（最高优先级）

1. **Phase 0 必须等用户确认**：输出任务清单后，必须等用户明确回复后才能进入 Phase 1
2. **截图优先原则**：Phase 2 每次检测前必须先截图，基于截图判断是否需要交互操作
3. **输出目录为 `AIDocs/TechResearch/{网站名}-{日期}/`**
4. **截图必须保存到文件**：`take_screenshot` 必须指定 `filePath`，报告中用相对路径引用
5. **必须维护 findings.md**：Phase 2 实时更新，作为 Phase 3 报告数据源
6. **插件按需选取**：根据用户需求从 `plugins/INDEX.md` 中选取，不盲跑
7. **Source Map 还原须经用户确认**
8. **分析前先读取对应插件的 knowledge.md**
9. **所有结论必须附带证据**
10. **打包存在 ≠ 运行时使用**：按三级置信度（L1/L2/L3）标注
11. **功能实现必须溯源数据流**：确认客户端生成还是服务端提供
12. **先读 `plugins/INDEX.md` 再读具体插件文件**

---

## 核心引用

| 资源 | 路径 | 加载时机 |
|:---|:---|:---|
| 插件索引 | #[[file:plugins/INDEX.md]] | Phase 0 选取插件时 |
| 报告模板 | #[[file:templates/report-template.md]] | Phase 1 预读结构，Phase 3 填写 |
| Phase 0 指令 | #[[file:phases/phase0-planning.md]] | 进入 Phase 0 时读取 |
| Phase 1 指令 | #[[file:phases/phase1-preparation.md]] | 进入 Phase 1 时读取 |
| Phase 2 指令 | #[[file:phases/phase2-detection.md]] | 进入 Phase 2 时读取 |
| Phase 3 指令 | #[[file:phases/phase3-synthesis.md]] | 进入 Phase 3 时读取 |
| 证据格式规范 | #[[file:phases/evidence-format.md]] | Phase 2/3 写报告时读取 |

---

## 认知生命周期（4 Phase + 前置检查）

**进入任何 Phase 之前，必须先完成 MCP 依赖检查。**

| 步骤 | 目标 | 指令 |
|:---|:---|:---|
| Pre-check | 检查 chrome-devtools MCP 是否已配置，未配置则自动写入 | 见上方「MCP 依赖」章节 |
| Phase 0 | 需求确认 + 任务规划 + 等用户确认 | `phases/phase0-planning.md` |
| Phase 1 | 导航 + 创建输出目录 + 读取插件知识 + 创建 findings.md | `phases/phase1-preparation.md` |
| Phase 2 | 逐层检测（截图驱动 ReAct Loop） | `phases/phase2-detection.md` |
| Phase 3 | 交叉验证 + 组装报告 | `phases/phase3-synthesis.md` |

### 外化输出规则

所有中间推理必须输出到聊天中，让用户可见。每个 Phase 切换时必须输出转场摘要：

| Phase | 必须输出的内容 | 格式示例 |
|:---|:---|:---|
| Phase 0 | 需求澄清 + 任务清单（等用户确认） | `【调研skill🚀====>】任务清单：\n1. [view_layer] ...\n请确认是否开始？` |
| Phase 1 → 2 | 页面已加载 + 开始执行 | `【调研skill🚀====>】页面已加载，开始执行任务清单...` |
| Phase 2 中 | 每个插件的 Thought + Observe/Reason | `【调研skill🚀====>】[canvas_layer] Thought: ...\n发现 Konva 9.3.20 (L3)` |
| Phase 2 → 3 | 所有发现汇总 + 置信度 + 待验证项 | `【调研skill🚀====>】发现汇总：\n- Konva.js 9.3.20 (L3)\n⚠️ 待验证：...` |
| Phase 3 | 交叉验证推理 + 最终结论 | `【调研skill🚀====>】交叉验证：FFmpeg.wasm — Network 无 .wasm 请求 → 维持 L1` |

---

## 使用场景

| 场景 | 触发条件 | 执行策略 |
|:---|:---|:---|
| 全站自动调研 | 入口 URL + "调研/分析" | Phase 0 → 1 → 2 → 3 完整流程 |
| 指定页面调研 | 具体页面 URL | 跳过页面发现，直接完整流程 |
| 竞品对比 | 多个 URL + "对比" | 每个网站完整流程，最后生成对比表 |
| 特定模块调研 | 指定技术方向 | 只激活指定的技术层插件 |

---

## 场景→插件组推荐

| 用户意图关键词 | 推荐插件组 |
|:---|:---|
| "整站技术栈" / "全面调研" | 全部插件 |
| "视频编辑器" / "剪辑" | view, canvas, video, audio, worker, wasm, webgl |
| "图片编辑" / "设计工具" | view, canvas, webgl, wasm, graphics_editor |
| "文档编辑" / "富文本" | view, text_editor, state |
| "播放器" / "视频播放" | view, video, network |
| "性能" / "加载速度" | build, network, performance |
| "渲染框架" / "前端框架" | view, build, state, style |
| "AI 功能" / "智能" | wasm, worker, network |

> 映射表仅作推荐，agent 应根据页面实际内容增减。

---

## 工具速查

| 工具 | 用途 | Phase |
|:---|:---|:---|
| `take_screenshot` | 页面截图（必须指定 filePath） | 0, 1, 2, 3 |
| `take_snapshot` | DOM 快照（获取 uid 用于交互） | 0, 1, 2 |
| `navigate_page` | 页面导航 | 0, 1 |
| `click` / `hover` | 元素交互 | 1, 2 |
| `wait_for` | 等待页面加载 | 1, 2 |
| `list_pages` / `select_page` | Tab/iframe 管理 | 1, 2 |
| `evaluate_script` | 注入 JS 检测脚本 | 2 |
| `list_network_requests` | 网络请求列表 | 2 |
| `get_network_request` | 单个请求详情 | 2 |
| `lighthouse_audit` | Lighthouse 评分 | 2 |
| `performance_start_trace` | 性能录制 | 2 |
| `search_web` | 公开信息搜索 | 3 |
| `fsWrite` / `fsAppend` | 写入/追加文件 | 1, 2, 3 |
