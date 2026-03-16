/**
 * Network Layer — HTTP 响应头检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

const detectHeaders = async () => {
  try {
    const res = await fetch(location.href, { method: 'HEAD' });
    return Object.fromEntries(res.headers.entries());
  } catch (e) {
    return { error: e.message };
  }
};
