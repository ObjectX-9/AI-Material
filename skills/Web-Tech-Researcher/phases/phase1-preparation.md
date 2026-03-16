# Phase 1：导航与准备

**目标**：导航到目标页面、记录首屏状态、读取插件知识、预读报告模板结构、创建输出目录和中间文档。

## 必须执行

1. **创建输出目录**：`AIDocs/TechResearch/{网站名}-{日期}/screenshots/`
2. 导航到目标 URL，等待加载完成
3. **截图记录首屏**（保存到 `screenshots/00-landing.png`）
4. 读取任务清单中各插件的 `README.md` 和 `knowledge.md`
5. **预读 `templates/report-template.md` 的章节结构**（仅了解需要收集哪些字段）
6. **创建 `findings.md`**：写入元信息 + 所有待检测插件的空白章节（状态 ⏳）
7. 输出页面概况，进入 Phase 2

## 输出目录结构

```
AIDocs/TechResearch/{网站名}-{日期}/
├── report.md              # 最终调研报告
├── findings.md            # 中间发现文档
└── screenshots/           # 截图目录
    ├── 00-landing.png
    └── ...                # 按 {序号}-{描述}.png 递增命名
```

## 截图保存规则

每次 `take_screenshot` 必须指定 `filePath`，报告中用相对路径引用：

```markdown
<!-- ✅ 正确 -->
![首屏截图](./screenshots/00-landing.png)
<!-- ❌ 错误 -->
![首屏截图](/AIDocs/TechResearch/xxx/screenshots/00-landing.png)
```

## findings.md 格式

```markdown
# 调研中间发现 — {网站名}

> 自动生成，Phase 2 过程中实时更新。最终报告见 [report.md](./report.md)。

## 元信息

| 项目 | 内容 |
|:---|:---|
| 目标 URL | {URL} |
| 开始时间 | {YYYY-MM-DD HH:mm} |
| 当前状态 | 🔄 进行中 |
| 已完成插件 | 0/{Total} |

---

## [{plugin_id}] {插件名}

**状态**：⏳ 待检测

（每个插件一个章节，Phase 2 检测后更新为 ✅/⚠️ 并填入结果和原始数据）
```

### findings.md 更新时机

| 时机 | 操作 |
|:---|:---|
| Phase 1 开始 | 创建 findings.md，写入元信息和所有待检测插件空白章节（⏳） |
| 每个插件检测完成 | 更新对应章节：填入结果、原始数据、截图路径，状态改为 ✅ |
| 插件检测失败 | 更新对应章节：填入失败原因和部分数据，状态改为 ⚠️ |
| Phase 2 全部完成 | 更新元信息「当前状态」为 ✅，更新「已完成插件」计数 |

> 允许 Re-plan：如果页面实际内容与预期不符，可回到 Phase 0 调整任务清单。
