# Web Worker / 并行计算指纹

> 激活条件：Network 中发现包含 `worker` 关键词的脚本

---

## Worker 类型

| 类型 | 识别方式 |
|:---|:---|
| Service Worker | `navigator.serviceWorker?.controller` 存在 |
| Web Worker | Performance API 中 `resource` 条目含 `worker` 关键词 |
| Shared Worker | `SharedWorker` 构造函数使用 |

---

## 并行计算能力

| 特征 | 识别方式 |
|:---|:---|
| SharedArrayBuffer | `typeof SharedArrayBuffer !== 'undefined'` |
| Cross-Origin Isolated | `window.crossOriginIsolated === true` |
| Atomics | `typeof Atomics !== 'undefined'` |

---

## Worker 通信库

| 库 | 识别方式 |
|:---|:---|
| Comlink | 脚本中含 `comlink` / `Comlink.wrap` |
| workerpool | 脚本中含 `workerpool` |

---

## 关注点

- Worker 用途：图像处理 / 视频编码 / WASM 运算 / 数据计算
- 通信方式：postMessage / SharedArrayBuffer / Transferable Objects
- Service Worker 用途：离线缓存 / 推送通知 / 请求拦截
- COOP/COEP 头配置（SharedArrayBuffer 的前提条件）
