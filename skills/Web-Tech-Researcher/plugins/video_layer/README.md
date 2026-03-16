# Video Layer — 视频播放与编解码探测

## 激活条件
- `hasVideo = true` 或检测到 WebCodecs API 使用信号

## 检测策略
1. 查全局变量：videojs / Hls / dashjs / shaka 等播放器
2. 分析 video 元素：src 类型（Blob/MSE）、分辨率
3. 检测 WebCodecs / FFmpeg.wasm / MP4Box 等编解码能力
4. 检查 MediaRecorder / VideoFrame API 支持

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| player | string | 播放器库 |
| videoElements | object[] | video 元素详情 |
| codec | object | 编解码能力 |
| streaming | string | HLS / DASH / WebRTC |

## 对应报告章节
→ `templates/report-template.md` §9 视频播放与编辑
