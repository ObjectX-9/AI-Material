/**
 * Monitor Layer — 监控与埋点检测
 * 注意：部分监控检测已包含在 view_layer/detect.js 中
 * 本脚本用于补充更深度的监控探测
 */

const detectMonitoring = () => {
  const r = {};

  // 错误追踪
  if (window.Sentry || window.__SENTRY__) r.sentry = true;
  if (window.LogRocket) r.logrocket = true;
  if (window.Bugsnag) r.bugsnag = true;
  if (window.Datadog) r.datadog = true;

  // 分析工具
  if (window.dataLayer) r.gtm = true;
  if (window.ga || window.gtag) r.googleAnalytics = true;
  if (window.hj) r.hotjar = true;
  if (window.posthog) r.posthog = true;
  if (window.statsig) r.statsig = true;
  if (window.mixpanel) r.mixpanel = true;
  if (window.amplitude) r.amplitude = true;

  return r;
};
