# View Layer — 渲染框架探测

## 激活条件
- 需要了解网站渲染框架时选取

## 检测策略
1. 查全局变量：`window.React` / `window.__VUE__` / `window.__NEXT_DATA__` / `window.__NUXT__` 等
2. 查 DOM 特征：`data-reactroot` / `data-v-` / `ng-version` 等属性
3. 判定 SPA/MPA/SSR/SSG：对比原始 HTML 与渲染后 DOM

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| framework | string | 核心框架名称 |
| version | string? | 版本号 |
| metaFramework | string? | Next.js / Nuxt / Remix 等 |
| renderMode | string | SPA / SSR / SSG / CSR |

## 对应报告章节
→ `templates/report-template.md` §3 前端框架与构建
