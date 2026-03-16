# 音频技术指纹

> 激活条件：`hasAudio = true` 或检测到 Web Audio API 使用信号

---

## 音频库

| 库 | 全局变量 |
|:---|:---|
| Tone.js | `window.Tone` |
| Howler.js | `window.Howler` |
| WaveSurfer.js | `window.WaveSurfer` |
| Pizzicato.js | `window.Pizzicato` |
| SoundJS | `window.SoundJS` |

---

## Web Audio API

| API | 识别方式 |
|:---|:---|
| Web Audio API | `typeof AudioContext !== 'undefined'` |
| AudioWorklet | `typeof AudioWorkletNode !== 'undefined'` |
| OfflineAudioContext | `typeof OfflineAudioContext !== 'undefined'` |

---

## 关注点

- 波形可视化（WaveSurfer.js / Canvas 自绘）
- AudioWorklet 实时音频效果处理
- 编解码格式：WAV / MP3 / AAC / Opus / FLAC
- 多轨混音能力
- AI 音频（TTS / 配乐生成）
