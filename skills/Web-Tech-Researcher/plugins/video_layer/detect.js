/**
 * Video Layer — 视频播放与编解码检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

// 播放器检测
const detectVideoPlayback = () => {
  const r = {};

  if (window.videojs) r.videojs = true;
  if (window.Hls) r.hlsjs = { version: window.Hls.version };
  if (window.dashjs) r.dashjs = true;
  if (window.flvjs || window.mpegts) r.mpegts = true;
  if (window.shaka) r.shaka = true;
  if (window.Plyr) r.plyr = true;
  if (window.JWPlayer) r.jwplayer = true;

  const videos = [...document.querySelectorAll('video')];
  r.videoElements = videos.map(v => ({
    src: (v.src || v.querySelector('source')?.src || 'blob/MSE').substring(0, 100),
    type: v.querySelector('source')?.type,
    isMSE: v.src?.startsWith('blob:'),
    resolution: `${v.videoWidth}x${v.videoHeight}`,
    duration: Math.round(v.duration || 0) + 's',
    crossOrigin: v.crossOrigin,
  }));

  r.mse = !!window.MediaSource;
  r.eme = !!navigator.requestMediaKeySystemAccess;

  return r;
};

// 编解码能力检测
const detectVideoCodecs = () => {
  const r = {};

  if (window.FFmpeg || window.createFFmpegCore) r.ffmpegWasm = true;
  if (window.MP4Box) r.mp4box = true;

  r.webCodecs = {
    videoDecoder: typeof VideoDecoder !== 'undefined',
    videoEncoder: typeof VideoEncoder !== 'undefined',
    audioDecoder: typeof AudioDecoder !== 'undefined',
    audioEncoder: typeof AudioEncoder !== 'undefined',
  };

  r.mediaRecorder = typeof MediaRecorder !== 'undefined';
  if (r.mediaRecorder) {
    r.supportedMimeTypes = [
      'video/webm;codecs=vp9', 'video/webm;codecs=h264',
      'video/webm', 'video/mp4',
    ].filter(t => {
      try { return MediaRecorder.isTypeSupported(t); } catch (e) { return false; }
    });
  }

  r.videoFrameAPI = typeof VideoFrame !== 'undefined';

  return r;
};
