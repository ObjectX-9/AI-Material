# Style Layer — CSS 方案探测

## 激活条件
- 需要了解 CSS 方案时选取

## 检测策略
1. 采样前 200 个 DOM 元素的 class 名称
2. 正则匹配 class 命名模式判定 CSS 方案

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| cssPattern | string | tailwind / styled-components / emotion / css-modules / vanilla-css |
| sampleClasses | string[] | 采样的 class 名称（用于证据） |

## 对应报告章节
→ `templates/report-template.md` §3.2 CSS 方案
