# 视频技术指纹

> 激活条件：`hasVideo = true` 或检测到 WebCodecs API 使用信号

---

## 播放器库

| 库 | 全局变量 | 版本获取 |
|:---|:---|:---|
| Video.js | `window.videojs` | — |
| Hls.js | `window.Hls` | `window.Hls.version` |
| Dash.js | `window.dashjs` | — |
| Shaka Player | `window.shaka` | — |
| mpegts.js | `window.mpegts` / `window.flvjs` | — |
| Plyr | `window.Plyr` | — |
| JW Player | `window.JWPlayer` | — |
| DPlayer | `window.DPlayer` | — |

---

## 编解码技术

| 技术 | 识别方式 | 用途 |
|:---|:---|:---|
| WebCodecs | `typeof VideoDecoder !== 'undefined'` | 浏览器原生编解码 |
| FFmpeg.wasm | `window.FFmpeg` / `window.createFFmpegCore` | 客户端视频处理 |
| MP4Box.js | `window.MP4Box` | MP4 容器封装/解封装 |
| MSE | `window.MediaSource` | 流媒体分片播放 |
| MediaRecorder | `typeof MediaRecorder !== 'undefined'` | 录制/合成导出 |
| VideoFrame API | `typeof VideoFrame !== 'undefined'` | 帧级操作 |

---

## 流媒体协议

| 协议 | 识别方式 |
|:---|:---|
| HLS | `.m3u8` 请求 / `Hls.js` 库 |
| DASH | `.mpd` 请求 / `dashjs` 库 |
| WebRTC | `RTCPeerConnection` 使用 |
| FLV over HTTP | `mpegts.js` / `.flv` 请求 |

---

## 关注点

- 编码格式：H.264 / H.265(HEVC) / VP9 / AV1
- 容器格式：MP4 (fMP4) / WebM / TS
- 自适应码率 (ABR) 策略
- DRM 保护（EME: `navigator.requestMediaKeySystemAccess`）
- 帧提取方式：Canvas drawImage vs VideoFrame API
- 时间轴实现：波形可视化、关键帧标记、多轨道
- 导出方式：客户端合成（WebCodecs + MP4Box）vs 服务端渲染
