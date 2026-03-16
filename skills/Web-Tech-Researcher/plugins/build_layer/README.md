# Build Layer — 构建工具与分包策略探测

## 激活条件
- 需要了解构建工具与分包策略时选取

## 检测策略
1. 分析 `<script src>` URL 模式：chunk 命名、路径前缀
2. 查全局变量：`webpackChunkxxx` / `parcelRequire`
3. 检查 `<script type="module">` 判定 ESM / Vite
4. 分析 Network 中 JS 资源的分包结构和大小

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| bundler | string | Webpack / Vite / esbuild / Rollup / Parcel |
| chunks | object[] | 分包信息（名称/大小/内容） |
| sourceMapExposed | boolean | 是否暴露 .map 文件 |

## 对应报告章节
→ `templates/report-template.md` §3.3 构建工具与分包
