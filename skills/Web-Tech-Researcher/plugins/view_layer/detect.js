/**
 * View Layer — 渲染框架检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

const detectFrameworks = () => {
  const r = {};

  // === 框架 ===
  if (window.__NEXT_DATA__) r.nextjs = { buildId: window.__NEXT_DATA__?.buildId };
  if (window.__NUXT__) r.nuxt = true;
  if (window.React) r.react = { version: window.React.version };
  else if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) r.react = { version: 'detected' };
  if (window.Vue) r.vue = { version: window.Vue.version };
  else if (window.__VUE__) r.vue = { version: 'detected' };
  if (window.angular) r.angular = true;
  if (window.Svelte) r.svelte = true;
  if (window.Solid) r.solid = true;

  // === 状态管理 ===
  if (window.__REDUX_DEVTOOLS_EXTENSION__) r.redux = true;
  if (window.__MOBX_DEVTOOLS_GLOBAL_HOOK__) r.mobx = true;
  if (window.__PINIA_STATE__) r.pinia = true;
  if (window.Zustand) r.zustand = true;

  // === 工具库 ===
  if (window._?.VERSION) r.lodash = { version: window._.VERSION };
  if (window.$?.fn?.jquery) r.jquery = { version: window.$.fn.jquery };
  if (window.gsap) r.gsap = true;
  if (window.anime) r.animejs = true;
  if (window.Lottie || window.lottie) r.lottie = true;

  // === 监控 ===
  if (window.Sentry || window.__SENTRY__) r.sentry = true;
  if (window.LogRocket) r.logrocket = true;
  if (window.dataLayer) r.gtm = true;
  if (window.ga || window.gtag) r.googleAnalytics = true;
  if (window.hj) r.hotjar = true;
  if (window.posthog) r.posthog = true;
  if (window.statsig) r.statsig = true;

  return r;
};
