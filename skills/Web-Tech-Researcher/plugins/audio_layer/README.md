# Audio Layer — 音频处理探测

## 激活条件
- `hasAudio = true` 或检测到 Web Audio API 使用信号

## 检测策略
1. 查全局变量：Tone / Howler / WaveSurfer 等
2. 检测 Web Audio API / AudioWorklet 支持
3. 统计 audio 元素数量

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| audioLib | string | 音频库名称 |
| webAudio | boolean | Web Audio API 支持 |
| audioWorklet | boolean | AudioWorklet 支持 |

## 对应报告章节
→ `templates/report-template.md` §10 音频处理
