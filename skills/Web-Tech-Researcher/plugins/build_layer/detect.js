/**
 * Build Layer — 构建工具与 HTML 特征检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

const detectBuildTools = () => {
  const scripts = [...document.querySelectorAll('script[src]')].map(s => s.src);
  const generator = document.querySelector('meta[name="generator"]')?.content;

  // 构建工具推断
  const hasWebpack = scripts.some(s => /chunk-|webpackChunk/.test(s)) || !!window.webpackChunk;
  const hasVite = !!document.querySelector('script[type="module"][src*="/@"]');
  const hasParcel = !!window.parcelRequire;

  return {
    scripts: scripts.slice(0, 30),
    generator,
    hasWebpack,
    hasVite,
    hasParcel,
    hasESM: !!document.querySelector('script[type="module"]'),
  };
};

const extractScriptUrls = () => {
  return [...document.querySelectorAll('script[src]')]
    .map(s => s.src)
    .filter(s => s.endsWith('.js'))
    .slice(0, 20);
};
