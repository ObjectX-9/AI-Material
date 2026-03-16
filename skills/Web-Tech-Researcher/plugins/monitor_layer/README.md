# Monitor Layer — 监控与埋点探测

## 激活条件
- 需要了解监控埋点方案时选取

## 检测策略
1. 查全局变量：Sentry / dataLayer / ga / gtag / posthog 等
2. 从 view_layer 检测结果中提取监控相关发现

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| errorTracking | string | Sentry / LogRocket |
| analytics | string[] | GA / GTM / Hotjar / PostHog |

## 对应报告章节
→ `templates/report-template.md` §2 技术栈总览
