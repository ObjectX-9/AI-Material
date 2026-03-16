# 3D / WebGL 引擎指纹

> 激活条件：`hasWebGL = true`

---

## 3D 渲染库

| 库 | 全局变量 | 版本获取 |
|:---|:---|:---|
| Three.js | `window.THREE` | `window.THREE.REVISION` |
| Babylon.js | `window.BABYLON` | `window.BABYLON.Engine?.Version` |
| PlayCanvas | `window.PlayCanvas` | — |
| Cesium | `window.Cesium` | — |
| A-Frame | `window.AFRAME` | `window.AFRAME.version` |
| Deck.gl | `window.deck` | — |

---

## WebGL 能力检测

| 特征 | 识别方式 |
|:---|:---|
| WebGL 版本 | `canvas.getContext('webgl2')` 存在 → WebGL2，否则 WebGL1 |
| GPU 信息 | `WEBGL_debug_renderer_info` 扩展 → `UNMASKED_RENDERER_WEBGL` |
| 最大纹理尺寸 | `gl.getParameter(gl.MAX_TEXTURE_SIZE)` |
| GPU 纹理压缩 | KTX2 / Basis Universal 格式资源 |

---

## 关注点

- 自定义 Shader（滤镜/特效/后处理）
- 3D Mockup 贴图渲染
- glTF / GLB 模型加载
- GPU 粒子系统
