/**
 * Worker Layer — Web Worker 与并行计算检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

const detectWorkers = () => {
  const r = {};

  // Service Worker
  r.serviceWorker = !!navigator.serviceWorker?.controller;
  r.serviceWorkerUrl = navigator.serviceWorker?.controller?.scriptURL;

  // Worker 脚本收集
  const entries = performance.getEntriesByType('resource');
  r.workerScripts = entries
    .filter(e => /worker/i.test(e.name))
    .map(e => ({
      name: e.name.split('/').pop(),
      fullUrl: e.name,
      size: Math.round(e.transferSize / 1024) + 'KB',
    }));

  // 并行能力
  r.sharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined';
  r.crossOriginIsolated = window.crossOriginIsolated;

  return r;
};
