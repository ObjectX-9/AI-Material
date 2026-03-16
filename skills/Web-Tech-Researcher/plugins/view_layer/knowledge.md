# 前端框架与工具库指纹

> view_layer 插件知识库。涵盖前端框架、SSR 框架、工具库的识别签名。

---

## 1. 前端框架指纹

### React
| 信号 | 说明 |
|:---|:---|
| `window.__REACT_DEVTOOLS_GLOBAL_HOOK__` | React DevTools 钩子 |
| `window.React.version` | React 版本号 |
| `data-reactroot` 属性 | React 16 之前 |
| `_reactRootContainer` | React DOM 根容器 |

### Next.js
| 信号 | 说明 |
|:---|:---|
| `window.__NEXT_DATA__` | Next.js 数据注入 |
| `/_next/` 路径前缀 | 静态资源路径 |
| `<script id="__NEXT_DATA__">` | SSR 数据脚本 |

### Vue
| 信号 | 说明 |
|:---|:---|
| `window.__VUE__` | Vue 3 开发模式 |
| `window.Vue.version` | Vue 版本 |
| `data-v-` 属性前缀 | Vue Scoped CSS |

### Nuxt
| 信号 | 说明 |
|:---|:---|
| `window.__NUXT__` | Nuxt 数据注入 |
| `/_nuxt/` 路径前缀 | 静态资源路径 |

### 其他框架
| 框架 | 信号 |
|:---|:---|
| Angular | `window.angular` / `ng-version` 属性 |
| Svelte | `window.Svelte` / `__svelte` 属性 |
| Solid | `window.Solid` |
| Preact | `window.preact` |
| Qwik | `<script q:` 属性 |
| Astro | `<meta name="generator" content="Astro">` |

---

## 2. 工具库指纹

| 库 | 信号 |
|:---|:---|
| Lodash | `window._.VERSION` |
| jQuery | `window.$.fn.jquery` |
| GSAP | `window.gsap` |
| Anime.js | `window.anime` |
| Lottie | `window.Lottie` / `window.lottie` |
| Framer Motion | `window.framerMotion` |
