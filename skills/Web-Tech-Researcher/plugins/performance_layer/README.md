# Performance Layer — 性能评估

## 激活条件
- 需要评估页面性能时选取

## 检测策略
1. 使用 `mcp_chrome-devtools_lighthouse_audit` 执行 Lighthouse 评分
2. 收集 Core Web Vitals（LCP / INP / CLS）
3. 可选：使用 `performance_start_trace` 录制性能 Trace

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| lighthouseScores | object | Performance / Accessibility / Best Practices / SEO |
| coreWebVitals | object | LCP / INP / CLS |

## 对应报告章节
→ `templates/report-template.md` §13 性能评估
