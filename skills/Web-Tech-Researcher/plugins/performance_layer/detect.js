/**
 * Performance Layer — 性能指标采集
 * 注意：Lighthouse 评分通过 mcp_chrome-devtools_lighthouse_audit 工具执行，不通过脚本注入
 * 本脚本用于采集运行时性能指标
 */

const detectPerformanceMetrics = () => {
  const r = {};

  // Navigation Timing
  const nav = performance.getEntriesByType('navigation')[0];
  if (nav) {
    r.navigationTiming = {
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
      loadComplete: Math.round(nav.loadEventEnd - nav.startTime),
      ttfb: Math.round(nav.responseStart - nav.requestStart),
      domInteractive: Math.round(nav.domInteractive - nav.startTime),
    };
  }

  // 资源统计
  const resources = performance.getEntriesByType('resource');
  r.resourceStats = {
    total: resources.length,
    totalSize: Math.round(resources.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024) + 'KB',
    byType: {},
  };

  resources.forEach(res => {
    const ext = res.name.split('?')[0].split('.').pop()?.toLowerCase() || 'other';
    if (!r.resourceStats.byType[ext]) r.resourceStats.byType[ext] = 0;
    r.resourceStats.byType[ext]++;
  });

  return r;
};
