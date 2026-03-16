/**
 * Text Editor Layer — 文本编辑器检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

const detectTextEditing = () => {
  const r = {};

  // 富文本编辑器
  if (window.Quill) r.quill = true;
  if (window.ProseMirror || document.querySelector('.ProseMirror')) r.prosemirror = true;
  if (window.tiptap) r.tiptap = true;
  if (document.querySelector('[data-slate-editor]')) r.slate = true;
  if (window.tinymce) r.tinymce = { version: window.tinymce.majorVersion };
  if (window.CKEDITOR) r.ckeditor = true;
  if (window.Draft) r.draftjs = true;
  if (document.querySelector('[data-lexical-editor]')) r.lexical = true;

  // 代码编辑器
  if (window.monaco) r.monaco = true;
  if (window.CodeMirror) r.codemirror = true;
  if (window.ace) r.ace = true;

  // 协同编辑
  if (window.Y) r.yjs = true;
  if (window.Automerge) r.automerge = true;

  // contentEditable 统计
  r.contentEditableCount = document.querySelectorAll('[contenteditable="true"]').length;

  // Canvas 文本引擎判断
  const knownEditors = r.prosemirror || r.slate || r.quill || r.lexical || r.tiptap;
  r.possibleCanvasTextEngine = document.querySelectorAll('canvas').length > 0 && !knownEditors;

  return r;
};
