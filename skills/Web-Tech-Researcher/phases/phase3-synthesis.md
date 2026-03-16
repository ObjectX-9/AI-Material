# Phase 3：合成出报告 — Multi-Agent Debate

**目标**：交叉质证、组装报告。

## 交叉验证规则

对每个核心结论，从三个视角验证：

| 视角 | 数据来源 | 验证什么 |
|:---|:---|:---|
| Network | 抓包数据、资源 URL、API 请求 | 库/资源是否被实际加载？数据从哪来？ |
| DOM/Runtime | 全局变量、DOM 结构、JS 返回值 | 库是否运行时实例化？有无活跃实例？ |
| 数据流 | API 响应体、chunk 源码上下文 | 数据来源是客户端还是服务端？库属于哪个上层模块？ |

## 置信度判定

- 三个视角一致 → L3，直接写入报告
- 两个视角一致 → L2，标注缺失视角
- 仅 chunk 源码存在 → L1，标注"打包存在但未确认运行时使用"
- 视角矛盾 → 如实呈现矛盾，不强行下结论

## 报告中的置信度标注

```markdown
<!-- L3 — 直接陈述 -->
编辑器使用 **Konva.js 9.3.20** 渲染时间线和视频预览。

<!-- L1 — 必须标注上下文 -->
`wan-base` chunk 中打包了 **FFmpeg.wasm**，但在当前页面未被加载或实例化。
该库属于 videojs-record 的 ConvertEngine 模块，仅在特定场景下激活。
```

## 报告组装步骤

1. 读取 `findings.md` 作为数据源
2. 读取 `templates/report-template.md` 作为模板
3. 根据检测结果填写对应章节，未命中的标注"未检测到"或删除
4. 发现模板未覆盖的新领域，直接新增章节
5. **所有截图使用相对路径**：`![描述](./screenshots/{文件名})`
6. 输出到 `AIDocs/TechResearch/{网站名}-{日期}/report.md`
7. 更新 `findings.md` 状态为 ✅ 已完成

## 外化输出

```
【调研skill🚀====>】发现汇总：
- Konva.js 9.3.20 (L3)
- FFmpeg.wasm (L1, 属于 videojs-record)
⚠️ 待验证：帧缩略图数据来源

【调研skill🚀====>】交叉验证：FFmpeg.wasm — Network 无 .wasm 请求，Runtime 无全局对象 → 维持 L1
```
