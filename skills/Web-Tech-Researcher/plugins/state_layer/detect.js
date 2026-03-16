/**
 * State Layer — 状态管理检测
 * 注意：部分状态管理检测已包含在 view_layer/detect.js 中
 * 本脚本用于补充更深度的状态管理探测
 */

const detectStateManagement = () => {
  const r = {};
  if (window.__REDUX_DEVTOOLS_EXTENSION__) r.redux = true;
  if (window.__MOBX_DEVTOOLS_GLOBAL_HOOK__) r.mobx = true;
  if (window.__PINIA_STATE__) r.pinia = true;
  if (window.Zustand) r.zustand = true;

  // 尝试检测 React Query / TanStack Query
  if (window.__REACT_QUERY_DEVTOOLS__) r.reactQuery = true;

  return r;
};
