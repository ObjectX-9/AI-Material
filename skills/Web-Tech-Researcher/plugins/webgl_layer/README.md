# WebGL Layer — 3D 渲染与 WebGL 探测

## 激活条件
- `hasWebGL = true`

## 检测策略
1. 查全局变量：`window.THREE` / `window.BABYLON` 等
2. 创建临时 Canvas 获取 WebGL 能力信息
3. 分析 GPU 渲染器和纹理限制

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| engine | string | 3D 引擎名称 |
| webglVersion | number | 1 或 2 |
| gpuRenderer | string | GPU 渲染器信息 |
| maxTextureSize | number | 最大纹理尺寸 |

## 对应报告章节
→ `templates/report-template.md` §6 3D 与 WebGL
