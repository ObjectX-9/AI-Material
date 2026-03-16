/**
 * Canvas Layer — 画布与 2D 渲染引擎检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

// ============================================================
// 1. 运行时检测（全局变量 + DOM 特征）
// ============================================================
const detectCanvas2D = () => {
  const r = {};

  // 渲染库检测 — 全局变量
  if (window.Konva) r.konva = { version: window.Konva.version };
  if (window.fabric) r.fabric = { version: window.fabric.version };
  if (window.PIXI) r.pixi = { version: window.PIXI.VERSION };
  if (window.createjs) r.createjs = true;
  if (window.paper) r.paperjs = { version: window.paper.version };
  if (window.Snap) r.snapsvg = true;
  if (window.d3) r.d3 = { version: window.d3.version };
  if (window.Two) r.twojs = true;
  if (window.Rough) r.roughjs = true;

  // Canvas 元素详细分析
  const canvases = [...document.querySelectorAll('canvas')];
  r.canvasDetails = canvases.map((c, i) => ({
    index: i,
    id: c.id,
    className: c.className,
    size: `${c.width}x${c.height}`,
    cssSize: `${c.clientWidth}x${c.clientHeight}`,
    dpr: Math.round((c.width / (c.clientWidth || 1)) * 100) / 100,
    contextType: (() => {
      try {
        if (c.getContext('webgl2')) return 'webgl2';
        if (c.getContext('webgl')) return 'webgl';
        return '2d';
      } catch (e) { return 'unknown'; }
    })(),
    // DOM 特征检测 — 弥补全局变量缺失
    dataPixijs: c.hasAttribute('data-pixijs'),
    konvaContent: !!c.closest('.konvajs-content'),
    fabricClass: c.classList.contains('upper-canvas') || c.classList.contains('lower-canvas'),
  }));
  r.canvasCount = canvases.length;

  return r;
};

// ============================================================
// 2. WebGL Shader 指纹检测（运行时，无需源码）
// ============================================================
const detectWebGLShaderFingerprints = () => {
  const r = { shaderPrograms: [], engineHints: [] };
  try {
    const canvases = [...document.querySelectorAll('canvas')];
    for (const c of canvases) {
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      if (!gl) continue;
      // 获取 GPU 渲染器信息
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      if (ext) {
        r.renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
        r.vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL);
      }
    }
  } catch (e) {
    r.error = e.message;
  }
  return r;
};

// ============================================================
// 3. 源码指纹检测（Chunk 源码分析 — 异步）
//    当运行时检测未发现渲染库，但页面存在 Canvas/WebGL 时触发
//    需要通过 evaluate_script 注入，返回 Promise
// ============================================================
const detectCanvasBySourceAnalysis = async () => {
  const r = { libraries: [], chunks: [], method: 'source-analysis' };

  // --- 指纹库定义 ---
  // 每个条目: { name, fingerprints: [{ pattern, weight, description }], versionPattern }
  const FINGERPRINTS = [
    {
      name: 'PixiJS',
      fingerprints: [
        { pattern: 'pixi.js/math',         weight: 3, desc: 'PixiJS 模块路径' },
        { pattern: 'autoDetectRenderer',    weight: 3, desc: 'PixiJS 核心 API' },
        { pattern: '__PIXI_APP_INIT__',     weight: 3, desc: 'PixiJS Application hook' },
        { pattern: 'GlProgram',             weight: 2, desc: 'PixiJS v8 WebGL 程序类' },
        { pattern: 'GpuProgram',            weight: 2, desc: 'PixiJS v8 WebGPU 程序类' },
        { pattern: 'RenderPipe',            weight: 2, desc: 'PixiJS v8 渲染管线' },
        { pattern: 'big-triangle',          weight: 2, desc: 'PixiJS 全屏三角形 Shader' },
        { pattern: 'BatchableSprite',       weight: 2, desc: 'PixiJS v8 批量精灵' },
        { pattern: 'pixi-gl-core',          weight: 2, desc: 'PixiJS WebGL 核心' },
        { pattern: 'PIXI.VERSION',          weight: 1, desc: 'PixiJS 版本常量' },
        { pattern: 'DisplayObject',         weight: 1, desc: 'PixiJS 显示对象基类' },
      ],
      // 匹配 "8.11.0" 或 VERSION="x.y.z" 等模式
      versionPatterns: [
        /const\s+\w+\s*=\s*"(\d+\.\d+\.\d+)"/,
        /VERSION\s*=\s*"(\d+\.\d+\.\d+)"/,
        /"version"\s*:\s*"(\d+\.\d+\.\d+)"/,
      ],
      majorVersionHints: {
        'GpuProgram':        'v8+',
        'RenderPipe':        'v8+',
        'BatchableSprite':   'v8+',
        'autoDetectRenderer': 'v7+/v8+',
        'pixi-gl-core':      'v5/v6',
      },
    },
    {
      name: 'Konva',
      fingerprints: [
        { pattern: 'Konva.Stage',           weight: 3, desc: 'Konva 舞台类' },
        { pattern: 'konvajs-content',       weight: 3, desc: 'Konva DOM 容器 class' },
        { pattern: 'Konva.Layer',           weight: 2, desc: 'Konva 图层类' },
        { pattern: 'Konva.Transformer',     weight: 2, desc: 'Konva 变换控件' },
        { pattern: 'Konva.Node',            weight: 1, desc: 'Konva 节点基类' },
      ],
      versionPatterns: [
        /Konva\.version\s*=\s*["'](\d+\.\d+\.\d+)["']/,
      ],
    },
    {
      name: 'Fabric.js',
      fingerprints: [
        { pattern: 'fabric.Canvas',         weight: 3, desc: 'Fabric 画布类' },
        { pattern: 'fabric.Object',         weight: 2, desc: 'Fabric 对象基类' },
        { pattern: 'fabric.version',        weight: 2, desc: 'Fabric 版本属性' },
        { pattern: 'fabric.StaticCanvas',   weight: 2, desc: 'Fabric 静态画布' },
        { pattern: 'upper-canvas',          weight: 1, desc: 'Fabric DOM class' },
        { pattern: 'lower-canvas',          weight: 1, desc: 'Fabric DOM class' },
      ],
      versionPatterns: [
        /fabric\.version\s*=\s*["'](\d+\.\d+\.\d+)["']/,
      ],
    },
  ];

  // 追加更多库指纹
  FINGERPRINTS.push(
    {
      name: 'Paper.js',
      fingerprints: [
        { pattern: 'paper.setup',           weight: 3, desc: 'Paper.js 初始化' },
        { pattern: 'paper.Path',            weight: 2, desc: 'Paper.js 路径类' },
        { pattern: 'paper.view',            weight: 2, desc: 'Paper.js 视图' },
        { pattern: 'PaperScope',            weight: 2, desc: 'Paper.js 作用域' },
      ],
      versionPatterns: [
        /paper\.version\s*=\s*["'](\d+\.\d+\.\d+)["']/,
      ],
    },
    {
      name: 'CreateJS',
      fingerprints: [
        { pattern: 'createjs.Stage',        weight: 3, desc: 'CreateJS 舞台' },
        { pattern: 'createjs.Ticker',       weight: 2, desc: 'CreateJS 帧循环' },
        { pattern: 'EaselJS',               weight: 2, desc: 'CreateJS 渲染模块' },
      ],
      versionPatterns: [],
    },
    {
      name: 'Two.js',
      fingerprints: [
        { pattern: 'Two.Resolution',        weight: 3, desc: 'Two.js 分辨率' },
        { pattern: 'Two.Anchor',            weight: 2, desc: 'Two.js 锚点' },
        { pattern: 'new Two(',              weight: 2, desc: 'Two.js 构造' },
      ],
      versionPatterns: [],
    },
    {
      name: 'Rough.js',
      fingerprints: [
        { pattern: 'roughCanvas',           weight: 3, desc: 'Rough.js 画布' },
        { pattern: 'rough.canvas',          weight: 2, desc: 'Rough.js API' },
        { pattern: 'RoughCanvas',           weight: 2, desc: 'Rough.js 类名' },
      ],
      versionPatterns: [],
    },
    {
      name: 'Lottie',
      fingerprints: [
        { pattern: 'lottie.loadAnimation',  weight: 3, desc: 'Lottie 加载动画' },
        { pattern: 'bodymovin',             weight: 2, desc: 'Lottie 原名' },
        { pattern: 'LottiePlayer',          weight: 2, desc: 'Lottie 播放器' },
        { pattern: 'animationData',         weight: 1, desc: 'Lottie 数据格式' },
      ],
      versionPatterns: [
        /lottie\.version\s*=\s*["'](\d+\.\d+\.\d+)["']/,
      ],
    }
  );

  // --- 收集页面 JS chunk URL ---
  const scriptUrls = [...document.querySelectorAll('script[src]')]
    .map(s => s.src)
    .filter(u => /\.(js|mjs)(\?|$)/.test(u));

  // 优先分析可能包含渲染库的 chunk（vendor/graph/lib/pixi/canvas 等关键词）
  const priorityKeywords = [
    'vendor', 'graph', 'lib', 'pixi', 'canvas', 'render',
    'konva', 'fabric', 'paper', 'engine', 'editor', 'core'
  ];
  const prioritized = scriptUrls.sort((a, b) => {
    const aHit = priorityKeywords.some(k => a.toLowerCase().includes(k));
    const bHit = priorityKeywords.some(k => b.toLowerCase().includes(k));
    if (aHit && !bHit) return -1;
    if (!aHit && bHit) return 1;
    return 0;
  });

  // 限制分析数量，避免过多请求（优先 chunk 最多分析 8 个）
  const toAnalyze = prioritized.slice(0, 8);
  r.analyzedChunks = toAnalyze.length;
  r.totalChunks = scriptUrls.length;

  // --- 逐个 fetch 并扫描指纹 ---
  for (const url of toAnalyze) {
    try {
      const resp = await fetch(url);
      if (!resp.ok) continue;
      const text = await resp.text();
      // 只扫描前 500KB，避免超大文件阻塞
      const sample = text.length > 512000 ? text.slice(0, 512000) : text;
      const chunkName = url.split('/').pop().split('?')[0];

      for (const lib of FINGERPRINTS) {
        let score = 0;
        const matched = [];
        for (const fp of lib.fingerprints) {
          if (sample.includes(fp.pattern)) {
            score += fp.weight;
            matched.push(fp.desc);
          }
        }
        // 阈值：总权重 >= 4 才认为是有效检测
        if (score >= 4) {
          const entry = {
            name: lib.name,
            chunk: chunkName,
            chunkUrl: url,
            confidence: score >= 8 ? 'high' : score >= 5 ? 'medium' : 'low',
            score,
            matchedFingerprints: matched,
            version: null,
            versionHint: null,
          };
          // 尝试提取版本号
          if (lib.versionPatterns) {
            for (const vp of lib.versionPatterns) {
              const m = sample.match(vp);
              if (m) { entry.version = m[1]; break; }
            }
          }
          // 主版本提示
          if (lib.majorVersionHints) {
            for (const [api, hint] of Object.entries(lib.majorVersionHints)) {
              if (sample.includes(api)) {
                entry.versionHint = hint;
                break;
              }
            }
          }
          r.libraries.push(entry);
          r.chunks.push(chunkName);
        }
      }
    } catch (e) {
      // 跨域或网络错误，跳过
    }
  }

  // 去重（同一个库可能在多个 chunk 中匹配）
  const seen = new Set();
  r.libraries = r.libraries.filter(lib => {
    const key = `${lib.name}@${lib.chunk}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return r;
};
