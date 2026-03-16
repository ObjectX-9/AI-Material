/**
 * Graphics Editor Layer — 图形编辑能力检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

const detectEditorUI = () => {
  const r = {};
  const text = document.body.innerText || '';

  r.hasToolbar = !!(
    document.querySelector('[class*="toolbar"]') ||
    document.querySelector('[role="toolbar"]')
  );
  r.hasLayerPanel = /layer|图层/i.test(text);
  r.hasPropertyPanel = /propert|属性|opacity|透明/i.test(text);
  r.hasTimeline = /timeline|时间轴/i.test(text);
  r.hasRuler = !!document.querySelector('[class*="ruler"]');
  r.hasColorPicker = !!(
    document.querySelector('input[type="color"]') ||
    document.querySelector('[class*="color-picker"]') ||
    document.querySelector('[class*="colorpicker"]')
  );
  r.hasZoom = /zoom|缩放/i.test(text);

  return r;
};
