/**
 * WebGL Layer — 3D 渲染与 WebGL 检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

const detect3D = () => {
  const r = {};

  // 3D 引擎检测
  if (window.THREE) r.three = { revision: window.THREE.REVISION };
  if (window.BABYLON) r.babylon = { version: window.BABYLON.Engine?.Version };
  if (window.Cesium) r.cesium = true;
  if (window.PlayCanvas) r.playcanvas = true;
  if (window.AFRAME) r.aframe = { version: window.AFRAME.version };

  // WebGL 能力检测
  const c = document.createElement('canvas');
  const gl = c.getContext('webgl2') || c.getContext('webgl');
  if (gl) {
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    r.webgl = {
      version: gl instanceof WebGL2RenderingContext ? 2 : 1,
      renderer: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : null,
      vendor: dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : null,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    };
  }

  return r;
};
