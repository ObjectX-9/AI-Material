/**
 * Audio Layer — 音频处理检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

const detectAudio = () => {
  const r = {};

  // 音频库
  if (window.Tone) r.tonejs = true;
  if (window.Howler) r.howler = true;
  if (window.WaveSurfer) r.wavesurfer = true;
  if (window.Pizzicato) r.pizzicato = true;
  if (window.SoundJS) r.soundjs = true;

  // Web Audio API
  r.webAudio = typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined';
  r.audioWorklet = typeof AudioWorkletNode !== 'undefined';
  r.offlineAudioContext = typeof OfflineAudioContext !== 'undefined';

  // 音频元素
  r.audioElements = document.querySelectorAll('audio').length;

  return r;
};
