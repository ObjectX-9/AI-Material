# 构建工具指纹

> build_layer 插件知识库。涵盖主流构建工具的识别签名。

---

| 工具 | 识别方式 |
|:---|:---|
| Webpack | chunk 文件名 `chunk-xxx.js`、`webpackChunkxxx` 全局变量 |
| Vite | `<script type="module">` + ESM import 语法 |
| Turbopack | `/_next/` + 特殊 chunk 格式 |
| esbuild | 极小的 bundle、无 sourcemap 注释 |
| Rollup | `const xxx = (function() { ... })();` 风格 |
| Parcel | `parcelRequire` 全局变量 |
